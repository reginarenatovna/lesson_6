'use strict';

let startBtn = document.getElementById('start'),
		budgetValue = document.getElementsByClassName('budget-value')[0],
		dayBudget = document.getElementsByClassName('daybudget-value')[0],
		level = document.getElementsByClassName('level-value')[0],
		expenses = document.getElementsByClassName('expenses-value')[0],
		optionalExp = document.getElementsByClassName('optionalexpenses-value')[0],
		income = document.getElementsByClassName('income-value')[0],
		monthSavings = document.getElementsByClassName('monthsavings-value')[0],
		yearSavings = document.getElementsByClassName('yearsavings-value')[0],
		expensesImput = document.getElementsByClassName('expenses-item'),
		appEx = document.getElementsByTagName('button')[0],
		appOp = document.getElementsByTagName('button')[1],
		calc = document.getElementsByTagName('button')[2],
		optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
		pos = document.querySelector('.choose-income'),
		checkBox = document.querySelector('#savings'),
		sum = document.querySelector('.choose-sum'),
		perc = document.querySelector('.choose-percent'),
		year = document.querySelector('.year-value'),
		month =document.querySelector('.month-value'),
		day=document.querySelector('.day-value');

let money, time;

var appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
};

appEx.disabled = true;
appOp.disabled = true;
calc.disabled = true;

startBtn.addEventListener('click', function(){
		money = +prompt("Ваш бюджет на месяц?");
		time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
		while (isNaN(money) || money == "" || money == null) {
			money = +prompt("Ваш бюджет на месяц?");
		}
		appData.budget = money;
		appData.timeData = time;
		budgetValue.textContent = money.toFixed();
		year.value = new Date(Date.parse(time)).getFullYear();
		month.value = new Date(Date.parse(time)).getMonth()+1;
		day.value = new Date(Date.parse(time)).getDay();
		appEx.disabled = false;
		appOp.disabled = false;
		calc.disabled = false;
});

appEx.addEventListener('click', function(){
	let sum = 0;
	for (let i = 0; i < expensesImput.length; i++) {
		let expensesItem = expensesImput[i].value;
		let expensesCost = expensesImput[++i].value;
		if ((typeof (expensesItem)) === 'string' && expensesItem != '' && expensesCost != '' &&
			expensesItem.length < 50 && expensesItem !== null && expensesCost !== null) {
			appData.expenses[expensesItem] = expensesCost;
			sum += +expensesCost;
			appData.moneyPerDay = ((appData.budget -sum ) / 30).toFixed();
		} else {
			while (expensesItem !== null && expensesCost !== null && expensesItem != '' && expensesCost != '') {
				expensesItem = prompt("Введите обязательную статью расходов в этом месяце");
				expensesCost = prompt("Во сколько обойдется?");
			}
		}
	}
	expenses.textContent = sum;
});

appOp.addEventListener('click', function(){
	optionalExp.textContent = '';
	optionalExpensesItem.forEach(function(elem, key){
		let optional = optionalExpensesItem[key].value;
		appData.optionalExpenses[key] = optional;
		optionalExp.textContent += appData.optionalExpenses[key] + ' ';
	})
});

calc.addEventListener('click', function(){
	if (appData.budget != undefined) {
		dayBudget.textContent = appData.moneyPerDay;
		if (appData.moneyPerDay < 1000) {
			level.textContent="Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 1000 && appData.moneyPerDay < 3000) {
			level.textContent="Средний уровень достатка";
		} else if (appData.moneyPerDay > 3000) {
			level.textContent="Высокий уровень достатка";
		} else {
			level.textContent="Произошла ошибка";
		}
	} else {
		dayBudget.textContent = "произошла ошибка";
	}
});

pos.addEventListener('input', function(){
	var items = pos.value;
	appData.income = items.split(',');
	income.textContent = appData.income;
});

checkBox.addEventListener('click', function(){
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sum.addEventListener('input', function() {
	if (appData.savings == true) {
		let summa = +sum.value,
				percent = +perc.value;
	appData.monthIncome = summa / 100 / 12 * percent;
	appData.yearIncome = summa / 100 * percent;

	monthSavings.textContent = appData.monthIncome.toFixed(1);
	yearSavings.textContent = appData.yearIncome.toFixed(1);
	}
});

perc.addEventListener('input', function () {
	if (appData.savings == true) {
		let summa = +sum.value,
			percent = +perc.value;
		appData.monthIncome = summa / 100 / 12 * percent;
		appData.yearIncome = summa / 100 * percent;

		monthSavings.textContent = appData.monthIncome.toFixed(1);
		yearSavings.textContent = appData.yearIncome.toFixed(1);
	}
});

