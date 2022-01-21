// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import less from 'rollup-plugin-less';
// import css from "rollup-plugin-import-css";
import styles from "rollup-plugin-styles"; // https://github.com/Anidetrix/rollup-plugin-styles
import { uglify } from "rollup-plugin-uglify";

import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: [
        // {
        //     file: pkg.main,
        //     format: 'umd',
        //     name: 'CodeMirror',
        //     sourcemap: false,
        // },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: false
        }],
    plugins: [
        uglify(),
        // resolve(),
        babel({ babelHelpers: 'bundled' }),
        // css(),
        // less({ insert: true }),
        styles(),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**',  // Default: undefined
        })
    ]
};