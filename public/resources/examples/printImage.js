const CTLPrinter = require('../CTLPrinter/CTLPrinter.js');

const printerName = 'Star_TSP143__STR_T_001_';
const options = {};

const printer = new CTLPrinter(printerName, options);
printer.printImage(__dirname + '/data/01.jpg');