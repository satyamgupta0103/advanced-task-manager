# Advanced Task Manager App

A fully featured Task Manager built using **React**, **Vite**, **React Context**, **useReducer**, **Custom Hooks**, **LocalStorage**, and **react-beautiful-dnd**.  
Includes a modern UI, Dark/Light theme toggle, drag-and-drop reordering, and clean state management.

---

## 🚀 Features

### ✔ Core Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Pending / Completed)
- Reorder tasks using drag-and-drop
- Persist tasks automatically using LocalStorage

### ✔ Additional React Features

- **Custom Hook:** `useLocalStorage`
- **Context API + useReducer** for global task state
- **Performance optimizations** using:
  - `React.memo`
  - `useCallback`
  - `useMemo`
- Form validation to prevent empty task addition

### ✔ Additional UI Features

- Light / Dark mode toggle
- Smooth animations on add/remove
- Fully responsive layout
- Clean minimal design
- Accessible buttons and inputs

---

## 🧩 Folder Structure

src/
├── components/
│ ├── TaskForm.jsx
│ ├── TaskList.jsx
│ ├── TaskItem.jsx
│ ├── ThemeToggle.jsx
│ └── FilterButtons.jsx
│
├── context/
│ └── TaskContext.jsx
│
├── hooks/
│ └── useLocalStorage.js
│
├── utils/
│ └── uid.js
│
├── App.jsx
├── main.jsx
└── index.css

---

## 🧠 Architecture Overview

App.jsx
├── ThemeToggle
├── TaskForm
├── FilterButtons
└── TaskList
└── TaskItem (Draggable)

- Global state is managed via **Context API + useReducer**
- Tasks persist using a **custom useLocalStorage hook**
- Drag and drop implemented using **react-beautiful-dnd**

---

## 🔌 Getting Started

### 1️⃣ Install dependencies

npm install

### 2️⃣ Start the dev server

npm run dev

### 3️⃣ Build for production

npm run build
