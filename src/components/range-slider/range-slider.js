class rangeSlider {
  constructor(item) {
    console.log('sss');
    this.init(item);
  }

  init(item) {
    const rangeSliderHere = item.querySelector('.range-slider-here');
    this.rangeSliderResult = item.querySelector('.js-range-slider__result');
    const rangeSlider = $(rangeSliderHere).ionRangeSlider({
      type: "double",
      skin: "round",
      hide_from_to: true,
      hide_min_max: true,
      min: 500,
      max: 15000,
      from: 5000,
      to: 10000,
      onChange: this.onChande.bind(this),
      onStart: this.printResult.bind(this)
    });
  }

  onChande(data) {
    this.printResult(data);
  }

  printResult(data) {
    let result = `${data.from_pretty}\u20BD - ${data.to_pretty}\u20BD`;
    this.rangeSliderResult.textContent = result;
  }
}

export default rangeSlider;