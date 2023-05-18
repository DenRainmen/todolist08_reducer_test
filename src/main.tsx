import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWithRedux from './AppWithRedux'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
)
