import { IExpenseData,Categories } from "./expenseTrackApp";

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
  ];