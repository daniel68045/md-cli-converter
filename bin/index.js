#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const { convertMarkdown } = require("../src/converter");

program
  .version("1.0.0")
  .arguments("<input>")
  .option("-o, --output <directory>", "Specify output directory", "./dist")
  .option("-t, --theme <theme>", "Specify theme", "default")
  .option("--css <file>", "Specify a custom CSS file")
  .action((input, options) => {
    const inputPath = path.resolve(input);
    const outputPath = path.resolve(options.output);
    const cssFile = options.css ? path.resolve(options.css) : null;

    convertMarkdown(inputPath, outputPath, options.theme, cssFile);
  });

program.parse(process.argv);
