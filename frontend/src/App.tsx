import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Header } from './cmps/Header'
import { Manager } from './pages/manager'
import { Room } from './pages/Room'
import { getManagers } from './store/actions/managerActions'
import { getOccupations } from './store/actions/meetingActions'


export function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getManagers())
    dispatch(getOccupations(new Date().getFullYear()))
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/manager" component={Manager} />
            <Route path="/room" component={Room} />
            <Redirect from="/" to="/room" />
          </Switch>
        </main>
      </Router>
    </div>
  )
}

