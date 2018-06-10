import './main.css';
import { debug } from 'util';

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', e => {
  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  //calculate function
  const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
  };

  //if key hit...
  if (e.target.matches('button')) {
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove('is-depressed')
    );

    //...is a number
    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = `${displayedNum}${keyContent}`;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    //...is decimal
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = `${displayedNum}${'.'}`;
      }
      if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = '0.';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }

    //...is an operator
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        const calcValue = calculate(
          firstValue,
          operator,
          secondValue
        );
        display.textContent = calcValue;

        //update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        //if there are no calculations, set displayedNum as firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    //...is calculate
    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(
          firstValue,
          operator,
          secondValue
        );
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }

    //...is clear
    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.modValue = '';
        calculator.dataset.previousKeyType = '';
      }
      display.textContent = '0';
      key.textContent = 'AC';
      calculator.dataset.previousKeyType = 'clear';
    }

    if (action !== 'clear') {
      const clearButton = document.querySelector(
        '[data-action=clear]'
      );
      clearButton.textContent = 'CE';
    }
  }
});
