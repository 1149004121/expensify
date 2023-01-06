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
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.state("selected")).toBe(true);
});

test('should confirm removeExpense', () => {
  wrapper.find('ConfirmModal').prop('deleteItem')();
  expect(wrapper.state("selected")).toBe(undefined);
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should confirm reserveExpense', () => {
  wrapper.find('ConfirmModal').prop('reserveItem')();
  expect(wrapper.state("selected")).toBe(undefined);
});
