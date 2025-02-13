export enum Categories{
    Food='Food',
    Travel='Travel',
    Bills='Bills',
    Shopping='Shopping',
}

export interface IExpenseData{
    id:number;
    amount :number;
    category : Categories;
    date : Date;
    description: string;
}

export const storeExpenses = (data : IExpenseData[]):void=>{
    localStorage.setItem('expenseData',JSON.stringify([data]));
}

export const getExpenses = ():IExpenseData[]=>{
    const data = localStorage.getItem('expenseData');
    return data ? JSON.parse(data) : [];
}

export const logExpense = (expense:IExpenseData):void=>{
    const totalExpense = getExpenses();
    totalExpense.push(expense);
    storeExpenses(totalExpense);
}

export const deleteExpense = (expenseID:number):void=>{
    const modifiedExpenses = getExpenses().filter(expense=>expense.id!==expenseID);
    storeExpenses(modifiedExpenses);
}

export const updateExpense = (updatedExpense:IExpenseData):void=>{
    const modifiedExpenses = getExpenses().map(expense=>{
        return expense.id === updatedExpense.id ? updatedExpense : expense
    });
    storeExpenses(modifiedExpenses);
}

export const filterExpense=<T extends keyof IExpenseData>(filterConditionType : T,filterByValue : IExpenseData[T]):IExpenseData[]=>{
    const filteredData = getExpenses().filter((expense)=>expense[filterConditionType] === filterByValue);
    return filteredData;
}
