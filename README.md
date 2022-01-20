[![img](https://camo.githubusercontent.com/700c26849efebcec6f9873bfd7a9c124a437946dabde150288b1141392780945/68747470733a2f2f62616467656e2e6e65742f62616467652f456469746f722e6a732f76322e302f626c7565)](https://camo.githubusercontent.com/700c26849efebcec6f9873bfd7a9c124a437946dabde150288b1141392780945/68747470733a2f2f62616467656e2e6e65742f62616467652f456469746f722e6a732f76322e302f626c7565)

# CodeMirror Tool for Editor.js

CodeMirror Tool for the [Editor.js](https://ifmo.su/editor) allows to include code examples in your articles.

## Installation

### Install via NPM

Get the package

```shell
# npm
$ npm install editorjs-codemirror

# yarn
$ yarn add editorjs-codemirror
```

Include module at your application

```javascript
import CodeMirror from 'editorjs-codemirror'
```

## Usage

Add the CodeMirror Tool to the `tools` property of the Editor.js initial config.

```javascript
import EditorJS from '@editorjs/editorjs'
import CodeMirror from 'editorjs-codemirror'

export const tools = {
    // ...
    code: CodeMirror
    // ...
}
```

## Default config

Default supported languages: `Javascript` / `HTML` / `CSS`

```javascript
{
    languages: [{
        name: 'Javascript',
        mode: "text/javascript"
    }, {
        name: 'HTML',
        mode: "text/html"
    }, {
        name: 'CSS',
        mode: "text/css"
    }],
    codeMirrorConfig: {
        lineNumbers: true,
        matchBrackets: true,
        autoCloseTags: true,
        tabSize: 2,
        keyMap: "sublime",
    }
}
```

## Config Params

| Field            | Type   | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| languages        | Array  | Customize additional supported languages |
| codeMirrorConfig | Object | CodeMirror config                        |

### Code example

Install codemirror:

```shell
$ npm install codemirror
```

import mode or theme from codemirror package:

```javascript
import CodeMirror from 'editorjs-codemirror';

import 'codemirror/mode/shell/shell'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/sass/sass'

import 'codemirror/theme/idea.css'

export const tools = {
    codeMirror: {
        class: CodeMirror,
        config: {
            languages: [
                {
                    name: 'Shell',
                    mode: "application/x-sh"
                }, {
                    name: 'JSX',
                    mode: "text/typescript-jsx"
                }, {
                    name: 'Vue',
                    mode: "text/x-vue"
                }, {
                    name: 'MarkDown',
                    mode: "text/x-markdown"
                }, {
                    name: 'SASS',
                    mode: "text/x-sass"
                }
            ],
            codeMirrorConfig: {
                tabSize: 4,
                styleActiveLine: { nonEmpty: true },
                styleActiveSelected: true,
                line: false,
                foldGutter: true,
                autofocus: false,
                styleSelectedText: true,
                showCursorWhenSelecting: true,
                dragDrop: true,
                lint: true,
                theme: 'idea',
                extraKeys: { 'Ctrl': 'autocomplete' },
                hintOptions: {
                    completeSingle: false
                },
            }
        }
    }
}
```

## Output data

CSS mode output

```javascript
{
    mode: "text/css"
    name: "CSS"
    text: "body&nbsp;{\n&nbsp;&nbsp;padding:&nbsp;0\n}"
}
```

