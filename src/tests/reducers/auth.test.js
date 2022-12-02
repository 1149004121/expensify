import authReducers from "../../reducers/auth"

test('should set default state', () => {
  const state = authReducers(undefined, { type: "@@INTI" });
  expect(state).toEqual({})
});

test('should login by id', () => {
  const action = {
    type: "LOGIN",
    uid: "123"
  };
  const state = authReducers({}, action);
  expect(state).toEqual({
    uid: "123"
  })
});

test('should logout', () => {
  const action = {
    type: "LOGOUT",
  };
  const state = authReducers({ uid: 'anything' }, action);
  expect(state).toEqual({})
});