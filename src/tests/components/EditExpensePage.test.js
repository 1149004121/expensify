import { EditExpensePage } from "../../components/EditExpensePage";
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

const removeExpense = jest.fn();
const editExpense = jest.fn();
const history = { push: jest.fn() };
const wrapper = shallow(<EditExpensePage
  removeExpense={removeExpense}
  editExpense={editExpense}
  history={history}
  expense={expenses[2]}
/>);

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
});