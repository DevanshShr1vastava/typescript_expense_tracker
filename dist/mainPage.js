import { getExpenses, calculateCategoryTotals, latestExpenses } from "./expenseTrackApp.js";
import { recentExpenseTable } from "./domElements.js";
import { formatDate } from "./listExpense.js";
const createRecentRows = (expenseData) => {
    expenseData.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${formatDate(expense.date)}</td>
        `;
        recentExpenseTable === null || recentExpenseTable === void 0 ? void 0 : recentExpenseTable.appendChild(row);
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const recentExpenses = latestExpenses(getExpenses());
    createRecentRows(recentExpenses);
    const categoryTotals = calculateCategoryTotals(getExpenses());
    const categoryLabels = Object.keys(categoryTotals);
    const categoryValues = Object.values(categoryTotals);
    const ctx = document.getElementById("categoryTotal");
    const barColors = ["#00bcd4", "#8bc34a", "#ffeb3b", "#e91e63", "#ff9800"];
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryLabels,
            datasets: [{
                    label: 'Total Expenses by Category',
                    data: categoryValues,
                    backgroundColor: barColors,
                    borderColor: 'black',
                    fill: false,
                    tension: 0.1
                }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
});
