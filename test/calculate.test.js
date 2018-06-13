import test from 'ava';

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
};

test('adds 2 numbers', t => {
  t.is(calculate(1, 'add', 2), 3);
});

test('subtracts 2 numbers', t => {
  t.is(calculate(2, 'subtract', 1), 1);
});

test('multiplies 2 numbers', t => {
  t.is(calculate(2, 'multiply', 1), 2);
});

test('divides 2 numbers', t => {
  t.is(calculate(2, 'divide', 2), 1);
});