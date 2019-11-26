const CTLPrinter = require('../CTLPrinter');

const printerName = 'Star_TSP143__STR_T_001_';
const options = {};

const printer = new CTLPrinter(printerName, options);
printer.printCustom((doc, width, height) => {
    doc.lineWidth(25);

    doc.lineCap('butt')
        .moveTo(50, 20)
        .lineTo(100, 20)
        .stroke();

    doc.lineCap('round')
        .moveTo(150, 20)
        .lineTo(200, 20)
        .stroke();

    doc.lineCap('square')
        .moveTo(250, 20)
        .circle(275, 30, 15)
        .stroke();

    doc.lineJoin('miter')
        .rect(50, 100, 50, 50)
        .stroke();

    doc.lineJoin('round')
        .rect(150, 100, 50, 50)
        .stroke();

    doc.lineJoin('bevel')
        .rect(250, 100, 50, 50)
        .stroke();
});