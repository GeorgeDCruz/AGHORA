const exec = require('child_process').exec;

exec('lpstat -a', (error, stdout, stderr) => {
    const printers = stdout.split("\n").map(l => l.split(' ')[0]);

    console.log("\n\nCurrently installed printers are: \n\n");

    printers.forEach(p => {
        if (p.trim() != '') {
            console.log('\t' + p);
        }
    });

    console.log("\n\n");
    console.log("Find the thermal printer you need in this list, and use it in index.js");
    console.log("\n\n");
});