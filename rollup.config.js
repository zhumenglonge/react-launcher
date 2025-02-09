import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import tsc from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const extensions = ['js', 'jsx', 'ts', 'tsx'];

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/index.js',
            sourcemap: true,
            format: 'cjs',
            esModule: false,
        },
        {
            file: './es/index.js',
            sourcemap: true,
            format: 'esm',
        },
    ],
    external: ['react/jsx-runtime', 'react', 'react-dom'],
    plugins: [
        // 帮助 rollup 查找 node_modules 里的三方模块
        resolve({ extensions, preferBuiltins: false }),
        // 帮助 rollup 查找 commonjs 规范的模块, 常配合 rollup-plugin-node-resolve 一起使用
        commonjs(),
        tsc({
            tsconfig: './tsconfig.json',
            noForceEmit: true,
        }),
        babel({
            extensions,
            exclude: /node_modules/,
        }),
        terser(),
    ],
};
