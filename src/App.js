// import './App.css'
import React from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/auth' component={Quiz}/>
          <Route path='/quiz-creator' component={Quiz}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' component={Quiz}/>
        </Switch>
      </Layout>
    )
  }
}

export default App
