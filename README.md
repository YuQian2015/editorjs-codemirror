[![img](https://camo.githubusercontent.com/700c26849efebcec6f9873bfd7a9c124a437946dabde150288b1141392780945/68747470733a2f2f62616467656e2e6e65742f62616467652f456469746f722e6a732f76322e302f626c7565)](https://camo.githubusercontent.com/700c26849efebcec6f9873bfd7a9c124a437946dabde150288b1141392780945/68747470733a2f2f62616467656e2e6e65742f62616467652f456469746f722e6a732f76322e302f626c7565)

# CodeMirror Tool for Editor.js

CodeMirror for the [Editor.js](https://ifmo.su/editor) allows to include code examples in your articles.

## Installation

### Install via NPM

```shell
$ npm install codemirror editorjs-codemirror
```

### Load from CDN

Require this script on a page with Editor.js.

```
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/python/python'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/php/php'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/swift/swift'

import 'codemirror/theme/dracula.css'

var editor = EditorJS({
  tools: {
    // ...
    codeMirror: {
        class: CodeMirror,
        config: {
            languages: [
                {
                    name: 'MarkDown',
                    mode: "text/x-markdown"
                }, {
                    name: 'Python',
                    mode: "text/x-python"
                }, {
                    name: 'PHP',
                    mode: "application/x-httpd-php"
                }, {
                    name: 'SASS',
                    mode: "text/x-sass"
                }, {
                    name: 'Swift',
                    mode: "text/x-swift"
                }, {
                    name: 'XML',
                    mode: "application/xml"
                }
            ],
            codeMirrorConfig: {
                tabSize: 4,
                styleActiveLine: { nonEmpty: true },
                styleActiveSelected: true,
                lineNumbers: true,
                line: false,
                foldGutter: true,
                autofocus: false,
                styleSelectedText: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: 'dracula',
                autoCloseTags: true,
                dragDrop: true,
                lint: true,
                extraKeys: { 'Ctrl': 'autocomplete' },
                hintOptions: {
                    completeSingle: false
                },
            }
        }
    },
  }
});
```

## Config

| Field            | Type   | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| languages        | Array  | Customize additional supported languages |
| codeMirrorConfig | Object | CodeMirror config                        |

## Output data

```javascript
{
    mode: "text/css"
    name: "CSS"
    text: "body&nbsp;{\n&nbsp;&nbsp;padding:&nbsp;0\n}"
}
```