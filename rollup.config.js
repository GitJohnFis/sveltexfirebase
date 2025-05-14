import svelte from 'rollup-plugin-svelte';
import Hmr from 'rollup-plugin-hot';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { copySync, removeSync } from 'fs-extra'
import autopreprocess from 'svelte-preprocess';
import getConfig from '@roxi/routify/lib/utils/config';
import spassr from 'spassr'
import postcssImport from 'postcss-import';
import { injectManifest } from 'rollup-plugin-workbox'



const { distDir } = getConfig();
const assetsDir = 'asset';
const buildDir = `${distDir}/biuld`;
const isNollUp = !!process.env.NOLLUP;
const production = !process.env.ROLLUP_WATCH;
process.env.NODE_ENV = production ? "production" : "development";

//clear previous biulds
removeSync(distDir)
removeSync(buildDir)


const serve = () => ({
    writeBundle: async () => {
        const options ={
            assetsDir: [assetsDir, buildDir],
            entrypoint:`${assetsDir}/__app.html`,
            script: `${buildDir}/main.js`
        }
        spassr({ ...options, port: 5000 })
        spassr({ ...options, ssr: true, port: 5005, ssrOptions: { inline:
        true, dev: true} })
    }
})


export default {
    preserveEntrySignatures: false,
    input: ['src/imain.js'],
    output: {
        sourcemap: true,
        format: 'esm',
        dir: buildDir,
        // for performance disabling the filename hashing in development
        chunkFileNames:`{name}${production && '-[hash]' || ''}.js`
    },
    plugins {
        svelte({
            dev: !production, //run time checks
            //Extract component CSS  = better perfromance
            css: css => css.write('bundle.css'),
            hot: isNollUp,
            preprocess: [
                autopreprocess({
                    postcss: require('./postcss.config.js'),
                    defaults: { style: 'postcss' }
                })
            ]

        }),

        resolve({
            browzer: true,
            dedupe: importee => !!importee.match(/svelte(\/|$)/)
        }),
        commonjs(),

        production && terser()
        !production && !isNollUp && serve(),
        !production && !isNollUp && livereload(distDir) //refresh enviornment is
        //is updated
    }
