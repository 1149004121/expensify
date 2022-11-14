import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startRemoveExpense, startEditExpense } from "../actions/expenses"

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  }
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button
          onClick={this.onRemove}
        >
          remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id
    })
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
