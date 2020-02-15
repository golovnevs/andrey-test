import { calculateStreak } from './streak'

export default db => {
  const streak = calculateStreak(db.history)
  return {
    ...db,
    streak,
  }
}
