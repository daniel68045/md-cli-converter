#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const { convertMarkdown } = require("../src/converter");

program
  .version("1.0.0")
  .arguments("<input>")
  .option("-o, --output <directory>", "Specify output directory", "./dist")
  .option("--css <file>", "Specify a custom CSS file")
  .option("--template <file>", "Specify a custom EJS template")
  .action((input, options) => {
    const inputPath = path.resolve(input);
    const outputPath = path.resolve(options.output);
    const cssFile = options.css ? path.resolve(options.css) : null;
    const templateFile = options.template
      ? path.resolve(options.template)
      : null;
    convertMarkdown(inputPath, outputPath, cssFile, templateFile);
  });

program.parse(process.argv);
