document.addEventListener('DOMContentLoaded', () => {
    const calculatorInput = document.getElementById('calculator-input');
    const buttons = document.querySelectorAll('.btn');

    // State variables for the calculator
    let currentExpression = '0'; // The expression displayed and built
    let lastButtonWasOperator = false; // To handle operator chaining
    let hasDecimal = false; // To prevent multiple decimals in one number
    let errorState = false; // To indicate if calculator is in an error state

    // Function to update the display
    const updateDisplay = (value) => {
        calculatorInput.value = value;
    };

    // Initialize display
    updateDisplay(currentExpression);

    // --- URL Parameter Handling ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialCalculation = urlParams.get('initialCalc');

    if (initialCalculation) {
        try {
            // Basic sanitization: only allow numbers, operators, and decimal point
            const sanitizedInput = initialCalculation.replace(/[^0-9+\-*/.]/g, '');

            if (sanitizedInput !== initialCalculation) {
                updateDisplay('Error: Unsafe URL input');
                errorState = true;
                console.error('Initial calculation from URL contained disallowed characters:', initialCalculation);
                // Optionally reset after a delay or require C press
                setTimeout(() => {
                    if (errorState) { // Only reset if still in error state
                        resetCalculator();
                    }
                }, 3000);
            } else {
                // Evaluate the sanitized expression
                // Using eval() for a simple calculator with sanitized input is acceptable
                // but generally should be avoided for complex, untrusted inputs.
                let result = eval(sanitizedInput);
                if (isNaN(result) || !isFinite(result)) {
                    updateDisplay('Error: Invalid URL calc');
                    errorState = true;
                } else {
                    currentExpression = String(result);
                    updateDisplay(currentExpression);
                    lastButtonWasOperator = false;
                    hasDecimal = currentExpression.includes('.');
                }
            }
        } catch (e) {
            updateDisplay('Error: URL calc fail');
            errorState = true;
            console.error('Failed to evaluate initial calculation from URL:', e);
            setTimeout(() => {
                if (errorState) {
                    resetCalculator();
                }
            }, 3000);
        }
    }

    // --- Calculator Logic ---

    // Resets the calculator to initial state
    const resetCalculator = () => {
        currentExpression = '0';
        lastButtonWasOperator = false;
        hasDecimal = false;
        errorState = false;
        updateDisplay(currentExpression);
    };

    // Handles number button clicks
    const handleNumber = (number) => {
        if (errorState) {
            resetCalculator();
        }

        // If current expression is '0' or a previous operation just finished
        if (currentExpression === '0' || lastButtonWasOperator) {
            currentExpression = String(number);
            lastButtonWasOperator = false;
        } else {
            currentExpression += String(number);
        }
        updateDisplay(currentExpression);
    };

    // Handles decimal button click
    const handleDecimal = () => {
        if (errorState) {
            resetCalculator();
        }

        // If an operator was just pressed, start a new number with '0.'
        if (lastButtonWasOperator) {
            currentExpression += '0.';
            lastButtonWasOperator = false;
            hasDecimal = true;
        } else if (!hasDecimal && !currentExpression.split(/[\+\-\*\/]/).pop().includes('.')) {
            // Only add decimal if the current number doesn't already have one
            currentExpression += '.';
            hasDecimal = true;
        }
        updateDisplay(currentExpression);
    };

    // Handles operator button clicks
    const handleOperator = (operator) => {
        if (errorState) {
            // If in error state, pressing an operator clears the error and allows a new input
            // but for simplicity, we'll just reset and prevent operator for now
            // A more complex calculator might allow `0 + operator` to start
            resetCalculator();
            return;
        }

        hasDecimal = false; // Reset decimal flag for the next number

        // Prevent adding multiple operators or changing the last operator
        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            // Replace the last operator with the new one
            currentExpression = currentExpression.slice(0, -1) + operator;
        } else {
            currentExpression += operator;
        }
        lastButtonWasOperator = true; // Mark that an operator was just pressed
        updateDisplay(currentExpression);
    };

    // Evaluates the current expression
    const calculate = () => {
        if (errorState) {
            // If already in an error state, pressing equals just resets
            resetCalculator();
            return;
        }

        try {
            // Remove trailing operators before evaluation if present
            let expressionToEvaluate = currentExpression;
            while (['+', '-', '*', '/'].includes(expressionToEvaluate.slice(-1))) {
                expressionToEvaluate = expressionToEvaluate.slice(0, -1);
            }

            if (expressionToEvaluate === '') {
                 // If the expression is empty after trimming, just show '0'
                 updateDisplay('0');
                 currentExpression = '0';
                 return;
            }

            // Check for division by zero before eval
            if (expressionToEvaluate.includes('/0')) {
                // Regex to find division by zero specifically, e.g., /0, /0.0, /0.
                if (/\/\s*0(\.0*)?(?![0-9])/.test(expressionToEvaluate)) {
                    throw new Error('DivByZero');
                }
            }

            // Use eval() for simple arithmetic expressions.
            // It's critical to ensure the input is sanitized in real-world apps,
            // but for purely arithmetic operations from button clicks, it's common.
            let result = eval(expressionToEvaluate);

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('InvalidResult');
            }

            // Format result to avoid excessive decimal places
            result = parseFloat(result.toFixed(10)); // Limit to 10 decimal places to prevent floating point issues

            currentExpression = String(result);
            updateDisplay(currentExpression);
            lastButtonWasOperator = false;
            hasDecimal = currentExpression.includes('.');
        } catch (e) {
            console.error('Calculation Error:', e);
            if (e.message === 'DivByZero') {
                updateDisplay('Error: Div by Zero');
            } else {
                updateDisplay('Error: Invalid Exp');
            }
            errorState = true;
            // Reset after a short delay so user can see the error
            setTimeout(resetCalculator, 2000);
        }
    };

    // --- Event Listeners ---

    // Button click handling
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const value = button.textContent;

            if (action === 'number') {
                handleNumber(value);
            } else if (action === 'decimal') {
                handleDecimal();
            } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                handleOperator(value);
            } else if (action === 'equals') {
                calculate();
            } else if (action === 'clear') {
                resetCalculator();
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            handleNumber(e.key);
        } else if (e.key === '.') {
            handleDecimal();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            handleOperator(e.key);
        } else if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if applicable
            calculate();
        } else if (e.key === 'Escape') {
            resetCalculator();
        } else if (e.key === 'Backspace') {
            // Allow backspace to remove last character if not in error state
            if (!errorState && currentExpression.length > 1) {
                currentExpression = currentExpression.slice(0, -1);
                // Re-evaluate decimal status for the current number
                const parts = currentExpression.split(/[\+\-\*\/]/);
                hasDecimal = parts[parts.length - 1].includes('.');
                if (['+', '-', '*', '/'].includes(currentExpression.slice(-1))) {
                    lastButtonWasOperator = true;
                } else {
                    lastButtonWasOperator = false;
                }
                updateDisplay(currentExpression);
            } else if (!errorState && currentExpression.length <= 1) {
                // If only one char left or empty, reset to '0'
                resetCalculator();
            }
        }
    });
});