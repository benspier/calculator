import test from 'ava';
import { getKeyType } from '../src/components/get-key-type';
import { action } from './fixtures/datasets';


test('should return `number`', t => {
  t.true(getKeyType(action(undefined)) === 'number');
});

test('should return `operator`', t => {
  t.true(getKeyType(action('add')) === 'operator');
  t.true(getKeyType(action('subtract')) === 'operator');
  t.true(getKeyType(action('multiply')) === 'operator');
  t.true(getKeyType(action('divide')) === 'operator');
});

test('should return action', t => {
  t.true(getKeyType(action('clear')) === 'clear');
  t.true(getKeyType(action('decimal')) === 'decimal');
  t.true(getKeyType(action('calculate')) === 'calculate');
});