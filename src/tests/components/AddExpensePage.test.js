import { AddExpensePage } from "../../components/AddExpensePage";
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

const addExpense = jest.fn();
const history = { push: jest.fn() };
const wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/")
});