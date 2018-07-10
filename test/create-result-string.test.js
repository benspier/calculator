import test from 'ava';
import { createResultString } from '../src/components/create-result-string';
import { button } from './fixtures/button';

test('should return string', t => {
    t.is(createResultString(button, '0', {}), 1)
});