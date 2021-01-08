import React, { useState } from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

import './Modal.css'

const PositionModal = ({ setAdmin, setModals }) => {

  const [updateValue, setUpdateValue] = useState(0)

  const handlePosition = e => {
    const change = e.target.value
    setUpdateValue(change)
  }

  const changePosition = async e => {
    e.preventDefault()
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
        <form className='PositionModal'>
          <label htmlFor='position'>Montant du nouveau solde :</label>
          <div>
            <input id='position' type='number' name='current_position' value={updateValue} onChange={handlePosition} />
            <input id='submit' type='submit' onClick={changePosition} value='OK' />
          </div>
        </form>
      </div>
      <div className='BackSection'>
        <button onClick={() => setModals(prevValues => ({ ...prevValues, position: false }))}>
          <FontAwesomeIcon icon={faChevronCircleLeft} className='Back'/>
          Retour</button>
      </div>
    </div>
  )
}
export default PositionModal
