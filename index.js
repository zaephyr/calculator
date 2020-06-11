const calculator = document.getElementById('calculator');
const keys = calculator.querySelectorAll('.key');
const inputArr = [];
const precedenceArr = [];
let test = '';

function getValue(e) {
    const key = e.target;
    const display = document.querySelector('.display');

    const equals = () => {
        if (inputArr.length >= 3) {
            if (Number.isInteger(parseFloat(inputArr[0]))) {
                const eval = operate(inputArr[0], inputArr[1], inputArr[2]);
                display.textContent = parseFloat(eval.toFixed(5));
                inputArr.splice(0, 3);
            } else if (inputArr[0] == '' && typeof parseFloat(inputArr[2]) === 'number') {
                console.log('sup2');
                if (inputArr[1] == '-') {
                    display.textContent = '-' + inputArr[2];
                }
            }
        } else if (display.textContent == '') {
            display.textContent = 0;
            inputArr.splice(0, 3);
        }
        inputArr.splice(0, 3);
    };

    const precedence = () => {
        const result = operate(inputArr[0], inputArr[1], inputArr[2]);
        inputArr.splice(0);
        inputArr.push(precedenceArr[0], precedenceArr[1], result);
        const result2 = operate(inputArr[0], inputArr[1], inputArr[2]);
        display.textContent = result2;
        inputArr.splice(0);
        inputArr.push(result2, key.textContent);
        precedenceArr.splice(0);
    };

    if (key.className.includes('num')) {
        if (test == '' || display.textContent == 'Infinity' || display.textContent == 0) {
            display.textContent = '';
            display.textContent += key.textContent;
            test += key.textContent;
        } else {
            display.textContent += key.textContent;
            test += key.textContent;
        }
    } else if (key.className.includes('operator')) {
        inputArr.push(display.textContent);
        inputArr.push(key.textContent);
        if (precedenceArr.length > 0) {
            precedence();
        } else if (inputArr.length >= 3) {
            if ((key.textContent == '/' || key.textContent == 'x') && (inputArr[1] == '+' || inputArr[1] == '-')) {
                const numWait = inputArr[0];
                const operatorWait = inputArr[1];
                precedenceArr.push(numWait, operatorWait);
                inputArr.splice(0, 2);

                console.log('heyo', precedenceArr, inputArr);
            } else {
                equals();
                inputArr.push(display.textContent);
                inputArr.push(key.textContent);
                console.log('hello');
            }
        }
        test = '';
    } else if (key.className.includes('equals')) {
        inputArr.push(display.textContent);
        if (precedenceArr.length > 0) {
            const result = operate(inputArr[0], inputArr[1], inputArr[2]);
            inputArr.splice(0);
            inputArr.push(precedenceArr[0], precedenceArr[1], result);
            const result2 = operate(inputArr[0], inputArr[1], inputArr[2]);
            display.textContent = result2;
            inputArr.splice(0);
            inputArr.push(result2, key.textContent);
            precedenceArr.splice(0);
            console.log(inputArr, precedenceArr, result, result2);
        } else {
            equals();
        }
    } else if (key.className.includes('clear')) {
        inputArr.splice(0);
        precedenceArr.splice(0);
        display.textContent = '';
        // test = '';
    } else if (key.className.includes('backspace')) {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    } else if (key.className.includes('dot') && !display.textContent.includes('.')) {
        display.textContent += key.textContent;
    }
}

function init() {
    for (let i = 0; i < keys.length; i++) {
        keys[i].addEventListener('click', getValue);
    }
}

const operate = (...arr) => {
    const num1 = parseFloat(arr[0]);
    const num2 = parseFloat(arr[2]);
    const operator = arr[1];

    function add(num1, num2) {
        return num1 + num2;
    }

    function substract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        return num1 / num2;
    }

    if (operator == '+') return add(num1, num2);
    if (operator == '-') return substract(num1, num2);
    if (operator == 'x') return multiply(num1, num2);
    if (operator == '/') return divide(num1, num2);
};
init();
