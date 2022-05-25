import colors from "colors/safe";
import { PLUGIN_NAME } from "../config/plugin.config";

export function message(message: string) {
  console.log(`${colors.green(PLUGIN_NAME)}: ${message}`);
}
