const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { convertMarkdown } = require("../src/converter");
const assert = require("assert");

const testMarkdown = `---  
title: Test Page  
author: John Doe  
date: 2025-02-03  
---

# Hello World

This is a test markdown file.`;

const testMdFile = path.join(__dirname, "test.md");
const outputDir = path.join(__dirname, "output");
const outputHtmlFile = path.join(outputDir, "test.html");

function setupTest() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(testMdFile, testMarkdown);
}

function cleanupTest() {
  if (fs.existsSync(testMdFile)) fs.unlinkSync(testMdFile);
  if (fs.existsSync(outputHtmlFile)) fs.unlinkSync(outputHtmlFile);
  if (fs.existsSync(outputDir)) fs.rmdirSync(outputDir, { recursive: true });
}

describe("Static Site CLI Tests", function () {
  before(setupTest);
  after(cleanupTest);

  it("should convert Markdown to HTML", function () {
    convertMarkdown(testMdFile, outputDir, "default");
    assert(fs.existsSync(outputHtmlFile), "HTML file was not created");
  });

  it("should include title in HTML output", function () {
    const htmlContent = fs.readFileSync(outputHtmlFile, "utf-8");

    assert(
      htmlContent.includes("<title>Test Page</title>"),
      "Title not found in HTML output"
    );
  });

  it("should run CLI command successfully", function () {
    execSync(
      `node ${path.join(
        __dirname,
        "../bin/index.js"
      )} ${testMdFile} --output ${outputDir}`,
      { stdio: "inherit" }
    );
    assert(fs.existsSync(outputHtmlFile), "CLI did not create HTML file");
  });
});
