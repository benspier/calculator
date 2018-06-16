import test from 'ava';
import { getKeyType } from '../src/components/getKeyType';
import { operators } from './fixtures/datasets';


test('returns `number`', t => {
  t.true(getKeyType({dataset: {action: undefined}}) === 'number');
});

test('returns `operator`', t => {
  t.true(getKeyType(operators.add) === 'operator');
  t.true(getKeyType(operators.subtract) === 'operator');
  t.true(getKeyType(operators.multiply) === 'operator');
  t.true(getKeyType(operators.divide) === 'operator');
});

test('returns `clear`', t => {
  t.true(getKeyType(operators.clear) === 'clear');
});

test('returns `decimal`', t => {
  t.true(getKeyType(operators.decimal) === 'decimal');
});

test('returns `calculate`', t => {
  t.true(getKeyType(operators.calculate) === 'calculate');
});

