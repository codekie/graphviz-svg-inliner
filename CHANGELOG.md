# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# [1.0.0](https://github.com/codekie/graphviz-svg-inliner/compare/v0.1.3...v1.0.0) (2019-09-03)


### Features

* dropping support for NodeJS 6.* ([00b84808](https://github.com/codekie/graphviz-svg-inliner/commit/00b84808))
* support adding external stylesheets ([a9f42563](https://github.com/codekie/graphviz-svg-inliner/commit/a9f42563))
* support graphviz-input from stdin ([d2c3ecf3](https://github.com/codekie/graphviz-svg-inliner/commit/d2c3ecf3))


### BREAKING CHANGES

* NodeJS `6.*` is no longer supported
* `index.js` does not export a function, to create the
SVG, instead it exports an object, with a function to read from file
(`createSvgFromFile`) and one to use a string as input
(`createSvgFromString`).



<a name="0.1.3"></a>
## [0.1.3](https://github.com/codekie/graphviz-svg-inliner/compare/v0.1.2...v0.1.3) (2018-06-08)


### Bug Fixes

* **shrinkwrap:** remove shrinkwrap ([008fc6d](https://github.com/codekie/graphviz-svg-inliner/commit/008fc6d))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/codekie/graphviz-svg-inliner/compare/v0.1.1...v0.1.2) (2018-04-12)


### Bug Fixes

* **bin:** remove harmony-option ([ea56e98](https://github.com/codekie/graphviz-svg-inliner/commit/ea56e98))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/codekie/graphviz-svg-inliner/compare/v0.1.0...v0.1.1) (2018-04-12)


### Bug Fixes

* **bin:** add `bin`-entry in `package.json` ([805efd2](https://github.com/codekie/graphviz-svg-inliner/commit/805efd2))



<a name="0.1.0"></a>
# 0.1.0 (2018-04-12)


### Features

* first draft ([03b3e50](https://github.com/codekie/graphviz-svg-inliner/commit/03b3e50))
