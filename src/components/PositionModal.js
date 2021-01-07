import React, { useState } from 'react'
import axios from 'axios'

import './Modal.css'

const PositionModal = ({ setAdmin, setModals }) => {

  const [updateValue, setUpdateValue] = useState(0)

  const handlePosition = e => {
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
    setModals(prevValues => ({ ...prevValues, position: false }))
  }

  return (
    <div className='Modal'>
      <div className='ModalContainer'>
        <label htmlFor='position'>Montant du nouveau solde :</label>
        <input id='position' value={updateValue} onChange={handlePosition} />
      </div>
      <div>
        <button onClick={changePosition}>VALIDER</button>
        <button onClick={() => setModals(prevValues => ({ ...prevValues, position: false }))}>ANNULER</button>
      </div>
    </div>
  )
}
export default PositionModal
