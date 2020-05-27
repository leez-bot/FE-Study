import * as types from './mutation-type'

export const getAndSetMsg = function({ commit, state }, str) {
    setTimeout(() => {
        commit(types.SETSTATE, { msg: 'LALALA' })
    }, 2000);
}