import * as types from './types'
const actions = {
  changeBackFlag: ({commit}, flag) => {
    commit(types.CHANGEBACKFLAG, flag)
  },
  changeAddIcon: ({commit}, flag) => {
    commit(types.CHANGEADDICON, flag)
  }
}

export default actions
