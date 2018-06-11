import './main.css';
import { debug } from 'util';

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
};

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

    // Function definitions
    const getKeyType = key => {
      const { action } = key.dataset;
      if (!action) return 'number';
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      )
        return 'operator';
      return action;
    };

    const createResultString = (key, displayedNum, state) => {
      // Variables required are:
      // 1. keyContent
      // 2. displayedNum
      // 3. previousKeyType
      // 4. action
      // 5. state.firstValue
      // 6. state.operator
      // 7. state.modValue

      const keyContent = key.textContent;
      const { action } = key.dataset;
      const {
        firstValue,
        modValue,
        operator,
        previousKeyType,
      } = state;
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
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }

      if (keyType === 'clear') return 0;

      if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const modValue = calculator.datset.modValue;

        return firstValue
          ? previousKeyType === 'calculate'
            ? calculate(firstValue, operator, modValue)
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
      // Variables needed:
      // 1. key
      // 2. calculator
      // 3. calculatedValue
      // 4. displayedNum
      // 5. modValue

      const keyType = getKeyType(key);
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
        if (action === 'clear') {
          if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
          }
          calculator.dataset.previousKeyType = 'clear';
        }
      }
      if (keyType === 'calculate') {
        calculator.dataset.modValue =
          firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum;
      }
    };

    const updateVisualState = () => {
      const keyType = getKeyType(key);
      Array.from(key.parentNode.children).forEach(k =>
        k.classList.remove('is-depressed')
      );
      if (keyType === 'operator') key.classList.add('is-depressed');
      if (keyType === 'clear' && key.textContent !== 'AC') {
        key.textContent = 'AC';
      }
      if (action !== 'clear') {
        const clearButton = document.querySelector(
          '[data-action=clear]'
        );
        clearButton.textContent = 'CE';
      }
    };
  }
});
