import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ExpensesModal from './ExpensesModal'
import PositionModal from './PositionModal'

import './Table.css'

const Table = () => {

  const [admin, setAdmin] = useState({ id: null, name: '', current_position: 0.00 })
  const [expensesModal, setExpensesModal] = useState(false)
  const [positionModal, setPositionModal] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [expSelected, setExpSelected] = useState()
  const [updateId, setUpdateId] = useState(0)

  const addNewExpense = async () => {
    const formData = { name: 'Nouvelle dépense', amount: 0.00, paid: 0 }
    const results = await axios.post('http://localhost:4000/expenses', formData)
    const tmp = [...expenses]
    tmp.push(results.data[0])
    setExpenses(tmp)
  }

  const fetchExpense = async e => {
    const id = e.target.id
    const results = await axios.get(`http://localhost:4000/expenses?id=${id}`)
    setExpSelected(results.data[0])
    setExpensesModal(true)
  }

  const fetchExpenses = async () => {
    const results = await axios.get('http://localhost:4000/expenses')
    setExpenses(results.data)
  }

  const fetchAdmin = async () => {
    const results = await axios.get('http://localhost:4000/admin')
    setAdmin(results.data)
  }

  useEffect(() => {
    fetchExpenses()
    fetchAdmin()
  }, [])

  return (
    <div className='Table'>
      <h2>Titre table</h2>
      <div className='UserData'>
        <h3>Utilisateur : {admin.name}</h3>
        <p>Position actuelle du compte : {admin.current_position}</p>
        <button id={0} onClick={() => setPositionModal(true)}>MODIFIER</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Intitulé de la Dépense</th>
            <th>Coût</th>
            <th>Payé</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense =>
            <tr key={expense.id}>
              <th>{expense.name}</th>
              <th>{expense.amount}</th>
              <th className={expense.paid ? 'Paid' : 'Unpaid'}>{expense.paid ? 'OK' : 'X'}</th>
              <th id={expense.id}
                onClick={fetchExpense}
              >Modif</th>
            </tr>)}
        </tbody>
      </table>
      <div>
        <button onClick={addNewExpense}>Nouvelle dépense</button>
      </div>
      {expensesModal && <ExpensesModal
        admin={admin}
        expSelected={expSelected}
        expenses={expenses}
        setExpenses={setExpenses}
        setAdmin={setAdmin}
        setExpensesModal={setExpensesModal}
        updateId={updateId}
        setUpdateId={setUpdateId} />}

      {positionModal && <PositionModal
        admin={admin}
        expSelected={expSelected}
        expenses={expenses}
        setExpenses={setExpenses}
        setAdmin={setAdmin}
        setPositionModal={setPositionModal}
        updateId={updateId}
        setUpdateId={setUpdateId} />}
    </div>
  )
}
export default Table
