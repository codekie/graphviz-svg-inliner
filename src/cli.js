const
    VERSION = require('../package.json').version,
    program = require('commander'),
    getStdin = require('get-stdin'),
    { createSvgFromFile, createSvgFromString } = require('./index');

// DEFINE CLI

module.exports = run;

// IMPLEMENTATION DETAILS

function run() {
    program
        .version(VERSION)
        .arguments('[filepath]')
        .description('Exports a graphviz-file to a SVG and inlines the referenced CSS. If filepath is' +
            ' omitted, stdin will be used, instead.')
        .option('-o, --output-filepath <filepath>', 'Filepath to output-SVG')
        .option('-a, --add-stylesheet <filepath>', 'Filepath to stylesheet, which shall be included as well',
            (file, files) => {
                files.push(file);
                return files;
            }, [])
        .action(_processAction);
    program.parse(process.argv);
}

async function _processAction(filepath, options) {
    const { outputFilepath } = options;
    let { addStylesheet: filepathsSyleSheets } = options;
    if (filepathsSyleSheets && !Array.isArray(filepathsSyleSheets)) {
        filepathsSyleSheets = [filepathsSyleSheets];
    }
    try {
        filepath
            ? createSvgFromFile(filepath, { outputFilepath, filepathsSyleSheets })
            : createSvgFromString(await getStdin() , outputFilepath, { filepathsSyleSheets });
        console.log(`Wrote file to ${ outputFilepath }`);
    } catch(e) {
        console.log(e);
    }
    process.exit(0);
}
