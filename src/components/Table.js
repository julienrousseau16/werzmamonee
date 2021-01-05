import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ChangeModal from './ChangeModal'

import './Table.css'

const Table = () => {

  const [admin, setAdmin] = useState({ id: null, name: '', current_position: 0.00 })
  const [changeModal, setChangeModal] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [expSelected, setExpSelected] = useState()
  const [updateId, setUpdateId] = useState()
  const [newValues, setNewValues] = useState({ id: 0, name: '', amount: 0.00, paid: 0 })

  const addNewExpense = async () => {
    const formData = { name: 'Nouvelle dépense', amount: 0.00, paid: 0 }
    const results = await axios.post('http://localhost:4000/expenses', formData)
    const tmp = [...expenses]
    tmp.push(results.data[0])
    setExpenses(tmp)
  }

  const paySwitch = e => {
    const id = e.target.id
    const tmp = [...expenses]
    const index = tmp.findIndex(item => item.id === parseInt(id))
    const invert = () => tmp[index].paid === 0 ? 1 : 0
    tmp[index].paid = invert()
    setExpenses(tmp)
    const formData = { paid: tmp[index].paid }
    axios.put(`http://localhost:4000/expenses/${id}`, formData)
  }

  const openModal = e => {
    const id = e.target.id
    setUpdateId(id)
    setChangeModal(true)
  }

  const fetchExpense = async e => {
    const id = e.target.id
    const results = await axios.get(`http://localhost:4000/expenses?id=${id}`)
    setExpSelected(results.data[0])
    setChangeModal(true)
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
        <p>Position actuelle du compte : {admin.current_position.toFixed(2)}</p>
        <button id='UserPosition' onClick={openModal}>MODIFIER</button>
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
              <th>{expense.amount.toFixed(2)}</th>
              <th
                id={expense.id}
                className={expense.paid ? 'Paid' : 'Unpaid'}
                onClick={paySwitch}>{
                  expense.paid ? 'OK' : 'X'
                }</th>
              <th id={expense.id}
                onClick={fetchExpense}
              >Modif</th>
            </tr>)}
        </tbody>
      </table>
      <div>
        <button onClick={addNewExpense}>Nouvelle dépense</button>
      </div>
      {changeModal && <ChangeModal
        admin={admin}
        expSelected={expSelected}
        setAdmin={setAdmin}
        newValues={newValues}
        setNewValues={setNewValues}
        setChangeModal={setChangeModal}
        updateId={updateId}
        setUpdateId={setUpdateId} />}
    </div>
  )
}
export default Table
