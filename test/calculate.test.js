import test from 'ava';
import { calculate } from '../src/components/calculate';

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