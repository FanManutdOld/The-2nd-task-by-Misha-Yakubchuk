class MaskedTextField {
  constructor(parent) {
    const maskedTextField = parent.querySelector('.js-masked-text-field');
    this.init(maskedTextField);
  }

  init(maskedTextField) {
    this.input = maskedTextField.querySelector('.js-masked-text-field__input');
    this.tooltip = maskedTextField.querySelector('.js-masked-text-field__tooltip');

    this.input.addEventListener('paste', this.handleInputOnPaste.bind(this));
    this.input.addEventListener('input', this.handleInputOnInput.bind(this));
  }

  handleInputOnPaste(e) {
    const input = e.target;
    const inputNumbersValue = this.getInputNumbersValue(input.value);
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }

  handleInputOnInput(e) {
    let result = '';
    const input = e.target;
    const inputValue = input.value;
    const selectionStart = input.selectionStart;
    const inputNumbersValue = this.getInputNumbersValue(inputValue);

    if (inputValue.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      this.checkDate(inputNumbersValue.length, input);
      return;
    }

    if (inputNumbersValue.length > 0) {
      result += inputNumbersValue.slice(0, 2);
    }
    if (inputNumbersValue.length >= 3) {
      result += `.${inputNumbersValue.slice(2, 4)}`;
    }
    if (inputNumbersValue.length >= 5) {
      result += `.${inputNumbersValue.slice(4, 8)}`;
    }
    input.value = result;
    this.checkDate(inputNumbersValue.length, input);
  }

  getInputNumbersValue(value) {
    return value.replace(/\D/g, '');
  }

  checkDate(inputLength, input) {
    if (inputLength === 8) {
      const dateArr = input.value.split('.');
      const inputDate = new Date(`${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`);
      const isWrongDate = Number(dateArr[2]) !== inputDate.getFullYear()
        || Number(dateArr[1]) !== (inputDate.getMonth() + 1)
        || Number(dateArr[0]) !== inputDate.getDate();
      if (isWrongDate) {
        input.setCustomValidity('Введите корректную дату');
        this.tooltip.classList.add('masked-text-field__tooltip_shown');
      } else if (inputDate.getTime() > Date.now()) {
        input.setCustomValidity('Введите корректную дату');
        this.tooltip.classList.add('masked-text-field__tooltip_shown');
      } else {
        input.setCustomValidity('');
        this.tooltip.classList.remove('masked-text-field__tooltip_shown');
      }
    }
  }
}

export default MaskedTextField;
