const CTLPrinter = require('../CTLPrinter');

const printerName = 'Star_TSP143__STR_T_001_';
const options = {};

const printer = new CTLPrinter(printerName, options);
printer.printImage(__dirname + "/data/01.jpg", {
    cutDocument: false
})
    .then(() => printer.printText("This is some text", { fontSize: 72, cutDocument: false }))
    .then(() => printer.printText("This is some other text", { fontSize: 36 }));