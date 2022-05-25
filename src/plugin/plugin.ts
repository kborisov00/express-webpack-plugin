import type { Compiler, WebpackPluginInstance } from "webpack";
import type { ChildProcessWithoutNullStreams } from "child_process";

import { message } from '../utils/logger';
import { PLUGIN_NAME } from "../config/plugin.config";

import { startExpress, stopExpress, getBuildPath } from "./plugin.utils";

class ExpressWebpackPlugin implements WebpackPluginInstance {
  private buildPath: string | null;
  private expressInstance: ChildProcessWithoutNullStreams | null;

  constructor() {
    this.buildPath = null;
    this.expressInstance = null;
  }

  beforeCompile() {
    return () => {
      if (!this.expressInstance) return;

      message("stopping express");
      stopExpress(this.expressInstance);
    };
  }

  afterCompile() {
    return () => {
      if (!this.buildPath) return;
      
      message("starting express");
      this.expressInstance = startExpress(this.buildPath);
    };
  }

  apply(compiler: Compiler) {
    this.buildPath = getBuildPath(compiler.options.output);
    const isWatching = compiler.options.watch;
    const isDevelopment = compiler.options.mode === "development";

    if (!isDevelopment || !isWatching) return;

    compiler.hooks.beforeCompile.tap(PLUGIN_NAME, this.beforeCompile());
    compiler.hooks.afterCompile.tap(PLUGIN_NAME, this.afterCompile());
  }
}

export default ExpressWebpackPlugin;
