# 📊 ScoreSight

An interactive and animated score analysis app built with **React 19**, **TypeScript**, **Motion**, and **Tailwind CSS**.  
This project visualizes exam scores and computes key statistics like **minimum**, **maximum**, and **mode** using **linear traversal** and an array-based frequency approach.

[🚀 Live Demo](https://protective-aqua-s8yzxstetx.edgeone.app/)

---

## ✨ Overview

ScoreSight is a modern statistical visualizer that helps users explore score distributions through an elegant dashboard interface.  
Users can add scores, remove entries, auto-fill random data, and instantly view calculated metrics alongside a live frequency histogram.

The project is designed to make algorithmic thinking and statistics more visual, interactive, and easier to understand.

---

## 🔥 Key Features

- **➕ Add New Scores**  
  Insert exam scores between 0 and 100 through a clean input interface.

- **🗑️ Remove Entries**  
  Delete individual scores directly from the recent entries list.

- **🎲 Auto-fill Random Batch**  
  Quickly populate the dataset with random scores for testing and exploration.

- **📉 Minimum, Maximum, and Mode Calculation**  
  Computes key statistical values using linear traversal and a frequency array.

- **📊 Frequency Count Histogram**  
  Displays score distribution across values from 0 to 100.

- **🏆 Highlighted Statistical Markers**  
  Clearly marks minimum, maximum, and mode values using distinct colors.

- **⚡ Real-Time Updates**  
  Every metric and chart updates instantly as the dataset changes.

- **🎨 Premium Animated Dashboard UI**  
  Features glassmorphism cards, gradient accents, and motion-based interactions.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion |
| Icons | Lucide React |
| Build Tool | Vite |
| Deployment | EdgeOne |

---

## 🧠 Core Logic

The app uses **linear traversal** to iterate through the scores array and compute the minimum, maximum, and frequency counts.  
A fixed-size array of 101 slots is used to store frequencies for values from 0 to 100, which makes mode detection efficient and easy to visualize.

This project demonstrates:
- Array traversal algorithms.
- Frequency counting.
- Basic statistics computation.
- Real-time UI updates.
- Interactive data visualization.

---

## 📸 UI Highlights

- **Add score panel** for manual data entry.
- **Recent entries list** with animated item management.
- **Metric cards** for minimum, maximum, and mode.
- **Histogram visualizer** with hover tooltips and statistical highlighting.
- **Legend system** for clear interpretation of chart colors.

---

## 🚀 How It Works

1. Users add or generate score data.
2. The app traverses the array to compute statistics.
3. A frequency array stores the occurrence count of each score.
4. The histogram updates to reflect the latest distribution.
5. Min, max, and mode values are highlighted in real time.

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
├── main.tsx
├── index.css
└── assets/
```

---

## 🎯 Skills Demonstrated

- Linear traversal logic.
- Frequency array implementation.
- Statistical analysis in JavaScript.
- Interactive dashboard design.
- Real-time histogram visualization.
- Motion-enhanced UI development.

---

## 🌐 Live Deployment

The project is deployed here:  
[https://protective-aqua-s8yzxstetx.edgeone.app/](https://protective-aqua-s8yzxstetx.edgeone.app/)

---

## 👨‍💻 About Me

Built by **Saatwik Sinha**.  
A first-year Computer Science Engineering student passionate about **AI, full-stack development, data structures, and interactive educational web applications**.

---

## 🙏 Thank You

Thank you for checking out this project.  
If you liked the concept, feel free to explore the app and learn from the implementation.  
**Your support means a lot!** 🚀
