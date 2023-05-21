// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their winning
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 1,
  B: 1,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const spin = () => {
  const symbols = [];

  let i = 0;
  for (let [key, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) symbols.push(key);
  }
  //console.log(symbols);S

  const mat = [[], [], []];

  for (let i = 0; i < ROWS; i++) {
    const tempSymbols = [...symbols];
    for (let J = 0; J < COLS; J++) {
      let rand = Math.floor(Math.random() * tempSymbols.length);
      mat[i].push(tempSymbols[rand]);
      tempSymbols.splice(rand, 1);
    }
  }

  return mat;
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const number = Number.parseFloat(depositAmount);
    if (isNaN(number) || number <= 0) {
      console.log("this is an invalid amount, plese enter correct amount ");
    } else return number;
  }
};

const getNumberOLines = () => {
  while (true) {
    const lines = prompt("Enter no of lines to bet on (1-3) ");
    const noOfLines = Number.parseFloat(lines);
    if (isNaN(noOfLines) || noOfLines <= 0 || noOfLines > 3) {
      console.log(
        "this is an invalid amount of lines, plese enter correct amount of lines"
      );
    } else return noOfLines;
  }
};

const getBet = (balance, line) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const noOfBet = Number.parseFloat(bet);
    if (isNaN(noOfBet) || noOfBet <= 0 || noOfBet > balance / line) {
      console.log("Invalid bet, please try again");
    } else return noOfBet;
  }
};

const transpose = (mat) => {
  const tmat = [];
  for (let i = 0; i < COLS; i++) {
    tmat.push([]);
    for (let j = 0; j < ROWS; j++) {
      tmat[i].push(mat[j][i]);
    }
  }

  return tmat;
};

// print function

print = (transmat) => {
  for (let row of transmat) {
    let rowString = "";
    for (let i = 0; i < row.length; i++) {
      rowString += row[i];
      if (row.length - 1 != i) rowString += " | ";
    }
    console.log(rowString);
  }
};

check = (transmat, noOfLines, noOfBet) => {
  let earnings = 0;
  for (let i = 0; i < noOfLines; i++) {
    flag = true;

    for (let j = 0; j < ROWS; j++) {
      if (j == 0) {
        x = transmat[i][j];
      } else {
        if (x != transmat[i][j]) {
          flag = false;
          break;
        }
      }
    }

    console.log(flag);
    if (flag == true) {
      let symbVal = SYMBOLS_VALUE[transmat[i][0]];
      earnings += symbVal * bet;
    }
  }

  return earnings;
};

// function calls
let balance = deposit();

let numberOfLines = getNumberOLines();
const bet = getBet(balance, numberOfLines);

let mat = spin();

let transmat = transpose(mat);

print(transmat);

let earningstatus = check(transmat, numberOfLines, bet);
console.log(earningstatus);
