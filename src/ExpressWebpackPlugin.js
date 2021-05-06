'use strict';

// dependencies
require('colors');
const path = require('path');
const { spawn } = require('child_process');

const PLUGIN_NAME = 'express-webpack-plugin';

class ExpressWebpackPlugin {
    constructor(expressEP) {
        this.expressEP = expressEP;
        this.express = null;
    }

    /**
     *  
     * @description get the build file's path
     * @param {object} outputOptions 
     * @returns {string} build file's path
     */
    getBuildFilePath(outputOptions) {
        return path.join(outputOptions.path, outputOptions.filename);
    }

    /**
     * 
     * @description if there is an express process, kill it
     */
    killExpress() {
        if (this.express) {
            this.express.kill('SIGINT'); // kill node process
            console.log(`${PLUGIN_NAME.yellow.bold} - shutting down express`);
        }
    }

    /**
     * 
     * @description spawn express process and listen for logs & errors
     */
    bootExpress() {
        // spawn express process
        console.log(`${PLUGIN_NAME.yellow.bold} - booting up express`);
        this.express = spawn('node', [ this.expressEP ], { shell: false });

        // listen for express logs
        this.express.stdout.on('data', (data) => {
            const formattedData = data.toString().replace(/\s{2,}/g, '').trim();
            console.log(`${'express'.green.bold} - ${formattedData}`);
        });

        // listen for express errors
        this.express.stderr.on('data', (data) => {
            const formattedData = data.toString().replace(/\s{2,}/g, '').trim();
            console.log(`${'express'.red.bold} - ${formattedData}`);
        });
    }

    apply(compiler) {
        const isWatching = compiler.options.watch;
        this.expressEP = this.expressEP ? this.expressEP : this.getBuildFilePath(compiler.options.output)

        if (isWatching) {
            compiler.hooks.beforeCompile.tap(PLUGIN_NAME, () => this.killExpress());
            compiler.hooks.afterCompile.tap(PLUGIN_NAME, () => this.bootExpress());
        }
    }
}

module.exports = ExpressWebpackPlugin;