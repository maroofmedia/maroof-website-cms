require('dotenv').config();

const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Custom markdown-it instance
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  // Custom image renderer to include captions using alt or title attributes
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    const title = token.attrGet("title");

    // Return image wrapped in a <figure> with a <figcaption> for the caption
    return `
      <figure class="inline-image">
        <img src="${src}" alt="${alt}" loading="lazy">
        ${
          title
            ? `<figcaption>${title}</figcaption>`
            : alt
            ? `<figcaption>${alt}</figcaption>`
            : ""
        }
      </figure>
    `;
  };

  eleventyConfig.setLibrary("md", md);

  // Passthrough copy for static files
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({ "./src/_headers": "./_headers" });


  // Custom date filter using Luxon
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Add global site data for absolute URLs
  eleventyConfig.addGlobalData("site", {
    url: "https://www.marooflone.com", 
  });

  // Anaylytics
  eleventyConfig.addGlobalData("analytics", {
    id: process.env.GOOGLE_ANALYTICS_ID || null,
  });
  
  // Return configuration settings
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
