#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const { convertMarkdown } = require("../src/converter");

program
  .version("1.0.0")
  .arguments("<input>")
  .option("-o, --output <directory>", "Specify output directory", "./dist")
  .option("-t, --theme <theme>", "Specify theme", "default")
  .action((input, options) => {
    const inputPath = path.resolve(input);
    const outputPath = path.resolve(options.output);
    convertMarkdown(inputPath, outputPath, options.theme);
  });

program.parse(process.argv);
