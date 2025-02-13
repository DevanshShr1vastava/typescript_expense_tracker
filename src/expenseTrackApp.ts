

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

const sampleExpenses: IExpenseData[] = [
    {
      id:1,
      amount: 250,
      category: Categories.Food,
      date: new Date('2025-02-10'),
      description: 'Groceries from Walmart',
    },
    {
        id:2,
      amount: 100,
      category: Categories.Travel,
      date: new Date('2025-02-05'),
      description: 'Taxi fare to airport',
    },
    {
        id:3,
      amount: 150,
      category: Categories.Bills,
      date: new Date('2025-01-30'),
      description: 'Electricity bill payment',
    },
    {
        id:4,
      amount: 300,
      category: Categories.Shopping,
      date: new Date('2025-01-25'),
      description: 'New shoes from Nike',
    },
    {
        id:5,
      amount: 50,
      category: Categories.Food,
      date: new Date('2025-02-01'),
      description: 'Dinner at a local restaurant',
    },
    { id: 6, amount: 120, category: Categories.Travel, date: new Date('2025-02-12'), description: 'Bus fare for commute' },
    { id: 7, amount: 400, category: Categories.Bills, date: new Date('2025-01-28'), description: 'Water bill payment' },
    { id: 8, amount: 250, category: Categories.Shopping, date: new Date('2025-02-03'), description: 'Clothing from H&M' },
    { id: 9, amount: 60, category: Categories.Food, date: new Date('2025-02-07'), description: 'Lunch at Subway' },
    { id: 10, amount: 75, category: Categories.Travel, date: new Date('2025-02-14'), description: 'Uber ride home' },
    { id: 11, amount: 200, category: Categories.Bills, date: new Date('2025-01-20'), description: 'Internet bill payment' },
    { id: 12, amount: 180, category: Categories.Shopping, date: new Date('2025-01-15'), description: 'Accessories from Zara' },
    { id: 13, amount: 90, category: Categories.Food, date: new Date('2025-02-09'), description: 'Snacks from 7-Eleven' },
    { id: 14, amount: 220, category: Categories.Travel, date: new Date('2025-02-06'), description: 'Flight ticket booking' },
    { id: 15, amount: 300, category: Categories.Bills, date: new Date('2025-01-18'), description: 'Gas bill payment' }
  ];

export const storeExpenses = (data : IExpenseData[]):void=>{
    localStorage.setItem('expenseData',JSON.stringify(data));
    // console.log("Data added successfully!");
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

export const fillSampleData=():void=>{
    storeExpenses(sampleExpenses);
}

export const calculateCategoryTotals = (expenses: IExpenseData[]): Record<string, number> => {
    return expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);
};

export const latestExpenses = (expenses:IExpenseData[]):IExpenseData[]=>{
    return expenses.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,5);
}