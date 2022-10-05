import filtersReducer from "../../reducers/filters"
import moment from "moment"

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  })
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  })
});

test('should set sortBy to date', () => {
  let prevState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };
  const state = filtersReducer(prevState, { type: 'SORT_BY_DATE' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  })
});

test('should set text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'This is my filter'
  };
  const state = filtersReducer(undefined, action);
  expect(state).toEqual({
    text: 'This is my filter',
    sortBy: 'date',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  })
});

test('should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate,
    endDate: moment().endOf("month")
  })
});

test('should set endDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf("month"),
    endDate
  })
});
