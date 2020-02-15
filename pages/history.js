import React, { useState } from 'react'
import Head from '../components/head'
import formatTs from '../utils/format-ts';
import fetch from 'isomorphic-unfetch'

const History = ({ db }) => {
  const [data, setData] = useState(null)

  if (!db) {
    return 'Loading'
  } else if (!data) {
    return setData(db)
  }

  return <main>
    <Head title="Andrey+™ | Wishes History" />

    <table>
      <thead>
        <tr>
          <th>Wish 🧞</th>
          <th>Sexualized? 😉</th>
          <th>Li-points 💰</th>
          <th>Date 📅</th>
        </tr>
      </thead>
      <tbody>
        {data.history.map(item => (
          <tr key={`${item.id}-${item.ts}`}>
            <td>{data.wishes.find(wish => wish.id === item.id).name}</td>
            <td>{item.isSexualized ? 'yeeeah' : 'noop'}</td>
            <td>{item.cost}</td>
            <td>{formatTs(item.ts)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <style jsx>{`
      main {
        width: 100%;
      }
      
      table {
        width: 100%;
        font-size: 20px;
      }

      tbody tr:nth-child(odd) {
        background-color: #f5364e38;
      }
      
      tbody tr:nth-child(even) {
        background-color: rgba(0, 36, 88, 0.6);
      }
    `}</style>
  </main>
}

History.getInitialProps = async () => {
  const res = await fetch('http://localhost:80/api/get-everything')
  return { db: await res.json() }
}

export default History
