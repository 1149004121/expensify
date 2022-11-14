import { EditExpensePage } from "../../components/EditExpensePage";
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startRemoveExpense = jest.fn();
  startEditExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage
    startRemoveExpense={startRemoveExpense}
    startEditExpense={startEditExpense}
    history={history}
    expense={expenses[2]}
  />);
})

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
});