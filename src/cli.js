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

function _processAction(filepath, options) {
    const { outputFilepath } = options;
    let prmsFinished;
    if (filepath) {
        prmsFinished = Promise.resolve(createSvgFromFile(filepath, { outputFilepath }));
    } else {
        prmsFinished = new Promise((resolve, reject) => {
            const prmsInput = getStdin();
            prmsInput.then(
                (input) => {
                    createSvgFromString(input , outputFilepath);
                    resolve(0);
                },
                (reason) => {
                    console.log(reason);
                    reject(1);
                }
            );
        });
    }
    prmsFinished.then(_finish, _finish);
}


function _finish(errorCode) {
    process.exit(errorCode);
}
