
import { default as CM } from 'codemirror/lib/codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/htmlmixed/htmlmixed'

import 'codemirror/mode/vue/vue'
import 'codemirror/mode/jsx/jsx'

// addons
import 'codemirror/addon/edit/matchbrackets' // 引入括号匹配
import 'codemirror/addon/edit/closetag' // 自动关闭标签


// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/javascript-lint'
// import 'codemirror/addon/lint/json-lint'
// import 'codemirror/addon/lint/yaml-lint'
// import 'codemirror/addon/lint/css-lint'
// import 'codemirror/addon/lint/html-lint'

import 'codemirror/keymap/sublime' // 键盘绑定

// 自动补全
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/javascript-hint'
// import 'codemirror/addon/hint/css-hint'
// import 'codemirror/addon/hint/html-hint'
// import 'codemirror/addon/hint/show-hint.css'

// 主题和皮肤
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'

// 全屏模式
// import 'codemirror/addon/display/fullscreen'
// import 'codemirror/addon/display/fullscreen.css'

import './index.less'

function htmlEncodeByRegExp(str) {
    if (str.length === 0) return "";
    str = str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");
    return str;
}

function htmlDecodeByRegExp(str) {
    if (str.length === 0) return "";
    str = str.replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, `'`)
        .replace(/&quot;/g, `"`)
        .replace(/&amp;/g, '&');
    return str;
}

export default class CodeMirror {

    // Allow line breaks inside code
    static get enableLineBreaks() {
        return true
    }

    static get toolbox() {
        return {
            title: 'CodeMirror',
            icon: `<svg t="1579056838304" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1481" width="32" height="32"><path d="M458.1197853 689.75976308l-156.42642974-156.42642975 156.42642974-156.42642975-47.50728606-47.50728607L206.67878342 533.33333333l203.93371582 203.93371583 47.50728606-47.50728609z m107.7604294-1e-8l156.42642974-156.42642974-156.42642974-156.42642975 47.50728606-47.50728607L817.32121658 533.33333333 613.38750076 737.26704916 565.8802147 689.75976308z" p-id="1482"></path></svg>`
        }
    }

    /**
     *  Used by Editor.js paste handling API.
     *  Provides configuration to handle pre tag.
     *
     * @readonly
     * @static
     * @return {{tags: string[]}}
     */
    static get pasteConfig() {
        return {
            tags: ['pre'],
        }
    }

    get CSS() {
        return {
            block: this.api.styles.block,
            input: this.api.styles.input,
            wrapper: 'eft-codemirror',
            mode: 'eft-codemirror__mode',
            textarea: 'eft-codemirror__textarea'
        }
    }

    get defaultConfig() {
        return {
            languages: [{
                name: 'Javascript',
                mode: "text/javascript"
            }, {
                name: 'HTML',
                mode: "text/html"
            }, {
                name: 'CSS',
                mode: "text/css"
            }, {
                name: 'Shell',
                mode: "application/x-sh"
            }, {
                name: 'JSX',
                mode: "text/typescript-jsx"
            }, {
                name: 'Vue',
                mode: "text/x-vue"
            }],
            codeMirrorConfig: {
                // mode: { name: "javascript", globalVars: true },
                lineNumbers: true,
                matchBrackets: true, // 括号匹配
                autoCloseTags: true,
                theme: "idea",
                tabSize: 2,
                keyMap: "sublime", // sublime 键盘绑定
                // fullScreen:true, //全屏模式
                // extraKeys: {"Ctrl": "autocomplete"}, // ctrl可以弹出提示
                // extraKeys: { "Ctrl-Space": "autocomplete" } //ctrl-space唤起智能提示
            }
        }
    }

    constructor({ data, api, config = {} }) {
        this.api = api
        const { languages = [], codeMirrorConfig = {} } = config
        this.languages = [...this.defaultConfig.languages, ...languages]
        this.codeMirrorConfig = { ...this.defaultConfig.codeMirrorConfig, ...codeMirrorConfig }
        const text = htmlDecodeByRegExp(data.text || '')
        this.data = {
            name: data.name || 'javascript',
            text,
            mode: data.mode || "text/javascript"
        }
    }

    render() {
        this.wrapper = this.#make('DIV', [this.CSS.block, this.CSS.wrapper], {})
        // 添加文本框
        const textarea = this.#make('TEXTAREA', [this.CSS.textarea], {})
        textarea.style.opacity = 0
        textarea.onfocus = () => {
            this.#initCodeMirror()
        }
        // 添加选择语言按钮
        let selector = this.#make('SELECT', [this.CSS.mode, this.CSS.input], {})
        for (let lang of this.languages) {
            const option = this.#make('OPTION', [], {
                value: lang.mode,
                selected: this.data.name === lang.name
            })
            option.textContent = lang.name
            selector.appendChild(option)
        }
        selector.onchange = event => {
            const lang = this.languages[event.target.options.selectedIndex]
            this.data.name = lang.name
            this.#changeLang(event.target.value)
        }
        this.textarea = textarea
        this.wrapper.appendChild(textarea)
        this.wrapper.appendChild(selector)
        this.wrapper.addEventListener('keyup', (e) => {
            e.stopPropagation()
            e.preventDefault()
            return false
        })
        this.checkRender = setInterval(() => {
            this.#initCodeMirror()
            clearInterval(this.checkRender)
            this.checkRender = undefined
        }, 200)
        return this.wrapper
    }

    #make(tagName, classNames = null, attributes = {}) {
        let el = document.createElement(tagName)
        if (Array.isArray(classNames)) {
            el.classList.add(...classNames)
        } else if (classNames) {
            el.classList.add(classNames)
        }
        for (let attrName in attributes) {
            el[attrName] = attributes[attrName]
        }
        return el
    }

    #initCodeMirror() {
        if (this.codeEditor) {
            return
        }
        this.textarea.value = this.data.text
        this.codeEditor = CM.fromTextArea(this.textarea, {
            ...this.codeMirrorConfig,
            mode: this.data.mode, // 设置需要高亮的语言
        })

        this.codeEditor.on('blur', () => {

        })
    }

    #changeLang(mode) {
        if (this.codeEditor) {
            this.codeEditor.setOption('mode', mode)
        }
    }


    /**
       * onPaste callback fired from Editor`s core
       * @param {PasteEvent} event - event with pasted content
       */
    onPaste(event) {
        const content = event.detail.data
        this.data = {
            text: content.textContent,
            name: 'javascript',
            mode: "text/javascript"
        }
    }

    save() {
        let data = {}
        if (this.codeEditor) {
            data.mode = this.codeEditor.doc.cm.getOption('mode')
            data.text = htmlEncodeByRegExp(this.codeEditor.doc.getValue() || '')
        }
        return Object.assign(this.data, data)
    }
}