import { Compiler } from "webpack";
import { spawn } from "child_process";
import { join } from "path";

import type { ChildProcessWithoutNullStreams } from "child_process";

import { defaultMessage } from "../utils/logger";

export function getBuildPath(
  output: Compiler["options"]["output"]
): string | null {
  const { path, filename } = output;

  if (!path || !filename) return null;

  return join(path, filename as string);
}

export function startExpress(
  buildPath: string
): ChildProcessWithoutNullStreams {
  const expressInstance = spawn("node", [buildPath], { shell: false });

  expressInstance.stdout.on("data", stdout);
  expressInstance.stderr.on("data", stderr);

  return expressInstance;
}

export function stopExpress(
  expressInstance: ChildProcessWithoutNullStreams
): void {
  expressInstance.kill("SIGINT");
}

function formatData(data: any): string {
  return data
    .toString()
    .replace(/\s{2,}/g, "")
    .trim();
}

function stdout(data: any): void {
  defaultMessage(formatData(data));
}

function stderr(data: any): void {
  defaultMessage(formatData(data));
}
