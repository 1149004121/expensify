import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseShow, expenseHidden, expenseTotal }) => {
  const expenseShowWord = expenseShow === 1 ? 'expense' : 'expenses';
  const expenseHiddenWord = expenseHidden === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expenseTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expenseShow}</span> {expenseShowWord} totalling <span>{formattedExpensesTotal}</span></h1>
        <p><span>{expenseHidden}</span> {expenseHiddenWord} hidden</p>
        <div className="page-header__action">
          <Link to="/create" className="button">Add Expenses</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseShow: visibleExpenses.length,
    expenseHidden: state.expenses.length - visibleExpenses.length,
    expenseTotal: selectExpensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary)