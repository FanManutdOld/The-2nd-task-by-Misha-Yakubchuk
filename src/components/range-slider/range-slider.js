import 'ion-rangeslider';

class RangeSlider {
  constructor(parent) {
    const rangeSlider = parent.querySelector('.js-range-slider');
    this.init(rangeSlider);
  }

  init(rangeSlider) {
    const rangeSliderHere = rangeSlider.querySelector('.js-range-slider__slider-input');
    this.rangeSliderResult = rangeSlider.querySelector('.js-range-slider__result');
    $(rangeSliderHere).ionRangeSlider({
      type: 'double',
      skin: 'round',
      hide_from_to: true,
      hide_min_max: true,
      min: 500,
      max: 15000,
      from: 5000,
      to: 10000,
      onChange: this.onChange.bind(this),
      onStart: this.printResult.bind(this),
    });
  }

  onChange(data) {
    this.printResult(data);
  }

  printResult(data) {
    const result = `${data.from_pretty}\u20BD - ${data.to_pretty}\u20BD`;
    this.rangeSliderResult.textContent = result;
  }
}

export default RangeSlider;
