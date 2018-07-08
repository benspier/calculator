import { getKeyType } from './get-key-type';

exports.updateVisualState = (key, calculator) => {
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
