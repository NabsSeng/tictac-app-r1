# Simple Calculator Web Application

## Task ID: tictac-app

This repository contains a simple, client-side web application for a basic calculator. It's designed to be fully functional within a web browser, requiring no server-side components, making it ideal for deployment on static hosting platforms like GitHub Pages.

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Usage](#usage)
*   [URL Parameters](#url-parameters)
*   [Error Handling](#error-handling)
*   [Responsiveness](#responsiveness)
*   [Code Structure](#code-structure)
*   [Future Enhancements](#future-enhancements)
*   [License](#license)

## Features

*   **Basic Arithmetic Operations**: Perform addition, subtraction, multiplication, and division.
*   **Clear Functionality**: Reset the calculator display.
*   **Decimal Support**: Handle floating-point numbers.
*   **User-Friendly Interface**: Intuitive layout with clear buttons.
*   **Responsive Design**: Adapts to different screen sizes (desktops, tablets, mobile phones).
*   **Error Handling**: Catches common calculation errors like division by zero or invalid expressions.
*   **URL Parameter Support**: Can pre-load an initial calculation from the URL.
*   **Modern Web Standards**: Built with ES6+, CSS3, and HTML5.

## Technologies Used

*   **HTML5**: For the basic structure and content of the web page.
*   **CSS3**: For styling, layout (Flexbox, Grid), and responsiveness (Media Queries).
*   **JavaScript (ES6+)**: For all interactive functionality, calculation logic, and DOM manipulation.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You only need a modern web browser to run this application (e.g., Chrome, Firefox, Safari, Edge).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[your-username]/[your-repo-name].git
    cd [your-repo-name]
    ```
    (Replace `[your-username]` and `[your-repo-name]` with your actual GitHub details.)

2.  **Open `index.html`:**
    Simply open the `index.html` file in your preferred web browser. You can do this by navigating to the file in your file explorer and double-clicking it, or by dragging it into an open browser window.

### Usage

1.  **Enter Numbers**: Click on the number buttons (0-9) to input digits.
2.  **Add Decimals**: Use the `.` button for decimal numbers.
3.  **Perform Operations**: Click on the operator buttons (`+`, `-`, `*`, `/`) to specify the arithmetic operation.
4.  **Calculate Result**: Click the `=` button to see the result.
5.  **Clear Display**: Click the `C` button to clear the current input and reset the calculator.
6.  **Keyboard Support**: You can also use your keyboard to type numbers, operators, and press `Enter` for equals, or `Escape` to clear.

## URL Parameters

This application supports an optional URL parameter for pre-loading an initial calculation.

*   **`initialCalc`**: Provide a URL-encoded arithmetic expression. The calculator will attempt to evaluate this expression upon loading.

**Example:**
To load the calculator with the result of `10 * 5`:
`your-domain.com/index.html?initialCalc=10*5`

To load with a more complex calculation:
`your-domain.com/index.html?initialCalc=(20%2B5)*2` (Note: `+` needs to be URL-encoded as `%2B`)

## Error Handling

The calculator includes robust error handling for common issues:

*   **Division by Zero**: If you attempt to divide a number by zero, the display will show "Error: Div by Zero".
*   **Invalid Expressions**: If an invalid arithmetic expression is entered (e.g., `5++`), the display will show "Error: Invalid Exp".
*   **URL Parameter Errors**: If the `initialCalc` URL parameter contains an unsafe or malformed expression, specific error messages like "Error: Unsafe URL input" or "Error: URL calc fail" will be displayed.

## Responsiveness

The calculator's interface is designed to be responsive, adapting its layout and button sizes to provide a good user experience across various devices, from mobile phones to desktop monitors. This is achieved using CSS Flexbox, Grid, and media queries.

## Code Structure

The project is organized into three main files:

*   `index.html`: The main HTML file that defines the structure of the calculator.
*   `style.css`: Contains all the CSS rules for styling and layout.
*   `script.js`: Implements the core calculator logic, event handling, and URL parameter processing.

## Future Enhancements

Potential future improvements could include:

*   Adding more advanced mathematical functions (e.g., `sin`, `cos`, `sqrt`).
*   Implementing a calculation history feature (persisted with `localStorage`).
*   Support for parentheses for more complex expression grouping.
*   Theming options.

## License

This project is open-sourced under the MIT License.

---
**Note:** This application is purely client-side and does not make use of the `fetch()` API as no external resources are required for its core functionality. The requirement for `fetch()` is typically for applications that need to interact with external APIs, which is not the case for a simple offline calculator.