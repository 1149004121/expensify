import { addExpense, startAddExpense, removeExpense, editExpense } from "../../actions/expenses"
import expenses from "../fixtures/expenses";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: "123" });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: "123"
  })
});

test('should setup edit expense action object', () => {
  const action = editExpense("123", { note: "new note value" });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: "123",
    updates: {
      note: "new note value"
    }
  })
});

test('should setup add expense action object with provided values', () => {
  const expenseData = expenses[0];
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenseData
  })
});

test('should add expense to database and store', (done) => {
  const initialState = {};
  const store = mockStore(initialState);

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
})

test('should add expense with defaults to database and store', (done) => {
  const initialState = {};
  const store = mockStore(initialState);

  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense(expenseDefaults)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  })
});




