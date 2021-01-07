import React, { useState } from 'react'

import axios from 'axios'

import './Modal.css'

const ExpensesModal = ({ setExpensesModal, expSelected, expenses, setExpenses }) => {

  const [newValues, setNewValues] = useState({ id: expSelected.id, name: expSelected.name, amount: expSelected.amount, paid: expSelected.paid })

  const handleChange = e => {
    let value = e.target.value
    if (value === '0' || value === '1') {
      value = parseInt(value)
    }
    const name = e.target.name
    setNewValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const submitExpense = async e => {
    e.preventDefault()
    const formData = newValues
    const id = formData.id
    await axios.put(`http://localhost:4000/expenses/${id}`, formData)
    const tmp = [...expenses]
    const index = tmp.findIndex(expense => expense.id === id)
    tmp[index] = newValues
    setExpenses(tmp)
    setExpensesModal(false)
  }

  const closeModal = () => {
    setExpensesModal(false)
  }

  return (
    <div className='Modal'>
      <div className='ModalContainer'>
        <form onSubmit={submitExpense}>
          <div className='FormSection'>
            <label htmlFor='name'>Intitulé de la dépense</label>
            <legend>Anciennement : {expSelected.name}</legend>
            <input name='name' type='text' value={newValues.name} onChange={handleChange} />
          </div>
          <div className='FormSection'>
            <label htmlFor='amount'>Montant attendu</label>
            <legend>Anciennement : {expSelected.amount}</legend>
            <input name='amount' type='number' value={newValues.amount} onChange={handleChange} />
          </div>
          <div className='FormSection'>
            <p>Montant débité sur le compte</p>
            <legend>Anciennement : {expSelected.paid ? 'Oui' : 'Non'}</legend>
            <div className='PaidAction'>
              <div>
                <input id='yes' type='radio' name='paid' value={1} onChange={handleChange} />
                <label htmlFor='yes' className={newValues.paid ? 'Paid' : ''}>oui</label>
              </div>
              <div>
                <input id='no' type='radio' name='paid' value={0} onChange={handleChange} />
                <label htmlFor='no' className={newValues.paid ? '' : 'Unpaid'}>non</label>
              </div>
            </div>
          </div>
          <input id='Validate' type='submit' value='MODIFIER' />
        </form>
        <div className='CancelSection'>
          <p>OU</p>
          <hr />
          <button>Supprimer la dépense</button>
        </div>
      </div>
      <div>
        <button onClick={closeModal}>Retour</button>
      </div>
    </div>
  )
}

export default ExpensesModal
