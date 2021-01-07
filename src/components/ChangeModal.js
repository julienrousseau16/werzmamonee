import React, { useState } from 'react'

import axios from 'axios'

import './ChangeModal.css'

const ChangeModal = ({ setAdmin, setChangeModal, expSelected, expenses, setExpenses, updateId, setUpdateId }) => {

  const [updateValue, setUpdateValue] = useState(0)
  const [newValues, setNewValues] = useState({ id: expSelected.id, name: expSelected.name, amount: expSelected.amount.toFixed(2), paid: expSelected.paid })

  const handlePosition = e => {
    const change = e.target.value
    setUpdateValue(change)
  }

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
    setChangeModal(false)
  }

  const changePosition = async () => {
    const data = { current_position: updateValue }
    await axios.put('http://localhost:4000/admin', data)
      .then(res => {
        const newValue = res.data[0].current_position
        setAdmin(prevValues => ({ ...prevValues, current_position: newValue }))
      })
    closeModal()
  }

  const closeModal = () => {
    setChangeModal(false)
    setUpdateId(null)
  }

  if (updateId === 'UserPosition') {
    return (
      <div className='ChangeModal'>
        <div className='ChangeModalContainer'>
          <label htmlFor='position'>Montant du nouveau solde :</label>
          <input id='position' value={updateValue} onChange={handlePosition} />
        </div>
        <div>
          <button onClick={changePosition}>VALIDER</button>
          <button onClick={closeModal}>ANNULER</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='ChangeModal'>
        <div className='ChangeModalContainer'>
          <form onSubmit={submitExpense}>
            <div className='FormSection'>
              <label htmlFor='name'>Intitulé de la dépense</label>
              <legend>Actuellement : {expSelected.name}</legend>
              <input name='name' type='text' value={newValues.name} onChange={handleChange} />
            </div>
            <div className='FormSection'>
              <label htmlFor='amount'>Montant attendu</label>
              <legend>Actuellement : {expSelected.amount}</legend>
              <input name='amount' type='number' value={newValues.amount} onChange={handleChange} />
            </div>
            <div className='FormSection'>
              <p>Montant débité sur le compte</p>
              <legend>Actuellement : {expSelected.paid ? 'Oui' : 'Non'}</legend>
              <div className='PaidAction'>
                <div>
                  <input type='radio' name='paid' value={1} onChange={handleChange} />
                  <label htmlFor={1}>oui</label>
                </div>
                <div>
                  <input type='radio' name='paid' value={0} onChange={handleChange} />
                  <label htmlFor={0}>non</label>
                </div>
              </div>
            </div>
            <input type='submit' value='Valider' />
          </form>
        </div>
        <div>
          <button onClick={() => setChangeModal(false)}>ANNULER</button>
        </div>
      </div>
    )
  }
}
export default ChangeModal
