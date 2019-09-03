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
        .action(_processAction);
    program.parse(process.argv);
}

async function _processAction(filepath, options) {
    const { outputFilepath } = options;
    if (filepath) {
        createSvgFromFile(filepath, { outputFilepath });
    } else {
        createSvgFromString(await getStdin() , outputFilepath);
    }
    process.exit(0);
}
