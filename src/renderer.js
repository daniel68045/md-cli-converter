const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

function renderHTML(
  htmlContent,
  metadata,
  theme = "default",
  isFallback = false
) {
  try {
    const themePath = path.join(
      __dirname,
      "../templates/themes",
      `${theme}.ejs`
    );

    if (!fs.existsSync(themePath)) {
      if (isFallback) {
        console.error(`Default theme not found. Cannot render HTML.`);
        return `<h1>Error: No valid theme available</h1>`;
      }
      console.warn(`Theme "${theme}" not found. Using default theme.`);
      return renderHTML(htmlContent, metadata, "default", true);
    }

    const template = fs.readFileSync(themePath, "utf-8");

    return ejs.render(template, {
      title: metadata.title || "Untitled Document",
      author: metadata.author || "Unknown",
      date: metadata.date || new Date().toISOString().split("T")[0],
      content: htmlContent,
    });
  } catch (error) {
    console.error("Error rendering HTML:", error);
    return `<h1>Error generating page</h1>`;
  }
}

module.exports = { renderHTML };
