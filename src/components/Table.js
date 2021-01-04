import axios from 'axios'
import React, { useState, useEffect } from 'react'

import './Table.css'

const Table = () => {

  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    const results = await axios.get('http://localhost:4000/expense')
    setExpenses(results.data)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <div className='Table'>
      <h2>Titre table</h2>
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
    </div>
  )
}
export default Table
