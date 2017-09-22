import * as types from './types'
const actions = {
  changeFlageFalse: ({commit}) => {
    commit(types.CHANGEFLAGFALSE)
  },
  changeFlageTrue: ({commit}) => {
    commit(types.CHANGEFLAGTRUE)
  }
}

export default actions
