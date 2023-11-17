#! /usr/bin/env node
import { program } from "commander";
import { createRequire } from "module";
import { proxyHandle } from '../package/proxy.js'
const require = createRequire(import.meta.url);
const { version, description } = require("../package.json");
program
  .version(version, '-v --version')
  .description(description)
  .action(() => {
    proxyHandle(program)
  })
program.parse();
