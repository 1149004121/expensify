import React from 'react';
import ExpenseForm from './ExpenseForm';
import ConfirmModal from './ConfirmModal';
import { connect } from 'react-redux';
import { startRemoveExpense, startEditExpense } from "../actions/expenses"

export class EditExpensePage extends React.Component {
  state = {
    selected: undefined
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  }
  onClickRemove = () => {
    this.setState({ selected: true })
  }
  onConfirmRemove = () => {
    this.setState({ selected: undefined })
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }
  onConfirmReserve = () => {
    this.setState({ selected: undefined })
  }
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Edit Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button
            onClick={this.onClickRemove}
            className="button button--secondary"
          >
            Remove Expense
          </button>
        </div>
        <ConfirmModal option={this.state.selected} deleteItem={this.onConfirmRemove} reserveItem={this.onConfirmReserve}></ConfirmModal>
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
