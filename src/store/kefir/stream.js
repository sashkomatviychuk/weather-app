import { pool } from 'kefir'

export const statePoll = pool();
export const state$ = statePoll.toProperty();