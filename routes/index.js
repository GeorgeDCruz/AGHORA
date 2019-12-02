var express = require('express');
var router = express.Router(),
	uuid = require('uuid'),
	printUtil = require('../public/js/print.js');

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index', { title: 'Express' });
});

router.post('/draw/save', function(req, res){
	let file = req.files.picture;
	const filename = uuid.v1() + '.jpg';
	file.mv('./public/outputSketch/' + filename, function(err){
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
		printUtil.printPdf(filename);
		res.json({ success: true, filename: filename });
	});
});

router.post('/print', async (req, res) => {
	try {
	} catch (err) {
		console.log(err);
		res.json({ success: false });
	}
});

module.exports = router;
