'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 10000],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-04-05T14:11:59.604Z',
    '2024-04-07T17:01:17.194Z',
    '2024-04-09T23:36:17.929Z',
    '2024-04-11T10:51:36.790Z',
    '2024-04-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-04-05T14:11:59.604Z',
    '2024-04-07T17:01:17.194Z',
    '2024-04-09T23:36:17.929Z',
    '2024-04-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-04-05T14:11:59.604Z',
    '2024-04-07T17:01:17.194Z',
    '2024-04-09T23:36:17.929Z',
    '2024-04-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-04-05T14:11:59.604Z',
    '2024-04-07T17:01:17.194Z',
    '2024-04-09T23:36:17.929Z',
    '2024-04-11T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Stanislav Ocunev',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 10000, 20000],
  interestRate: 1.2, // %
  pin: 5555,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-04-05T14:11:59.604Z',
    '2024-04-07T17:01:17.194Z',
    '2024-04-09T23:36:17.929Z',
    '2024-04-11T10:51:36.790Z',
    '2024-04-17T10:51:36.790Z',
    '2024-04-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = '';
  // containerMovements.textContent = '';

  const sortMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortMovements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }deposit</div>
       
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalanse = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(e => e[0])
      .join('');
  });
};

createUsername(accounts);

function updateUI(acc) {
  displayMovements(acc);
  calcDisplayBalanse(acc);
  calcDisplaySummary(acc);
}

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = '';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 300;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount;
let timer;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  console.log('Login');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receverAcc &&
    currentAccount.balance >= amount &&
    receverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//FAKE ALWAYS LOGGED IN///
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
////////////
