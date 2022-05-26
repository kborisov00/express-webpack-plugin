import { WebpackError } from "webpack";

import MESSAGES from "../config/messages.config";

export function throwFileNameError() {
  throw new WebpackError(MESSAGES.fileNameError);
}

export function throwPathError() {
  throw new WebpackError(MESSAGES.pathError);
}