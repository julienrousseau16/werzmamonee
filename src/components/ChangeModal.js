import React, { useState } from 'react'

import axios from 'axios'

import './ChangeModal.css'

const ChangeModal = ({ setAdmin, setChangeModal, expSelected, newValues, setNewValues, updateId, setUpdateId }) => {

  const [updateValue, setUpdateValue] = useState(0)

  const handleChange = e => {
    const change = e.target.value
    setUpdateValue(change)
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
          <input id='position' value={updateValue} onChange={handleChange} />
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
          <p>modal des dépenses</p>
          <p>{expSelected.id}</p>
          <p>{expSelected.name}</p>
          <p>{expSelected.amount}</p>
          <p>{expSelected.paid}</p>
        </div>
        <div>
          <button onClick={() => console.log(updateId)}>VALIDER</button>
          <button onClick={() => setChangeModal(false)}>ANNULER</button>
        </div>
      </div>
    )
  }
}
export default ChangeModal
