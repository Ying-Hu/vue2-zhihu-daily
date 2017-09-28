import * as types from './types'
const mutations = {
  [types.CHANGEBACKFLAG]: (state, flag) => {
    return (state.backFlag = flag)
  },
  [types.CHANGEADDICON]: (state, flag) => {
    return (state.addIcon = flag)
  },
  [types.CHANGEBARFLAG]: (state, flag) => {
    return (state.barFlag = flag)
  }
}

export default mutations
