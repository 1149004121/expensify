import React from "react"
import { Link } from "react-router-dom"
import numeral from "numeral"
import moment from "moment"

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <Link to={`/edit/${id}`} className="list-item">
    <div>
      <h3 className="list-item__title">{description}</h3>
      <p className="list-item__date">{moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
    <h3 className="list-item__amount">{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
)


export default ExpenseListItem

