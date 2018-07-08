import './main.css';
import { createResultString } from '../src/components/create-result-string';
import { updateCalculatorState } from '../src/components/update-calculator-state';
import { updateVisualState } from '../src/components/update-visual-state';

// Global variables
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

// Click event
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const displayedNum = display.textContent;

    // Pure functions
    const resultString = createResultString(
      key,
      displayedNum,
      calculator.dataset
    );

    // Update states
    display.textContent = resultString;
    updateCalculatorState(
      key,
      calculator,
      resultString,
      displayedNum
    );
    updateVisualState(key, calculator);
  }
});
