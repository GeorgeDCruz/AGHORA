const CTLPrinter = require('../resources/CTLPrinter.js');
const news = require('./goodnews');

exports.printPdf = async (filename) => {
	try {
		let goodNews = await news.selectRandomQuestions();
		let tempGN = goodNews;
		console.log(tempGN);
		let gn1 = tempGN[0];
		let gn2 = tempGN[1];
		let gn3 = tempGN[2];

		var today = new Date();
		var day = today.getDate();
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		var month = monthNames[today.getMonth()];
		var date = day + ' ' + month;

		const printerName = 'Star_TSP143';
		const options = {
			size: [ 204, 567 ],
			width: 204.0, //204.0
			height: 567.0, //567.0
			margins: {
				bottom: 20,
				left: 15,
				right: 15,
				top: 20
			},
			font: './public/resources/cascadia.ttf',
			fontSize: 10,
			align: 'justify'
		};

		const printer = new CTLPrinter(printerName, options);
		printer.printCustom((doc, width, height, string = 'hey') => {
			doc.registerFont('h1', './public/resources/FiraMono-Bold.ttf');
			const h1 = 10;
			doc.registerFont('p', './public/resources/cascadia.ttf');
			const p = 10;

			// Title
			doc
				.font('h1')
				.fontSize(14)
				.text('THE INDIAN DAILY', {
					align: 'center'
				})
				.moveDown(0.25);
			doc
				.font('p')
				.fontSize(7)
				.text(date + ' 2034   /   New Delhi', {
					align: 'center'
				})
				.moveDown(2);

			// News Item 01
			doc.font('h1').fontSize(h1).text(gn1.headline).moveDown(0.5);
			doc
				.font('p')
				.fontSize(p)
				.text(gn1.text, {
					align: 'justify'
				})
				.moveDown(1.5);

			// News Item 02
			doc.font('h1').fontSize(h1).text(gn2.headline).moveDown(0.5);
			doc
				.font('p')
				.fontSize(p)
				.text(gn2.text, {
					align: 'justify'
				})
				.moveDown(1.5);

			// News Item 03
			doc.font('h1').fontSize(h1).text(gn3.headline).moveDown(0.5);
			doc
				.font('p')
				.fontSize(p)
				.text(gn3.text, {
					align: 'justify'
				})
				.moveDown();

			// Line
			doc.moveTo(15, 320).lineTo(189, 320).lineWidth(0.5).dash(3, { space: 2 }).stroke().moveDown(2);

			// Footer
			doc
				.font('p')
				.fontSize(7)
				.text(
					'These are present-day news headlines that would have been printed, if AGHORA were to exist now.',
					{
						align: 'center'
					}
				)
				.moveDown();
			doc
				.text(
					'Your contibution to AGHORA, a collective intelligence of all audiences, is making better democratic decisions compared to the leaders of today.',
					{
						align: 'center'
					}
				)
				.moveDown()
				.font('h1');
			doc
				.text('Thank you.', {
					align: 'center'
				})
				.moveDown(4);

			// Image
			doc
				.translate(15, 430)
				.image('./public/outputSketch/' + filename, 47, 20, {
					fit: [ 80, 80 ],
					align: 'center',
					valign: 'center'
				})
				.rect(0, 0, 174, 120)
				.stroke()
				.moveDown(2);
		});
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
};
