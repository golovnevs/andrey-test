import React, { useState } from 'react'
import { useAlert, types } from 'react-alert'
import fetch from 'isomorphic-unfetch'
import Head from '../components/head'
import Cards from '../components/Cards'
import { calculateStreakDiscount } from '../utils/streak'
import pluralize from '../utils/pluralize'


const Home = ({ db }) => {
  const [data, setData] = useState(null)
  const alert = useAlert()

  if (!db) {
    return 'Loading'
  } else if (!data) {
    return setData(db)
  }

  const onCardClick = async (id, isSexualized) => {
    let res
    try {
      res = await fetch('/api/make-a-wish', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      const responseJson = await res.json()
      if (res.status === 201) {
        setData(responseJson)
        alert.show('Желание будет исполнено', {type: types.SUCCESS})
      } else {
        alert.show(responseJson.error, {type: types.ERROR})
      }
    } catch (e) {
      alert.show(e, {type: types.ERROR})
    }
  }

  const streakDiscountText = data.streak > 0 ? `${pluralize(data.streak, 'день', 'дня', 'дней')} – ${calculateStreakDiscount(data.streak) * 100}% скидка!` : ''

  return <div>
    <Head title="Andrey+™ | Wish Granter"/>

    <main>
      <h2>Загадай желание!</h2>
      <h3>Li-points: { data.liPoints }</h3>
      <h3>Стрик: { data.streak } {streakDiscountText}<span title='Загадывай желание каждый день и получай Li-points скидки!'>(Что это?)</span></h3>
      <Cards
        wishes={ data.wishes }
        promo={ data.promo }
        streak={ data.streak }
        onClick={ onCardClick }
      />
    </main>

    <style jsx>{ `
      main {
        width: 100%;
        height: 100%;
      }
      
      h2 {
        margin: 10px 10px 10px 30px;
      }
      
      h3 {
        margin: 10px 10px 10px 30px;
      }
      
      span {
        font-weight: normal;
        opacity: 0.8;
        margin-left: 10px;
        cursor: default;
      }
    ` }</style>
  </div>
}

Home.getInitialProps = async () => {
  const res = await fetch('http://167.71.45.122/api/get-everything')
  return { db: await res.json() }
}

export default Home
