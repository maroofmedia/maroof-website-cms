const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
require("dotenv").config();

module.exports = function (eleventyConfig) {
  // ✅ Markdown-it configuration
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  // ✅ Tags Collection
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    let tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      if (item.data.tags) {
        let tags = Array.isArray(item.data.tags) ? item.data.tags : [item.data.tags];
        tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });
  

  // ✅ Custom Image Renderer (with captions)
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    const title = token.attrGet("title");

    return `
      <figure class="inline-image">
        <img src="${src}" alt="${alt}" loading="lazy">
        ${title ? `<figcaption>${title}</figcaption>` : alt ? `<figcaption>${alt}</figcaption>` : ""}
      </figure>
    `;
  };

  eleventyConfig.setLibrary("md", md);

  // ✅ Static Assets Copy
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({ "./src/_headers": "./_headers" });

  // ✅ Date Filter using Luxon
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // ✅ Filter collection by tag
  eleventyConfig.addFilter("filterByTag", (collection, tag) => {
    return collection.filter((item) => {
      if (!item.data.tags) return false;
      const tags = Array.isArray(item.data.tags) ? item.data.tags : [item.data.tags];
      return tags.includes(tag);
    });
  });

  // ✅ Slugify filter for clean URLs
  eleventyConfig.addFilter("slug", (input) => {
    return slugify(input || ""); 
  });

  // ✅ Global Data (Site URL & Analytics)
  eleventyConfig.addGlobalData("site", {
    url: "https://www.marooflone.com",
  });

  eleventyConfig.addGlobalData("analytics", {
    id: process.env.GOOGLE_ANALYTICS_ID || null,
  });

  // FILTER
  eleventyConfig.addFilter("capitalize", (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  

  // ✅ Eleventy Config Return
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
