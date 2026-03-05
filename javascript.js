class calculator {
  selectors = {
    buttons: '[data-js-container]',
    display: '[data-js-display]'
  }

  states = {
    displayValue: '0',
    state: false
  }

  constructor() {

    this.buttonsElement = document.querySelector(this.selectors.buttons)
    this.displayElement = document.querySelector(this.selectors.display)

    this.event()
    this.render()
  }

  event() {

    this.buttonsElement.addEventListener('click', (e) => {

      e.target.classList.add('pressed');
      setTimeout(() => e.target.classList.remove('pressed'), 150);

      const input = e.target.innerText

      this.handleInput(input)
    })

  }

  handleInput(input) {

    this.calculate(input)

    this.render()

  }

  calculate(input) {

    let parts = this.states.displayValue.split(/[+\-*/]/)
    let currentNumber = parts[parts.length - 1]

    let lastChar = this.states.displayValue[this.states.displayValue.length - 1]
    let lastCharNumber = this.states.displayValue.length - 1

    if (input === '.' && currentNumber.includes('.')) {
      return
    }


    else if(this.states.state === true &&
      !isNaN(Number(input))) {

      this.states.displayValue = '' + input
      this.states.state = false
    }

    else if(
      !isNaN(Number(input)) &&
      Number(this.states.displayValue) !== 0 ||
      !isNaN(Number(input)) &&
      lastChar === '.') {

      this.states.displayValue += input
      this.states.state = false
    }

    else if(['+', '-', '*', '/', '.'].includes(lastChar) &&
      ['+', '-', '*', '/', '.'].includes(input)){
      this.states.displayValue = String(this.states.displayValue.slice(0, lastCharNumber)) + input
    }

    else if (input === '<' && this.states.displayValue.length > 1) {
      this.states.displayValue = this.states.displayValue.slice(0, lastCharNumber)
    }

    else if (input === '<' && this.states.displayValue.length === 1) {
      this.states.displayValue = '0'
    }

    else if (!isNaN(Number(lastChar)) &&
      ( input === '+' ||
        input === '-' ||
        input === '*' ||
        input === '/' ||
        input === '.')) {
      this.states.displayValue += input
      this.states.state = false
    }

    else if (input === '%') {
      let match = this.states.displayValue.match(/(.+)([+\-*/])(.+)/)

      if (!match) {
        // просто число
        this.states.displayValue = String(Number(this.states.displayValue) / 100)
        this.states.state = true
        return
      }

      let a = Number(match[1])
      let op = match[2]
      let b = Number(match[3])

      let result

      if (op === '+' || op === '-') {
        result = op === '+'
          ? a + (a * b / 100)
          : a - (a * b / 100)
      }

      if (op === '*') {
        result = a * (b / 100)
      }

      if (op === '/') {
        result = a / (b / 100)
      }

      this.states.displayValue = String(result)
      this.states.state = true
    }

    else if (input === 'AC') {
      this.states.displayValue = '0'
      this.states.state = false
    }

    else if (!isNaN(Number(lastChar)) && input === '=') {
      this.states.displayValue = String(eval(this.states.displayValue))
      this.states.state = true
    }

    else if (['+', '-', '*', '/'].includes(lastChar) && input === '=') {
      this.states.displayValue = String(eval(this.states.displayValue.slice(0, lastCharNumber)))
      this.states.state = true
    }

    else if (!isNaN(Number(input)) && Number(this.states.displayValue) === 0 && lastChar !== '.') {
      this.states.displayValue = input
    }

  }

  render(){
    this.displayElement.textContent = this.states.displayValue
  }


}

new calculator()