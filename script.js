//operation functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
//operate function
function operate(operator, a, b) {
  if (operator === '+') {
    return add(a, b);
  }
  else if (operator === '-') {
    return subtract(a, b);
  }
  else if (operator === 'x') {
    return multiply(a, b);
  }
  else if (operator === '/') {
    return divide(a, b);
  }
  else {
    return "invalid";
  }
}
//elements
const numbers = document.querySelectorAll('.number');
const plusMinus = document.querySelector('#plus-minus');
const percentage = document.querySelector('#percentage');
const divideButton = document.querySelector('#divide');
const multiplyButton = document.querySelector('#multiply');
const minusButton = document.querySelector('#minus');
const plusButton = document.querySelector('#plus');
const equalButton = document.querySelector('#equal');
const display = document.querySelector('#display');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');

//variables
let firstOperand = null;
let secondOperand = null;
let currentOperatorText = null;
let currentOperator = null;
let isNewOperand = true;
let count = 0;
let isResult = false;


function calculateResult() {
  let result = operate(currentOperatorText, firstOperand, secondOperand);
  result = +result.toFixed(8);
  firstOperand = result;
  isResult = true;
  secondOperand = null;
  display.textContent = '' + result;
}

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (currentOperator !== null) {
      currentOperator.style.backgroundColor = '#fe9f06';
      currentOperator.style.color = '#ffffff';
    }
    currentOperator = operator;
    currentOperator.style.backgroundColor = '#ffffff';
    currentOperator.style.color = '#fe9f06';
    isResult = false;
    count++;
    if (count > 1) {
      currentOperatorText = operator.textContent;
      isNewOperand = true;
      return;
    }
    if (firstOperand === null) {
      firstOperand = +display.textContent;
    }
    else {
      secondOperand = +display.textContent;
    }

    if (firstOperand !== null && secondOperand !== null) {
      calculateResult();
    }
    currentOperatorText = operator.textContent;
    isNewOperand = true;
  })
  //change style
  operator.addEventListener('mousedown', () => {
    operator.style.backgroundColor = '#fcc78d';
  })

})
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (currentOperator !== null) {
      currentOperator.style.backgroundColor = '#fe9f06';
      currentOperator.style.color = '#ffffff';
    }
    count = 0;
    if (isNewOperand) {
      display.textContent = '';
      isNewOperand = false;
    }
    //disable miltiple zero's if the first number is zero
    if (number.textContent === '0') {
      if (display.textContent == '0') {
        display.textContent = '0';
        return;
      }
    }
    //disable using dot if there is alreade one
    if (number.textContent === '.') {
      if (display.textContent.includes('.')) {
        return;
      }
    }
    display.textContent += number.textContent;
  })
  //style number
  number.addEventListener('mousedown', () => {
    number.style.backgroundColor = '#737373';
  })
  number.addEventListener('mouseup', () => {
    number.style.backgroundColor = '#333333';
  })
})

//change color for AC, +/-, and %
function changeColor(e) {
  e.target.style.backgroundColor = '#d9d9d9';
}
function changeColorBack(e) {
  e.target.style.backgroundColor = '#A5A5A5';
}

equalButton.addEventListener('click', () => {
  count++;
  if (count > 1) {
    return;
  }
  if (firstOperand !== null) {
    secondOperand = +display.textContent;
    calculateResult();
  }
})
equalButton.addEventListener('mousedown', () => {
  equalButton.style.backgroundColor = '#fcc78d';
})

equalButton.addEventListener('mouseup', () => {
  equalButton.style.backgroundColor = '#fe9f06';
})

clearButton.addEventListener('click', () => {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperatorText = null;
  currentOperator = null;
  isNewOperand = true;
  isResult = false;
  count = 0;
})
clearButton.addEventListener('mousedown', changeColor);
clearButton.addEventListener('mouseup', changeColorBack);


plusMinus.addEventListener('click', () => {
  let displayNumber = +display.textContent;
  displayNumber *= -1;
  display.textContent = '' + displayNumber;
  if (isResult) {
    firstOperand *= -1;
  }
})
plusMinus.addEventListener('mousedown', changeColor);
plusMinus.addEventListener('mouseup', changeColorBack);


percentage.addEventListener('click', () => {
  let displayNumber = +display.textContent;
  displayNumber /= 100;
  display.textContent = '' + displayNumber;
  if (isResult) {
    firstOperand /= 100;
  }
})
percentage.addEventListener('mousedown', changeColor);
percentage.addEventListener('mouseup', changeColorBack);


