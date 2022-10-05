import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
