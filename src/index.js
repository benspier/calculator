import './main.css';
import { calculate } from '../src/components/calculate';
import { getKeyType } from '../src/components/getKeyType';

// Function declarations

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const { firstValue, modValue, operator, previousKeyType } = state;
  const keyType = getKeyType(key);

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
    )
      return '0.';
    return displayedNum;
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === 'clear') return 0;

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType,
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'number') {
  }

  if (keyType === 'decimal') {
  }

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === 'clear') {
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = '';
      calculator.dataset.modValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.previousKeyType = '';
    }
    calculator.dataset.previousKeyType = 'clear';
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue =
      firstValue && previousKeyType === 'calculate'
        ? modValue
        : displayedNum;
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach(k =>
    k.classList.remove('is-depressed')
  );

  if (keyType === 'operator') key.classList.add('is-depressed');
  if (keyType === 'clear' && key.textContent !== 'AC')
    key.textContent = 'AC';
  if (keyType !== 'clear') {
    const clearButton = document.querySelector(
      '[data-action=clear]'
    );
    clearButton.textContent = 'CE';
  }
};

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
