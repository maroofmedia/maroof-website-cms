# 🌍 Personal Website & Blog

This is my personal website and blog, now powered by **Eleventy (11ty)**, a simple and flexible static site generator. I initially built this site using **HTML**, **CSS**, and **JavaScript**, and later integrated Eleventy to enhance the blogging experience.

## 🚀 Features

- Fast and secure static site built with **Eleventy (11ty)**  
- Clean, minimal design with responsive styling  
- Easy-to-navigate blog structure  
- Markdown support for writing blog posts  
- Optimized for performance and SEO  

## 🛠️ Built With

- **Eleventy (11ty)** – Static Site Generator  
- **HTML5** – Structure and content  
- **CSS3** – Custom styling and layouts  
- **JavaScript** – Basic functionality and interactivity  

## 📂 Project Structure

```
├── src/
│ ├── _includes/ # Nunjucks templates and partials
│ │ ├── article.njk # Article snippet template
│ │ ├── base.njk # Base layout template
│ │ ├── footer.njk # Footer template
│ │ ├── header.njk # Header template
│ ├── admin/ # Netlify CMS configuration
│ │ ├── config.yml # CMS configuration file
│ │ └── index.html # Admin panel
│ ├── assets/ # Static files (images, fonts, etc.)
│ ├── blog/ # Blog posts written in Markdown
│ ├── blog.njk # Blog layout template
│ ├── style.css # Main stylesheet
│ └── index.njk # Home page layout
├── .eleventy.js # Eleventy configuration file
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
```

## 💻 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maroofmedia/maroof-website-cms.git
   ```
2. **Navigate into the project folder:**
   ```bash
   cd maroof-website-cms
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Start the local development server:**
   ```bash
   npm start
   ```

Your site should now be running at `http://localhost:8080`.

## 🌐 Live Site

You can view the live version of this site here:  
👉 [My Website](https://www.marooflone.com)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built using **Eleventy (11ty)**  
- Deployed using **Netlify**
