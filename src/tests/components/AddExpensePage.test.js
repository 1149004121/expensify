import { AddExpensePage } from "../../components/AddExpensePage";
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

const startAddExpense = jest.fn();
const history = { push: jest.fn() };
const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/")
});