import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useSelector, useDispach} from 'react-redux';
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import TestPage from './pages/TestPage'
import ChangePassword from './pages/ChangePassword'
import E404Page from './pages/E404Page'
import ForgotPage from './pages/ForgotPage'
import ActivateAccount from './pages/ActivateAccount'

function App() {
  // const Login = useSelector(ShowLogIn);
  // const isCoursesHidden = useSelector(ShowCourses);
 
  return (
    <Router>
      <div className="App">
        <div className="body">
          <Switch>
            <Route path="/" exact component={LogInPage} />
            <Route path="/ch/:id/:token" exact component={ChangePassword} />
            <Route path="/a/:id/:token" exact component={ActivateAccount} />

            <Route path="/404" exact component={E404Page} />

            <Route path="/sign-up" exact component={SignUpPage} />
            <Route path="/sign-in" exact component={LogInPage} />
            <Route path="/reset-password" exact component={ForgotPage} />
            <Route path="/dashboard" exact component={DashboardPage}/>
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
