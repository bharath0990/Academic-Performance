# Academic Performance Calculator
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/bharath0990/Academic-Performance)

A modern, easy-to-use web application designed to help students track and calculate their academic performance. This tool features two primary calculators: a CGPA Calculator and an Attendance Calculator, accessible through a clean, tabbed interface.

## Features

This application provides two essential tools for students:

### 📊 CGPA Calculator
- **Grade-Based Calculation**: Input the number of subjects for each grade point (from 10 down to 0).
- **Instant Results**: The calculator provides a real-time CGPA calculation based on your inputs.
- **Total Subjects**: Displays the total number of subjects included in the calculation.
- **Reset Functionality**: Easily clear all inputs to start a new calculation.

### 出席 Attendance Calculator
- **Customizable Requirements**: Set the required attendance percentage (e.g., 75%, 80%, 85%).
- **Current Status**: Enter the number of classes you've attended and the total number of classes held to see your current attendance percentage.
- **Actionable Insights**:
    - If you are below the required percentage, the calculator tells you exactly how many more classes you need to attend consecutively to meet the requirement.
    - If you are at or above the required percentage, it calculates how many classes you can afford to miss ("bunk") while staying above the threshold.
- **Dynamic Feedback**: The results are presented with clear, color-coded messages to quickly understand your standing.

## Tech Stack

This project is built with a modern frontend stack:

-   **Framework**: React
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React

## Getting Started

To run this project locally, follow these simple steps.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bharath0990/Academic-Performance.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Academic-Performance
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will now be running on `http://localhost:5173`.

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the source code using ESLint.
-   `npm run preview`: Serves the production build locally to preview it.
