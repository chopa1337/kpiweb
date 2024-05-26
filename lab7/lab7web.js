// Функція для перевірки, чи є аргумент числом, і визначення, чи є це число парним чи непарним
function checkNumber(arg) {
    if (typeof arg === 'number' && !isNaN(arg)) {
        return arg % 2 === 0 ? 'even' : 'odd';
    }
    return 'not a number';
}

// Функція для перевірки, чи є число простим
function isPrime(num) {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Функція для пошуку п'яти простих чисел та повернення їх суми
function sumFirstFivePrimes() {
    const primes = [];
    let num = 1;
    while (primes.length < 5) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    return primes.reduce((sum, prime) => sum + prime, 0);
}

// Функція для обчислення суми ряду чисел з постійно зростаючою кількістю одиниць
function sumOfSeries(n) {
    let seriesSum = 0;
    let currentNumber = 0;
    for (let i = 0; i < n; i++) {
        currentNumber = currentNumber * 10 + 1;
        seriesSum += currentNumber;
    }
    return seriesSum;
}

// Функція для обробки кліків на кнопки
function handleCheckNumber() {
    const input = document.getElementById('numberInput').value;
    const num = parseFloat(input);
    const result = checkNumber(num);
    document.getElementById('checkNumberResult').innerText = result;
}

function handleSumFirstFivePrimes() {
    const result = sumFirstFivePrimes();
    document.getElementById('sumFirstFivePrimesResult').innerText = result;
}

function handleSumOfSeries() {
    const input = document.getElementById('seriesInput').value;
    const num = parseInt(input, 10);
    const result = sumOfSeries(num);
    document.getElementById('sumOfSeriesResult').innerText = result;
}

// Додавання обробників подій до кнопок
document.getElementById('checkNumberButton').addEventListener('click', handleCheckNumber);
document.getElementById('sumFirstFivePrimesButton').addEventListener('click', handleSumFirstFivePrimes);
document.getElementById('sumOfSeriesButton').addEventListener('click', handleSumOfSeries);
