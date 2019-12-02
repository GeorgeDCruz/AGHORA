const fs = require('fs');
const spawn = require('child_process').spawn;
const PDFDocument = require('pdfkit');

var today = new Date();
var d = today.getDate();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
const TMP_DOC = './public/outputPDF/Slip_' + d + '_' + m + s + '.pdf';

class CTLPrinter {
	constructor(printerName, options = {}) {
		if (!printerName) {
			throw new Error('No printer selected');
		}

		this.options = {};
		this.defaults = {
			file: TMP_DOC,
			printerName,
			width: 204.0,
			height: 567.0,
			margins: 0,
			deleteGenerated: true,
			fontSize: 36,
			cutPage: false,
			cutDocument: true
		};

		this.options = this._mergeOptions(this.defaults, options);
	}

	_mergeOptions(previous, options) {
		return Object.assign({}, previous, options);
	}

	_createOutput(doc, _opts, end) {
		const writeStream = fs.createWriteStream(_opts.file);

		writeStream.on('finish', () => {
			this._sendFile(_opts.file, _opts, end);
		});

		doc.pipe(writeStream);
	}

	_sendFile(file, { cutPage, cutDocument, printerName }, end) {
		const child = spawn('lp', [
			'-d',
			printerName,
			'-o',
			`PageCutType=${cutPage ? '1PartialCutPage' : '0NoCutPage'}`,
			'-o',
			`DocCutType=${cutDocument ? '1PartialCutDoc' : '0NoCutDoc'}`,
			file
		]);

		child.stdout.on('data', (data) => {
			const msg = data.toString();

			if (msg.indexOf('request id is') >= 0) {
				this.log('\n' + 'Print added. ID: ' + msg.split(' ')[3]);
			}
		});

		child.stderr.on('data', (data) => {
			this._displayMessage('There was an error printing:', data.toString());
		});

		child.on('exit', (code, signal) => {
			if (signal) {
				this.log(`Exited with code ${code} and signal ${signal}`);
			} else {
				this._displayMessage(false, 'Successfully printed!');
			}

			// if (this.options.deleteGenerated) {
			//     this._cleanup(file);
			// }

			end();
		});
	}

	_displayMessage(head, content) {
		if (head) {
			this.log('\n');
			this.log(head);
		}

		this.log('\n');
		this.log(content.split('\n').map((m) => '\t' + m).join('\n'));
		this.log('\n');
	}

	// _cleanup(file) {
	//     fs.unlinkSync(file);
	// }

	printText(text, options = {}) {
		return new Promise((resolve, reject) => {
			const _opts = this._mergeOptions(this.options, options);

			const doc = this._getDocument(_opts);
			this._createOutput(doc, _opts, resolve);

			doc.fontSize(_opts.fontSize);
			doc.text(text, 0, 0);
			doc.end();
		});
	}

	printImage(image, options = {}) {
		return new Promise((resolve, reject) => {
			const _opts = this._mergeOptions(this.options, options);

			const doc = this._getDocument(_opts);
			this._createOutput(doc, _opts, resolve);

			doc.image(image, 0, 0, { width: _opts.width });
			doc.end();
		});
	}

	printCustom(drawFunc, options = {}) {
		return new Promise((resolve, reject) => {
			const _opts = this._mergeOptions(this.options, options);

			const doc = this._getDocument(_opts);
			this._createOutput(doc, _opts, resolve);

			drawFunc(doc, _opts.width, _opts.height);

			doc.end();
		});
	}

	printFile(file, options = {}) {
		return new Promise((resolve, reject) => {
			const _opts = this._mergeOptions(this.options, options);
			this._sendFile(file, _opts, resolve);
		});
	}

	_getDocument({ width, height, margins }) {
		return new PDFDocument({
			size: [ width, height ],
			margins: margins
		});
	}

	log(msg) {
		// Possible TODO - Allow other reporting method
		console.log(msg);
	}
}

module.exports = CTLPrinter;
