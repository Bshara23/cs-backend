import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import PCsPage from './pages/PCsPage';
import PhonesPage from './pages/PhonesPage';

import ChangePassword from './pages/ChangePassword';
import E404Page from './pages/E404Page';
import ForgotPage from './pages/ForgotPage';
import ActivateAccount from './pages/ActivateAccount';
import About from './pages/About';
import ProfilePage from './pages/ProfilePage';

import Navbar from './components/Navbar';
import {currentUser} from './data/Global';

function App () {
  // const Login = useSelector(ShowLogIn);
  // const isCoursesHidden = useSelector(ShowCourses);
  const user = useSelector (currentUser);

  useEffect (() => {
    console.log ('user', user);
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="body">

          <Navbar />
          <Switch>
            <Route path="/" exact component={LogInPage} />
            <Route path="/ch/:id/:token" exact component={ChangePassword} />
            <Route path="/a/:id/:token" exact component={ActivateAccount} />

            <Route path="/404" exact component={E404Page} />

            <Route path="/sign-up" exact component={SignUpPage} />
            <Route path="/sign-in" exact component={LogInPage} />
            <Route path="/reset-password" exact component={ForgotPage} />

            {user !== null &&
              <div>

                <Route path="/dashboard" exact component={DashboardPage} />
                <Route path="/pcs" exact component={PCsPage} />
                <Route path="/phones" exact component={PhonesPage} />
                <Route path="/about" exact component={About} />
                <Route path="/profile" exact component={ProfilePage} />
              </div>}

            <Route path="/404" component={E404Page} />
            <Redirect from="*" to="/404" />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
