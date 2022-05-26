import colors from "colors/safe";
import { PLUGIN_NAME } from "../config/plugin.config";

function message(sender: string, messageText: string) {
  console.log(colors.green(`[${sender}] ${messageText}`));
}

export function pluginMessage(messageText: string) {
  message(PLUGIN_NAME, messageText);
}

export function defaultMessage(messageText: string) {
  console.log(messageText);
}

export function clearConsole() {
  console.clear();
}