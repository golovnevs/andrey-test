export const calculateStreak = history => {
  const ONE_DAY = 24 * 60 * 60 * 1000
  const todayTs = new Date().setHours(0, 0, 0, 0)

  let hasOrderedAnythingToday = false
  let streak = 0
  for (let i = 0; i < history.length; i++) {
    const historyItemDayTs = new Date(history[i].ts).setHours(0, 0, 0, 0)
    const diff = todayTs - historyItemDayTs - ONE_DAY * streak
    if (diff === 0 && i === 0) {
      hasOrderedAnythingToday = true
    } else if (ONE_DAY <= diff && diff < 2 * ONE_DAY) {
      streak++
    } else if (diff >= 2 * ONE_DAY) {
      break
    }
  }

  return streak + (hasOrderedAnythingToday ? 1 : 0)
}

export const calculateStreakDiscount = streak => {
  const MAX_STREAK = 5
  const normalizedStreak = Math.min(streak, MAX_STREAK)
  return ((1 + normalizedStreak) / 2) * normalizedStreak / 100
}

export const calculateCostWithStreakDiscount = (cost, streakDiscount) => Math.max(Math.floor((1 - streakDiscount) * cost), 1)
