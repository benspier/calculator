import test from 'ava';

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

test('returns `operator`', t => {
  t.true(getKeyType({ dataset: { action: 'add' } }) === 'operator');
  t.true(getKeyType({ dataset: { action: 'subtract' } }) === 'operator');)
  t.true(getKeyType({ dataset: { action: 'multiply' } }) === 'operator');
  t.true(getKeyType({ dataset: { action: 'divide' } }) === 'operator');)
});

test('returns `clear`', t => {
  t.true(getKeyType({ dataset: { action: 'clear' } }) === 'clear');
});

test('returns `decimal`', t => {
  t.true(getKeyType({ dataset: { action: 'decimal' } }) === 'decimal');
});

test('returns `calculate`', t => {
  t.true(getKeyType({ dataset: { action: 'calculate' } }) === 'calculate');
});

