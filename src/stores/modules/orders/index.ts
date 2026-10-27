import type { RootState } from '@/stores/type'
import type { Module } from 'vuex'
import { state } from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './action'

const ordersModule: Module<ReturnType<typeof state>, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default ordersModule
