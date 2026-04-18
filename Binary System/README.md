# 🌳 Binary File System

A visual and interactive tree traversal project built with **React 19**, **TypeScript**, **D3**, **Motion**, and **Tailwind CSS**.  
This app represents a file-system-style binary tree where users can create folders, delete subtrees, and watch **DFS traversals** happen live.

[🚀 Live Demo](https://remote-maroon-rxpex8r6lz.edgeone.app/)

---

## ✨ Overview

Binary File System is an educational visualization app that models a directory structure using a **binary tree**.  
Users can select folders, add left or right child nodes, remove subtrees, and run **pre-order**, **in-order**, or **post-order** traversals while the interface highlights nodes step by step.

The project turns a core data-structures topic into an intuitive visual learning experience with animated tree layouts and traversal logs.

---

## 🔥 Key Features

- **🌲 Binary Tree Folder Structure**  
  Represents directories as binary tree nodes with left and right children.

- **📂 Add Left or Right Subfolders**  
  Create new child folders interactively under the selected node.

- **🗑️ Delete Subtrees**  
  Remove a selected subtree while preserving the rest of the structure.

- **▶️ DFS Traversal Animations**  
  Run pre-order, in-order, and post-order traversals with animated node highlighting.

- **📝 Traversal Output Log**  
  Displays the node visit order live as the traversal progresses.

- **🎯 Node Selection System**  
  Click a folder node to select it and perform operations on it.

- **📊 Tree Canvas Visualization**  
  Uses D3 tree layout calculations and animated curved links for clean structure rendering.

- **🎨 Premium Dark UI**  
  Styled with a modern dark theme, glowing states, and smooth motion transitions.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Visualization | D3, D3 Hierarchy |
| Styling | Tailwind CSS |
| Animation | Motion |
| Icons | Lucide React |
| Utility | clsx, tailwind-merge |
| Build Tool | Vite |
| Deployment | EdgeOne |

---

## 🧠 Core Logic

The application stores folders as nodes in a binary tree and updates that structure through controlled recursive operations.  
Traversal functions generate node sequences for **pre-order**, **in-order**, and **post-order** depth-first search, which are then animated one step at a time in the interface.

This project demonstrates:
- Binary tree data structures.
- Recursive tree updates.
- DFS traversal algorithms.
- D3-based tree layout rendering.
- Interactive educational UI design.

---

## 📸 UI Highlights

- **Tree canvas** with draggable view and animated node placement.
- **Selection panel** for folder operations.
- **Traversal controls** for running DFS patterns.
- **Output log** showing traversal order clearly.
- **Highlighted active nodes** during traversal playback.

---

## 🚀 How It Works

1. Start with a root folder node.
2. Select a node from the tree canvas.
3. Add a left or right child folder.
4. Optionally delete a subtree.
5. Run a traversal mode to watch the DFS order animate across the tree.

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd your-project-folder
npm install
```

---

## ▶️ Running Locally

```bash
npm run dev
```

Open the app in your browser at the local development URL shown in the terminal.

---

## 🏗️ Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```bash
src/
├── App.tsx
├── TreeCanvas.tsx
├── main.tsx
├── index.css
└── assets/
```

---

## 🎯 Skills Demonstrated

- Binary tree implementation.
- Recursive traversal algorithms.
- D3-based hierarchy visualization.
- React state-driven interactivity.
- Motion-enhanced UI transitions.
- Educational interface design.

---

## 🌐 Live Deployment

The project is deployed here:  
[https://remote-maroon-rxpex8r6lz.edgeone.app/](https://remote-maroon-rxpex8r6lz.edgeone.app/)

---

## 👨‍💻 About Me

Built by **Saatwik Sinha**.  
A first-year Computer Science Engineering student passionate about **AI, full-stack development, data structures, and interactive visual web applications**.

---

## 🙏 Thank You

Thank you for checking out this project.  
If you liked the concept, feel free to explore the app and learn from the implementation.  
**Your support means a lot!** 🚀
