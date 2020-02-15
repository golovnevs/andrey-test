import React, { useState } from 'react'
import { calculateStreakDiscount, calculateCostWithStreakDiscount } from '../utils/streak'

const Card = ({ wish: { group, id, name, cost, sexualizedCost }, promo, streak, liPoints, onClick }) => {
  const [isSexualized, setIsSexualized] = useState(false)

  const finalCost = isSexualized
    ? calculateCostWithStreakDiscount(sexualizedCost, calculateStreakDiscount(streak))
    : calculateCostWithStreakDiscount(cost, calculateStreakDiscount(streak))

  return (
    <li className={ group }>
      <h4>{ name }</h4>
      <img src={ `/static/icons/${ id }.svg` } alt={ name }/>
      <div className='cost'>
        {
          isSexualized
            ? <div><s>{ calculateCostWithStreakDiscount(cost, calculateStreakDiscount(streak)) }</s><b>{ finalCost }!</b></div>
            : finalCost
        }
      </div>
      { sexualizedCost && <label>
        <input type="checkbox" value={ isSexualized } onChange={ e => setIsSexualized(e.target.checked) }/>
        Сексуализировать? 😏
      </label> }
      <button type='button' onClick={ () => onClick(id, isSexualized) }>Хочу!</button>

      <style jsx>{ `
        li {
          border: 1px solid black;
          list-style-type: none;
          height: 0;
          width: 250px;
          padding-bottom: 250px;
          margin: 8px;
          transition: all .2s ease-in-out;
          font-size: 16px;
          position: relative;
        }
        
        li.food {
            background: #3946ea;
        }
        
        li.recovery {
            background: lightcoral;
        }
        
        li.other {
            background: #a0698a;
        }
        
        li:hover {
          transform: scale(1.1);
        }
        
        h4 {
            font-size: 18px;
            text-align: center;
            padding: 6px 0;
        }
        
        img {
          width: 40%;
          display: block;
          margin: 0 auto;
          text-align: center;
        }
        
        label {
          margin: 0 auto;
          text-align: center;
          display: block;
        }
        
        input {
            margin-right: 3px;
        }
        
        .cost {
            margin: 16px auto 4px;
            text-align: center;
            font-size: 18px;
        }
        
        .cost s {
            opacity: 0.7;
        }
        
        .cost b {
            margin-left: 5px
        }
        
        button {
          border: none;
          margin: 0;
          padding: 0;
          width: auto;
          overflow: visible;
          background: transparent;
          color: inherit;
          font: inherit;
          line-height: normal;
          -webkit-font-smoothing: inherit;
          -webkit-appearance: none;
        }
        
        button {
            width: 100%;
            background: rgb(41, 165, 109);
            cursor: pointer;
            padding: 8px;
            position: absolute;
            font-size: 18px;
            bottom: 0;
            left: 0;
        }
        
        button:hover {
            background: rgb(54, 202, 135);
        }
    ` }</style>
    </li>
  )
}


export default ({ wishes, promo, streak, liPoints, onClick }) => {
  return (
    <>
      <ul>
        { wishes.map(wish => (
          <Card key={ wish.id } wish={ wish } promo={ promo } streak={ streak } liPoints={ liPoints }
                onClick={ onClick }/>
        )) }
      </ul>

      <style jsx>{ `
        ul {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          width: 100%;
          flex-wrap: wrap;
        }
    ` }</style>
    </>
  )
}
