export const tableBody = document.querySelector('#expense-table-body');

export const addExpenseForm = document.getElementById('expenseForm') as HTMLInputElement;
export const addExpenseAmount = document.querySelector('#expenseAmount') as HTMLInputElement;
export const addExpenseCategory = document.querySelector('#expenseCategory') as HTMLInputElement;
export const addExpenseDate = document.querySelector('#expense-date') as HTMLInputElement;
export const addExpenseDescription = document.querySelector('#expenseDescription') as HTMLInputElement;

const modalElement = document.querySelector('#staticBackdrop') as HTMLElement;
export const addExpenseButton = document.querySelector('#add-expense-button');
export const filterByCategory = document.getElementById("category-selector");
export const recentExpenseTable = document.getElementById('recent-expense-table-body');
