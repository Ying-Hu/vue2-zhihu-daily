import * as types from './types'
const mutations = {
  [types.CHANGEFLAGFALSE]: state => {
    return (state.backFlag = false)
  },
  [types.CHANGEFLAGTRUE]: state => {
    return (state.backFlag = true)
  }
}

export default mutations
