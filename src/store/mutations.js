import * as types from './types'
const mutations = {
  [types.CHANGEBACKFLAG]: (state, flag) => {
    return (state.backFlag = flag)
  },
  [types.CHANGEADDICON]: (state, flag) => {
    return (state.addIcon = flag)
  }
}

export default mutations
