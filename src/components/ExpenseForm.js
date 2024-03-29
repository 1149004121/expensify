import React from "react"
import moment from "moment"
import { SingleDatePicker } from "react-dates"


export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    }
  }
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }))
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState({ calendarFocused: focused })
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: "Please provide description and amount." }))
    } else {
      this.setState(() => ({ error: "" }))
      this.props.onSubmit(
        {
          description: this.state.description,
          amount: parseFloat(this.state.amount, 10) * 100,
          note: this.state.note,
          createdAt: this.state.createdAt.valueOf(),
        }
      );
    }
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <p className="form__error">{this.state.error ? this.state.error : ""}</p>
        <input
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          className="input-text"
        />
        <input
          type="text"
          placeholder="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          className="input-text"
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
          className="textarea"
        >
        </textarea>
        <div>
          <button className="button">Add Expense</button>
        </div>
      </form>
    )
  }
}