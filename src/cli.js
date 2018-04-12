const
    VERSION = require('../package.json').version,
    program = require('commander'),
    createSvg = require('./index');

// DEFINE CLI

module.exports = run;

// IMPLEMENTATION DETAILS

function run() {
    program
        .version(VERSION)
        .arguments('<filepath>')
        .description('Exports a graphviz-file to a SVG and inlines the referenced CSS.')
        .option('-o, --output-filepath <filepath>', 'Filepath to output-SVG')
        .action(_processAction);
    program.parse(process.argv);
}

function _processAction(filepath, options) {
    const { outputFilepath } = options;
    createSvg(filepath, { outputFilepath });
    process.exit(0);
}
