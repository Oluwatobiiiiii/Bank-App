"use strict";

// //BANKIST APP

// Data
const account1 = {
  owner: "Treasure Odetokun",
  movements: [200000, 450, -400, 3000, -650, -130, 7000000, 13000000],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-07-21T21:31:17.178Z",
    "2023-07-23T07:42:02.383Z",
    "2023-07-22T09:15:04.904Z",
    "2023-07-21T10:17:24.185Z",
    "2023-07-28T14:11:59.604Z",
    "2023-07-17T17:01:17.194Z",
    "2023-07-19T23:36:17.929Z",
    "2023-07-26T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Joshua Opaleke",
  movements: [50000000, 340000, -150, -790, 3210, 100000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-gb",
};

const account3 = {
  owner: "Motunrayo Ademoye",
  movements: [20000000, -200, 3400000, -300, -20, 5000000, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-06-28T14:11:59.604Z",
    "2023-07-17T17:01:17.194Z",
    "2023-07-19T23:36:17.929Z",
    "2023-07-26T10:51:36.790Z",
  ],

  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "David Adisa",
  movements: [4300000, 1000000, -700, 5000000, -900],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-06-28T14:11:59.604Z",
    "2023-07-17T17:01:17.194Z",
    "2023-07-19T23:36:17.929Z",
    "2023-07-26T10:51:36.790Z",
  ],

  currency: "EUR",
  locale: "en-gb",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//functions

//dates
const formatMovementDate = function (date, locale) {
  const calcdaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcdaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//SHOWINF THE TRANSACTIONS
const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  //sorter in the transactions
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const fromattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}
        deposit</div>
         <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${fromattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//ACCOUNT MOVEMENTS
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//the total
const calcDisplayBalance = function (acc) {
  //the total incomes
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  //the total withdrawals
  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(withdrawals),
    acc.locale,
    acc.currency
  );

  //the total intrest
  const intrest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(intrest, acc.locale, acc.currency);
};

//usernames
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserName(accounts);

//display movements

const updateUI = function (acc) {
  displayMovement(acc);

  //display balance
  calcDisplayBalance(acc);

  //display sumarry
  calcPrintBalance(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call,print the reamaning time to ui
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 seconds,stop timer and log-out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    //decrease 1s
    time--;
  };

  //setting the timw to 5 minnutes
  let time = 600;
  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

/*EVENT HANDLERS */

//FOR LOGIN

let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  //prevent form submission
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //current date
    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//TRANSFER MONEY

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    //DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());

    //update ui
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//LOAN AMOUNT
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //add the movemt
      currentAccount.movements.push(amount);

      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //UPDATE THE UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = startLogOutTimer();

      inputLoanAmount.value = "";
    }, 2500);
  }
});

//CLOSE ACCOUNT

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    //delete accounts
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

//sorting
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});
