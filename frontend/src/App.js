import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ListPage } from './pages/list';
import { ListsPage } from './pages/lists';
import { LoginPage } from './pages/login';

const App = () => {
    return (
        // TODO: make the pages work without the nav
        <Router>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/lists">Lists</Link>
            </div>
            <div>
                <Link to="/list">List</Link>
            </div>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/lists">
                    <ListsPage />
                </Route>
                <Route path="/list/:listId">
                    <ListPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;