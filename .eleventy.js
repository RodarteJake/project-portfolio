const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    // Configure markdown processor
    const md = new markdownIt();
    eleventyConfig.setLibrary("md", md);

    // Pass through static assets
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("styles.css");
    eleventyConfig.addPassthroughCopy("scripts");

    // Create a collection of blog posts using Eleventy's native collection
    eleventyConfig.addCollection("posts", function(collection) {
        return collection
            .getFilteredByGlob("./posts/*.md")
            .sort((a, b) => b.date - a.date);
    });

    // Filter to get recent posts
    eleventyConfig.addFilter("recentPosts", function(posts, count = 3) {
        return posts.slice(0, count);
    });

    // Filter to format dates
    eleventyConfig.addFilter("dateFilter", function(date) {
        if (!date) return "";

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateObject;

        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            const [year, month, day] = date.split('-').map(Number);
            dateObject = new Date(year, month - 1, day);
        } else if (date instanceof Date && !isNaN(date.getTime())) {
            dateObject = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        } else {
            dateObject = new Date(date);
        }

        return dateObject.toLocaleDateString('en-US', options);
    });

    // Filter to get excerpt (first 120 chars of body text)
    eleventyConfig.addFilter("excerpt", function(body) {
        if (!body) return "";
        const text = body.replace(/<[^>]*>/g, '').trim();
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
    });

    return {
        pathPrefix: "/project-portfolio/",
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            layouts: "_includes"
        },
        templateFormats: ["njk", "md", "html"],
        markdownTemplateEngine: "njk"
    };
};
