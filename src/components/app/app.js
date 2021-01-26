import 'bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './../nav/nav';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
