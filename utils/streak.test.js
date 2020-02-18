import { calculateStreak } from './streak'
import { advanceTo, clear } from 'jest-date-mock';

const now = +new Date(2018, 5, 27, 12, 10, 5)
const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_HOUR = 60 * 60 * 1000

beforeEach(() => {
  advanceTo(now)
})

afterEach(() => {
  clear();
});

test('no events', () => {
  expect(calculateStreak([])).toBe(0);
});

test('1 event today', () => {
  expect(calculateStreak([{ts: now - ONE_HOUR}])).toBe(1);
});

test('2 events today', () => {
  expect(calculateStreak([{ts: now - ONE_HOUR}, {ts: now - 2 * ONE_HOUR}])).toBe(1);
});

test('1 event in the same second as now', () => {
  expect(calculateStreak([{ts: now}])).toBe(1);
});

test('2 events in the same second as now', () => {
  expect(calculateStreak([{ts: now}, {ts: now}])).toBe(1);
});

test('1 event at the very start of the day', () => {
  expect(calculateStreak([{ts: new Date().setHours(0, 0, 0, 0)}])).toBe(1);
});

test('1 event 1 day old', () => {
  expect(calculateStreak([{ts: now - ONE_DAY}])).toBe(1);
});

test('2 events 1 day old', () => {
  expect(calculateStreak([{ts: now - ONE_DAY}, {ts: now - ONE_DAY - ONE_HOUR}])).toBe(1);
});

test('streak of 4 days ending 1 day before now', () => {
  expect(calculateStreak([{ts: now - ONE_DAY}, {ts: now - 2 * ONE_DAY}, {ts: now - 3 * ONE_DAY}, {ts: now - 4 * ONE_DAY}])).toBe(4);
});

test('streak of 10 events in the past 4 days including today', () => {
  expect(calculateStreak([
    {ts: now},
    {ts: now - ONE_HOUR},
    {ts: now - 2 * ONE_HOUR},
    {ts: now - ONE_DAY},
    {ts: now - ONE_DAY - ONE_HOUR},
    {ts: now - ONE_DAY - 2 * ONE_HOUR},
    {ts: now - 2 * ONE_DAY},
    {ts: now - 2 * ONE_DAY - ONE_HOUR},
    {ts: now - 3 * ONE_DAY},
    {ts: now - 3 * ONE_DAY - ONE_HOUR},
  ])).toBe(4);
});

test('2 streaks separated by two day pause', () => {
  expect(calculateStreak([
    {ts: now},
    {ts: now - ONE_DAY},
    {ts: now - 2 * ONE_DAY},
    {ts: now - 4 * ONE_DAY},
    {ts: now - 5 * ONE_DAY},
    {ts: now - 6 * ONE_DAY},
    {ts: now - 7 * ONE_DAY},
    {ts: now - 8 * ONE_DAY},
  ])).toBe(3);
});

test('1 event 2 days old', () => {
  expect(calculateStreak([{ts: now - 2 * ONE_DAY}])).toBe(0);
});

test('2 events 2 days old', () => {
  expect(calculateStreak([{ts: now - 2 * ONE_DAY}, {ts: now - 2 * ONE_DAY - ONE_HOUR}])).toBe(0);
});

test('streak of daily events ending 2 days before now', () => {
  expect(calculateStreak([{ts: now - 2 * ONE_DAY}, {ts: now - 3 * ONE_DAY}, {ts: now - 4 * ONE_DAY}])).toBe(0);
});
