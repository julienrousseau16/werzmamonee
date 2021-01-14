import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import ExpensesModal from './ExpensesModal'
import PositionModal from './PositionModal'

import './Table.css'

const Table = () => {

  const [admin, setAdmin] = useState({ id: null, name: '', current_position: 0.00 })
  const [expenses, setExpenses] = useState([])
  const [expSelected, setExpSelected] = useState()
  const [modals, setModals] = useState({ position: false, expenses: false })
  const [total, setTotal] = useState(0)

  const addNewExpense = async () => {
    const formData = { name: 'Nouvelle dépense', amount: 0.00, paid: 0 }
    const results = await axios.post('/expenses', formData)
    const tmp = [...expenses]
    tmp.push(results.data[0])
    setExpenses(tmp)
  }

  const fetchExpense = async e => {
    const id = e.target.id
    const results = await axios.get(`/expenses?id=${id}`)
    setExpSelected(results.data[0])
    setModals(prevValues => ({ ...prevValues, expenses: true }))
  }

  const fetchExpenses = async () => {
    const results = await axios.get('/expenses')
    setExpenses(results.data)
  }

  const fetchAdmin = async () => {
    const results = await axios.get('/admin')
    setAdmin(results.data)
  }

  useEffect(() => {
    const tmp = [...expenses]
    const array = tmp.filter(item => item.paid === 0).map(item => item.amount)
    if (array.length === 0) {
      setTotal(0)
    }
    else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const unpaid = array.reduce(reducer)
      setTotal(unpaid)
    }
  }, [expenses])

  useEffect(() => {
    fetchExpenses()
    fetchAdmin()
  }, [])

  return (
    <div className='TableContainer'>
      <div className='UserData'>
        <legend>Position actuelle du compte :</legend>
        <div className='PositionAction'>
          <p>{admin.current_position}</p>
          <button onClick={() => setModals(prevValues => ({ ...prevValues, position: true }))}>ACTUALISER</button>
        </div>
      </div>

      <table className='Table'>
        <thead>
          <tr>
            <th>Dépense</th>
            <th>Coût</th>
            <th>Payé</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) =>
            <tr key={expense.id} className={index % 2 === 0 ? 'Even' : 'Odd'}>
              <th>{expense.name}</th>
              <th>{expense.amount}</th>
              <th className='Status'>{expense.paid ?
                <FontAwesomeIcon icon={faCheckCircle} className='Yes' />
                : <FontAwesomeIcon icon={faTimesCircle} className='No' />}</th>
              <th className='ModifyCell'>
                <button id={expense.id} onClick={fetchExpense}>&#9881;</button>
                </th>
            </tr>)}
        </tbody>
      </table>
      <div className='NewExpense'>
        <button onClick={addNewExpense}>
          <FontAwesomeIcon icon={faPlusCircle} className='icon' />
          Nouvelle dépense</button>
      </div>
      <div className='TotalSection'>
        <legend>Fonds réellement disponibles :</legend>
        <p>{admin.current_position - total}</p>
      </div>

      {modals.position && <PositionModal
        setAdmin={setAdmin}
        setModals={setModals} />}

      {modals.expenses && <ExpensesModal
        expenses={expenses}
        setExpenses={setExpenses}
        expSelected={expSelected}
        setModals={setModals} />}

    </div>
  )
}
export default Table
