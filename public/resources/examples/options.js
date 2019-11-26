const CTLPrinter = require('../CTLPrinter');

const printerName = 'Star_TSP143__STR_T_001_';
const options = {
    file: __dirname + '/../output.pdf',
    deleteGenerated: false,
    fontSize: 72,
    cutDocument: false
};

const printer = new CTLPrinter(printerName, options);
printer.printText("This page won't get cut" + "\n\n");