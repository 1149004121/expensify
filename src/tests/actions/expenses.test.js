import { addExpense, startAddExpense, removeExpense, startRemoveExpense, editExpense, startEditExpense, setExpenses, startSetExpenses } from "../../actions/expenses"
import expenses from "../fixtures/expenses";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import firebase from "../../firebase/firebase";

const uid = 'testid';
const defaultAuthState = { auth: { uid } }
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

//确保fetch时数据库里有数据，在每个测试用例前都会执行一遍
beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt }
  });
  //done保证数据添加完毕之后再开始测试
  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
})

test('should setup remove expense action object', () => {
  const action = removeExpense("123");
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: "123"
  })
});

test('should remove expense from firebase', (done) => {
  const store = mockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once("value")
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should edit expense from firebase', (done) => {
  const store = mockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return firebase.ref(`users/${uid}/expenses/${id}`).once("value")
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
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
  const store = mockStore(defaultAuthState);

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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = mockStore(defaultAuthState);

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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  })
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = mockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  })
});




