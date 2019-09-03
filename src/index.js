// IMPORTS

const vizjs = require('viz.js'),
    fs = require('fs'),
    path = require('path');

// CONSTANTS

const DEFAULT__ENCODING = 'utf8',
    FILE_EXTENSION__SVG = 'svg',
    REGEX__EXTERNAL_CSS = /<\?xml-stylesheet href="([^"]*)" type="text\/css"\?>/,
    REGEX__SVG_TAG = /<svg [^>]*>/;

// PUBLIC API

module.exports = {
    createSvgFromFile,
    createSvgFromString
};

// IMPLEMENTATION DETAILS

// Public

/**
 * Creates an SVG based on a graphviz-file and inlines the css-file if one has been set in the `.gv`-file
 * @param {String} filePathGraph                        File-path to the graph-file
 * @param {String} [encodingGraph=utf8]                 Encoding of the graph-file
 * @param {String} [encodingCss=utf8]                   Encoding of the CSS-file
 * @param {String} [outputFilepath]                     File-path where the SVG will be written to. If this parameter
 *                                                      is not set, the output-file-path will be the same as the
 *                                                      `filePathGraph`. The file-suffix will be replaced with `.svg`
 */
function createSvgFromFile(filePathGraph, {
    encodingGraph = DEFAULT__ENCODING,
    encodingCss = DEFAULT__ENCODING,
    outputFilepath = _createDefaultOutputFilepath(filePathGraph)
} = {}) {
    const strGraph = fs.readFileSync(filePathGraph, encodingGraph),
        svgGraph = vizjs(strGraph),
        enhancedSvg = _enhanceSvg(svgGraph, path.dirname(filePathGraph), encodingCss);
    _writeSvg(enhancedSvg, outputFilepath);
}

/**
 * Creates an SVG based on a graphviz-string and inlines the css-file if one has been set
 * @param {String} strGraph             Graphviz-string
 * @param {String} outputFilepath       File-path where the SVG will be written to.
 * @param {String} [encodingCss=utf8]   Encoding of the CSS-file
 */
function createSvgFromString(strGraph, outputFilepath, {
    encodingCss = DEFAULT__ENCODING
} = {}) {
    const svgGraph = vizjs(strGraph),
        enhancedSvg = _enhanceSvg(svgGraph, path.dirname(outputFilepath), encodingCss);
    _writeSvg(enhancedSvg, outputFilepath);
}

// Private

/**
 * Enhance the raw SVG (eg. inlining CSS)
 * @param {String} svgGraph     The SVG as String
 * @param {String} pathGraph    The path to the graph-file
 * @param {String} encodingCss  The encoding of the potentially referenced CSS
 * @returns {String} The enhanced SVG
 * @private
 */
function _enhanceSvg(svgGraph, pathGraph, encodingCss) {
    return [svgGraph]   // Monad.. just in case that there are more enhancements to come
        .map(svgGraph => _inlineCSS(svgGraph, pathGraph, encodingCss))
        [0];
}

/**
 * Inlines the potentially referenced CSS into the SVG
 * @param {String} svgGraph     The SVG as String
 * @param {String} pathGraph    The path to the graph-file
 * @param {String} encodingCss  The encoding of the potentially referenced CSS
 * @returns {String} The SVG with the inlined CSS-file
 * @private
 */
function _inlineCSS(svgGraph, pathGraph, encodingCss) {
    const regexResultExternalCss = svgGraph.match(REGEX__EXTERNAL_CSS);
    if (!regexResultExternalCss) { return svgGraph; }  // No reference to external CSS-file
    const relativeFilePathCss = regexResultExternalCss[1],
        strippedStyleTagFromSvg = svgGraph.replace(REGEX__EXTERNAL_CSS, ''),
        regexResultSvgTag = REGEX__SVG_TAG.exec(strippedStyleTagFromSvg),
        idxAfterSvgTag = regexResultSvgTag.index + regexResultSvgTag[0].length,
        preStyleTag = strippedStyleTagFromSvg.substring(0, idxAfterSvgTag),
        postStyleTag = strippedStyleTagFromSvg.substring(idxAfterSvgTag);
    return `${ preStyleTag }${ _createStyleTag(pathGraph, relativeFilePathCss, encodingCss) }${postStyleTag}`;
}

/**
 * Creates the file-path for the output-SVG, based on the file-path to the input-graph
 * @param {String}  filePathGraph   File-path to the input-graph
 * @returns {String} File-path to the output
 * @private
 */
function _createDefaultOutputFilepath(filePathGraph) {
    const { dir, name } = path.parse(filePathGraph);
    return `${ dir }/${ name }.${ FILE_EXTENSION__SVG }`;
}

/**
 * Creates an inline-style-tag for SVG, with the included CSS.
 * @param {String} pathGraph        The path to the graph-file
 * @param {String} relFilePathCss   The relative path to the CSS-file (based on the graph-file)
 * @param {String} encodingCss      The encoding of the potentially referenced CSS
 * @returns {String} Style-tag
 * @private
 */
function _createStyleTag(pathGraph, relFilePathCss, encodingCss) {
    const filePathCss = path.join(pathGraph, relFilePathCss),
        css = fs.readFileSync(filePathCss, encodingCss);
    //language=XML (required for WebStorm, to suppress error)
    return `<style type="text/css" ><![CDATA[
        ${ css }
    ]]></style>`;
}

/**
 * Writes the SVG to a file
 * @param {String} svg              The SVG as String
 * @param {String} filePathOutput   The file-path where the SVG should be written to
 * @private
 */
function _writeSvg(svg, filePathOutput) {
    fs.writeFileSync(filePathOutput, svg);
    console.log(`Wrote file to ${ filePathOutput }`);
}
