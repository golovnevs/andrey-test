import fs from 'fs'
import { calculateCostWithStreakDiscount, calculateStreak, calculateStreakDiscount } from '../../utils/streak'
import prepareDbData from '../../utils/prepare-db-data'
import formatTs from '../../utils/format-ts'
import sendMessageToTelegram from './send-message-to-telegram'

export default (req, res) => {
  if (req.method !== 'POST') {
    res.sendStatus(405)
  }

  const { id, isSexualized } = req.body

  const db = JSON.parse(fs.readFileSync('./db.json'))
  const desiredWish = db.wishes.find(wish => wish.id === id)

  if (!desiredWish) {
    const error = `Sadly wish ${id} doesn't exist :(`
    sendMessageToTelegram(error)
    return res.status(404).json({ error })
  }

  if (isSexualized && desiredWish.sexualizedCost === undefined) {
    const error = `One could not sexualize ${desiredWish.name} I guess.`
    sendMessageToTelegram(error)
    return res.status(400).json({ error })
  }

  const baseCost = isSexualized ? desiredWish.sexualizedCost : desiredWish.cost

  const cost = calculateCostWithStreakDiscount(baseCost, calculateStreakDiscount(calculateStreak(db.history)))

  if (db.liPoints < cost) {
    const error = 'Sadly you have not enough li-points. Contact your personal certified Andrey+™ assistant for them juicy extra li-points.'
    sendMessageToTelegram(error)
    return res.status(400).json({ error })
  }

  const ts = Date.now()

  db.liPoints -= cost
  db.history.unshift({
    id,
    isSexualized,
    cost,
    ts,
  })

  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2))

  sendMessageToTelegram(`Лиза загадала желание ${desiredWish.name} ${isSexualized ? '(sexualized) ' : ''}${formatTs(ts)}`)

  res.status(201).json(prepareDbData(db));
};
