graphviz-svg-inliner
====================

Exports a graphviz-file to a SVG and inlines the referenced CSS.

Requires NodeJS `8+`.

Usage
-----

```
graphviz-svg-inliner -o ./inlined-graph.svg ./docs/graph.gv
```

To add additional stylesheets, use the `-a` option

```
graphviz-svg-inliner -o ./inlined-graph.svg -a ./docs/styles/additional-style.css ./docs/graph.gv
```
