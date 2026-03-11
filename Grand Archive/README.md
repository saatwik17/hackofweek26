# 📚 Grand Achieve – Library Book Catalogue

Welcome to **Grand Achieve**, a modern library book catalogue web app designed to manage a fixed-size collection of books efficiently.  
This project focuses on array-based storage, enabling precise control over capacity, search, and update operations.

🔗 **Live Demo:** [Click here to view the website](https://nuclear-green-ez4oolkbyo.edgeone.app/) 🌎

***

## ✨ Features

- 📖 Fixed-size collection of books stored in an array-like structure.  
- 🔍 Search books by title to quickly locate specific entries.  
- ➕ Add books only when there is remaining capacity.  
- ➖ Remove books while keeping the catalogue within defined limits.  
- 📊 Clear feedback when the catalogue is full or when a book is not found.  
- 💻 Simple, intuitive UI focused on demonstrating data structure concepts.

***

## 🏗️ Tech Stack

- 🌐 **Frontend:** HTML, CSS, JavaScript.  
- 🧮 **Core Logic:** Array-based book storage with manual capacity checks and basic search by title.  
- ☁️ **Hosting:** Edge-hosted static website (e.g., EdgeOne Pages) for fast and reliable delivery.

***

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. If you use a simple static setup
# Just open index.html in your browser
# or run a simple static server like:
# npx serve .
```

If you are using a bundler or dev server, document it like this:

```bash
npm install
npm run dev
```

Open your browser at `http://localhost:3000` (or the port your dev server uses).

***

## 📦 Build & Deployment

If you are using a build step (optional):

```bash
npm run build
```

This will generate an optimized production build (commonly in a `dist` or `build` directory).

To deploy on your edge hosting provider (e.g., EdgeOne Pages):

1. Create a new project in the hosting console.  
2. Connect your Git repository or upload the static files.  
3. Set the build command (if any) and output directory.  
4. Deploy and let the edge network serve your site globally.

For a pure static site (HTML/CSS/JS only), you can directly upload the project files without a build step.

***

## 🧪 Scripts (Example)

Update these according to your actual `package.json` (if you use Node tooling):

```json
{
  "scripts": {
    "dev": "your-dev-command",
    "build": "your-build-command",
    "preview": "your-preview-command"
  }
}
```

If you don’t use any bundler, you can omit this section.

***

## 🧠 Core Functionality (Concept)

- Books are stored in an array with a fixed maximum size.  
- Each book entry typically contains fields like title, author, and ID.  
- Search is implemented by iterating through the array and matching the title.  
- Add operation checks if there is remaining capacity before inserting.  
- Remove operation finds the book by title (or ID) and removes or marks the slot as empty.  

This structure is ideal for demonstrating basic data structures and array manipulation in a visual, interactive way.

***

## 🤝 Contributing

Contributions are welcome! 🎉

- Fork this repository.  
- Create a new branch: `git checkout -b feature/your-feature-name`.  
- Commit your changes: `git commit -m "Add your feature"`.  
- Push to the branch: `git push origin feature/your-feature-name`.  
- Open a Pull Request.

***

## 📄 License

This project is released under the license of your choice (for example, MIT). 📝  
Update this section with the actual license used in your repository (and include a `LICENSE` file if applicable).

***

## 💡 Future Improvements

- 📱 Enhanced mobile responsiveness and accessibility for all users.  
- 🧩 Support for additional search filters (author, category, ID).  
- 💾 Persistence using localStorage or a backend database.  
- 📈 Statistics on catalogue usage (total books, most searched titles, etc.).  
