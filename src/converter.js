const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

function convertMarkdown(
  inputFile,
  outputDir = "./dist",
  customCss = null,
  customTemplate = null
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

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const templatePath = customTemplate
      ? customTemplate
      : path.join(__dirname, "../templates/themes/default.ejs");
    if (!fs.existsSync(templatePath)) {
      console.error(`Error: Template file "${templatePath}" not found.`);
      process.exit(1);
    }

    const template = fs.readFileSync(templatePath, "utf-8");
    const finalHtml = ejs.render(template, {
      title: metadata.title || "Untitled Document",
      author: metadata.author || "Unknown",
      date: metadata.date || new Date().toISOString().split("T")[0],
      content: htmlContent,
    });

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
