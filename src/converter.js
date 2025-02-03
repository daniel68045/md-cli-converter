const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const renderer = require("./renderer");

function convertMarkdown(inputFile, outputDir = "./dist", theme = "default") {
  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: File "${inputFile}" not found.`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(inputFile, "utf-8");

    const parsed = matter(fileContent.trim(), { delimiters: "---" });
    const metadata = parsed.data || {};
    const markdownBody = parsed.content;

    const htmlContent = marked.parse(markdownBody);

    const finalHtml = renderer.renderHTML(htmlContent, metadata, theme);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFileName =
      path.basename(inputFile, path.extname(inputFile)) + ".html";
    const outputFilePath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputFilePath, finalHtml);
  } catch (error) {
    console.error("Conversion error:", error);
  }
}

module.exports = { convertMarkdown };
