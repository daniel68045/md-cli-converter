const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const renderer = require("./renderer");

function convertMarkdown(
  inputFile,
  outputDir = "./dist",
  theme = "default",
  customCss = null
) {
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

    let cssFileName = "styles.css";

    if (customCss) {
      const customCssDest = path.join(outputDir, path.basename(customCss));
      fs.copyFileSync(customCss, customCssDest);
      cssFileName = path.basename(customCss);
    } else {
      const defaultCssSource = path.join(__dirname, "../public/styles.css");
      const defaultCssDest = path.join(outputDir, "styles.css");
      if (fs.existsSync(defaultCssSource) && !fs.existsSync(defaultCssDest)) {
        fs.copyFileSync(defaultCssSource, defaultCssDest);
      }
    }

    const outputFileName =
      path.basename(inputFile, path.extname(inputFile)) + ".html";
    const outputFilePath = path.join(outputDir, outputFileName);

    fs.writeFileSync(
      outputFilePath,
      finalHtml.replace("styles.css", cssFileName)
    );
  } catch (error) {
    console.error("Conversion error:", error);
  }
}

module.exports = { convertMarkdown };
