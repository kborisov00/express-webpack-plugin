import type { Compiler, WebpackPluginInstance } from "webpack";
import type { ChildProcessWithoutNullStreams } from "child_process";

import MESSAGES from "../config/messages.config";
import { PLUGIN_NAME } from "../config/plugin.config";
import { pluginMessage, clearConsole } from "../utils/logger";

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
      clearConsole();
      pluginMessage(this.expressInstance ? MESSAGES.restarting : MESSAGES.init);

      if (!this.expressInstance) return;
      stopExpress(this.expressInstance);
    };
  }

  afterCompile() {
    return () => {
      if (!this.buildPath) return;
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
