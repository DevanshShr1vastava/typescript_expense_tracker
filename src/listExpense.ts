import { Categories, IExpenseData, getExpenses, logExpense,updateExpense,deleteExpense } from "./expenseTrackApp.js";
import { 
    tableBody,
    addExpenseButton,
    addExpenseAmount,
    addExpenseCategory,
    addExpenseDate,
    addExpenseDescription,
    filterByCategory
 } from "./domElements.js";




document.addEventListener('DOMContentLoaded',()=>{
    const tableData = getExpenses();
    
    const createRow = (expense:IExpenseData):void =>{
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id',String(expense.id));
        tableRow.innerHTML = `
            <td class = 'expenseRowDescription'><span id='expDesc${expense.id}'>${expense.description}</span></td>
            <td class = 'expenseRowAmount'><span id='expAm${expense.id}'>${expense.amount}</span></td>
            <td class = 'expenseRowCategory'><span id='expCat${expense.id}'>${expense.category}</span></td>
            <td class = 'expenseRowDate'><span id='expDate${expense.id}'>${formatDate(expense.date)}</span></td>
            <td>
            <span id='expAction${expense.id}'>
                <button class="btn btn-outline-light btn-sm edit-btn" style="width: 30px; height: 30px; padding: 0; display: inline-flex; justify-content: center; align-items: center;">
                    ✏️
                </button>
                <button class="btn btn-outline-danger btn-sm delete-btn" style="width: 30px; height: 30px; padding: 0; display: inline-flex; justify-content: center; align-items: center;">
                    ❌
                </button>
            </span>
            </td>
        `
    
        const editButton = tableRow.querySelector('.edit-btn');
        editButton?.addEventListener('click',()=>{
            editRow(tableRow, expense);
        })
    
        const deleteButton = tableRow.querySelector('.delete-btn');

        deleteButton?.addEventListener('click',()=>{
            const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
            if (confirmDelete) {
                deleteRow(expense.id, tableRow);
            }
        })
    
        tableBody?.appendChild(tableRow);
    }
    
    const deleteRow =(id:number, tableRow:HTMLTableRowElement):void=>{
        deleteExpense(id);
        tableRow.remove();
    }
        
    const editRow = (tableRow: HTMLTableRowElement, expense: IExpenseData): void => {
        const descriptionCell = tableRow.children[0] as HTMLElement;
        const amountCell = tableRow.children[1] as HTMLElement;
        const categoryCell = tableRow.children[2] as HTMLElement;
        const dateCell = tableRow.children[3] as HTMLElement;
        const actionElement = tableRow.children[4] as HTMLElement;

        const descriptionElement = descriptionCell.querySelector(`#expDesc${expense.id}`)!;
        const amountElement = amountCell.querySelector(`#expAm${expense.id}`)!;
        const categoryElement = categoryCell.querySelector(`#expCat${expense.id}`)!;
        const dateElement = dateCell.querySelector(`#expDate${expense.id}`)!;

        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.classList.add('form-control');
        descriptionInput.value = expense.description;

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.classList.add('form-control');
        amountInput.value = expense.amount.toString();

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('form-control');
        dateInput.value = formatDate(new Date(expense.date));
              
        
        const inputCategoryElement = document.createElement('select');
        inputCategoryElement.classList.add('form-select');

        Object.values(Categories).forEach(category=>{
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            inputCategoryElement.appendChild(option);
        });

        inputCategoryElement.value = expense.category;

        descriptionCell.replaceChild(descriptionInput, descriptionElement);
        amountCell.replaceChild(amountInput, amountElement);
        categoryCell.replaceChild(inputCategoryElement, categoryElement);
        dateCell.replaceChild(dateInput, dateElement);
        
        actionElement.innerHTML = `
        <button class="btn btn-outline-success save-btn" style="width: 30px; height: 30px; padding: 0; display: inline-flex; justify-content: center; align-items: center;">💾</button>
        <button class="btn btn-outline-danger btn-sm delete-btn" style="width: 30px; height: 30px; padding: 0; display: inline-flex; justify-content: center; align-items: center;">❌</button>
        `;
        
        (actionElement.querySelector('.save-btn') as HTMLElement).addEventListener('click',(e)=>{
            console.log(inputCategoryElement.value);
            console.log(dateInput.value);
            console.log(amountInput.value);
            console.log(descriptionInput.value);

            const updatedExpenseData:IExpenseData = {
                id:expense.id,
                amount: Number(amountInput.value),
                category: Categories[inputCategoryElement.value as keyof typeof Categories],
                date: new Date(dateInput.value),
                description: descriptionInput.value,
            }
            updateExpense(updatedExpenseData);
            populateTable(getExpenses());
            });
    };
    
    const populateTable = (tableData : IExpenseData[]):void=> {
        if(tableBody) tableBody.innerHTML = '';
        tableData.forEach((data)=>{
            createRow(data);
        })
    };
    populateTable(tableData);

    addExpenseButton?.addEventListener('click',()=>{
        const getNewID = getExpenses().length+1;
        const expenseFormData:IExpenseData = {
            id: getNewID,
            amount:Number(addExpenseAmount?.value),
            category:Categories[addExpenseCategory?.value as keyof typeof Categories],
            date:new Date(addExpenseDate?.value),
            description:addExpenseDescription?.value
        }
        addExpenseAmount.value = '';
        addExpenseCategory.value = '';
        addExpenseDate.value='';
        addExpenseDescription.value='';

        logExpense(expenseFormData);
        createRow(expenseFormData);
    })

    filterByCategory?.addEventListener('click',(e:Event)=>{
        e.preventDefault();
        if((e.target as HTMLElement).classList.contains('dropdown-item')){
            
            const selectedCategory = (e.target as HTMLElement).textContent;
            if(selectedCategory === 'All'){
                populateTable(getExpenses());
            }
            else{
                const filteredData = getExpenses().filter(expense => expense.category === selectedCategory);
                populateTable(filteredData);
            }
        }
    })

})

export const formatDate = (date: any): string => {
    const validDate = date instanceof Date ? date : new Date(date);
    return validDate.toISOString().split('T')[0];
};