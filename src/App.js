import React, { Component } from 'react'
import './App.css'
import { TopBar } from './components/TopBar'
import ListContainer  from './containers/ListContainer'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import initialstate from './redux/initialstate'


const store = configureStore(initialstate)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TopBar />
          <ListContainer />
        </div>
      </Provider>
    );
  }
}

export default App;