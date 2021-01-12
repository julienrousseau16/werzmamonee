import React, { useState } from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

import './Modal.css'

const ExpensesModal = ({ expenses, setExpenses, expSelected, setModals }) => {

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
    setModals(prevValues => ({ ...prevValues, expenses: false }))
  }

  const deleteExpense = async () => {
    const id = newValues.id
    await axios.delete(`http://localhost:4000/expenses/${id}`)
    const tmp = [...expenses]
    const index = tmp.findIndex(expense => expense.id === id)
    tmp.splice(index, 1)
    setExpenses(tmp)
    setModals(prevValues => ({ ...prevValues, expenses: false }))
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
        <div className='DeleteSection'>
          <p>OU</p>
          <hr />
          <button onClick={deleteExpense}>
            <FontAwesomeIcon id='Trash' icon={faTrashAlt} />
            Supprimer la dépense</button>
        </div>
      </div>
      <div className='BackSection'>
        <button id='Back' onClick={() => setModals(prevValues => ({ ...prevValues, expenses: false }))}>
          <FontAwesomeIcon icon={faChevronCircleLeft} className='Back' id='ExpBack'/>
          Retour</button>
      </div>
    </div>
  )
}

export default ExpensesModal
