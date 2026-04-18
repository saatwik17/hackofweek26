# 🏦 ATM Queue Simulator

A modern queue simulation project built with **React 19**, **TypeScript**, **Motion**, and **Tailwind CSS**.  
This application visualizes how a **circular queue** works in a bank ATM environment, combining data structure logic with an interactive and visually engaging interface.

[🚀 Live Demo](https://partial-green-6j73ykltk1.edgeone.app/)

---

## ✨ Overview

ATM Queue Simulator is an educational and interactive web app that demonstrates the working of a **circular array queue** using a real-world banking scenario.  
Customers are added and served through enqueue and dequeue operations, while the UI displays the **front**, **rear**, queue state, and live event logs.

The project is designed to make abstract data structure concepts easier to understand through simulation, animation, and real-time feedback.

---

## 🔥 Key Features

- **🔄 Circular Queue Implementation**  
  Uses a custom React hook to implement enqueue, dequeue, reset, full, empty, and size operations with circular array logic.

- **👥 ATM Customer Simulation**  
  Random customers enter and leave the queue, making the demonstration realistic and dynamic.

- **📊 Live Queue Statistics**  
  Tracks current size, queue state, served customers, and dropped customers in real time.

- **⏯️ Simulation Controls**  
  Start or stop the simulation and switch between normal mode and peak-hour mode.

- **🚨 Peak Hour Stress Testing**  
  Simulates faster arrivals and slower servicing to show how queues become full under heavy traffic.

- **🧠 Memory Ring Visualizer**  
  Displays queue slots in a circular visual layout with front and rear pointers for better conceptual clarity.

- **📝 Event Logs**  
  Logs enqueue, dequeue, full queue, and reset events with timestamps.

- **🎨 Premium Dashboard UI**  
  Dark-themed interface with motion effects, color-coded states, and interactive controls.

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

The main logic is built around a **custom circular queue hook** that manages the queue array, front pointer, rear pointer, and size calculation.  
It correctly handles wrap-around cases when the rear reaches the end of the array and continues from the beginning, which is the key property of a circular queue.

This project demonstrates:
- Circular queue operations.
- Real-time simulation logic.
- React hook design.
- Data structure visualization.
- Interactive UI state management.

---

## 📸 UI Highlights

- **Header controls** for simulation and peak-hour toggling.
- **Stats cards** showing queue size, state, served count, and turned-away count.
- **Circular memory visualizer** for slot-by-slot queue representation.
- **Manual operation panel** for enqueue, dequeue, and reset.
- **System log panel** for tracking events live.

---

## 🚀 How It Works

1. Customers are added to the queue using enqueue.
2. The ATM serves customers using dequeue.
3. Front and rear pointers move according to circular queue rules.
4. If the queue becomes full, new customers are turned away.
5. Logs and metrics update continuously during the simulation.

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
├── useCircularQueue.ts
├── main.tsx
├── index.css
└── assets/
```

---

## 🎯 Skills Demonstrated

- Data structure implementation in React.
- Circular queue logic using arrays.
- Custom hook development.
- Simulation-based interface design.
- Real-time dashboard updates.
- Interactive educational visualization.

---

## 🌐 Live Deployment

The project is deployed here:  
[https://partial-green-6j73ykltk1.edgeone.app/](https://partial-green-6j73ykltk1.edgeone.app/)

---

## 👨‍💻 About Me

Built by **Saatwik Sinha**.  
A first-year Computer Science Engineering student passionate about **AI, full-stack development, data structures, and interactive web experiences**.

---

## 🙏 Thank You

Thank you for checking out this project.  
If you liked the concept, feel free to explore the app and learn from the implementation.  
**Your support means a lot!** 🚀
