import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import client from './apollo/client.ts'
import store from './stores/index.ts'

const app = createApp(App)

app.use(router)
app.use(store)

app.provide(DefaultApolloClient, client)
app.mount('#app')
