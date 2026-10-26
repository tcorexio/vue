import type { Module } from 'vuex'
import type { RootState } from '../../type'

import { state } from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const productsModule: Module<ReturnType<typeof state>, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default productsModule
