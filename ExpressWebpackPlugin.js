// dependencies
require('colors');
const path = require('path');
const { spawn } = require('child_process');

class ExpressWebpackPlugin {
    constructor(expressEP) {
        this.expressEP = expressEP;
        this.pluginName = 'express-webpack-plugin';
        this.expressProcess = null;
    }

    getBuildFilePath(outputOptions) {
        return path.join(outputOptions.path, outputOptions.filename);
    }

    apply(compiler) {
        const isWatching = compiler.options.watch;
        const isDevelopment = compiler.options.mode === 'development';

        if (!isWatching) {
            console.warn(`${'[express-webpack-plugin]'.bold.red} To enable ${this.pluginName.green}, you should be in watch mode`);
        }

        if (!isDevelopment) {
            console.warn(`${'[express-webpack-plugin]'.bold.red} To enable ${this.pluginName.green}, you should be in development mode`);
        }

        if (isWatching && isDevelopment) {
            // before compilation
            compiler.hooks.beforeCompile.tap(this.pluginName, () => {
                if (this.expressProcess) {
                    this.expressProcess.kill('SIGINT');
                }
            });

            // after compilation
            compiler.hooks.afterCompile.tap(this.pluginName, () => {
                // if no entry point is provided, try the index file in the build folder
                if (!this.expressEP) {
                    this.expressEP = this.getBuildFilePath(compiler.options.output);
                }
                
                // spawn express process
                this.expressProcess = spawn('node', [ this.expressEP ], { shell: false });
                this.expressProcess.stdout.on('data', (data) => {
                    const formattedData = data.toString().replace(/\s{2,}/g, '').trim();
                    console.log(`${'[express]'.bold.green} ${formattedData}`);
                });

                // handle express process errors
                this.expressProcess.stderr.on('data', (data) => {
                    console.log(data);
                });
            });
        }
    }
}

module.exports = ExpressWebpackPlugin;