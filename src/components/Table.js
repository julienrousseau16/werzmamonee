import axios from 'axios'
import React, { useState, useEffect } from 'react'

import ChangeModal from './ChangeModal'

import './Table.css'

const Table = () => {

  const [admin, setAdmin] = useState({})
  const [changeModal, setChangeModal] = useState(false)
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    const results = await axios.get('http://localhost:4000/expense')
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
        <button onClick={() => setChangeModal(true)}>MODIFIER</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Intitulé de la Dépense</th>
            <th>Coût</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(expense =>
              <tr key={expense.id}>
                <th>{expense.name}</th>
                <th>{expense.amount}</th>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <th>Total des dépenses attendues</th>
            <th>xxxxxxxxxxx</th>
          </tr>
          <tr>
            <th>Total des réponses réglées</th>
            <th>xxxxxxxxxxxxxxxx</th>
          </tr>
          <tr>
            <th>Position actuelle du compte</th>
            <th>xxxxxxxxxxx</th>
          </tr>
          <tr>
            <th>Liquidités disponibles</th>
            <th>xxxxxxxxxxxxxx</th>
          </tr>
        </tfoot>
      </table>
      {changeModal && <ChangeModal admin={admin} setAdmin={setAdmin} setChangeModal={setChangeModal} />}
    </div>
  )
}
export default Table
