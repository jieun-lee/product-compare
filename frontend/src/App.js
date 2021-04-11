import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ListPage } from './pages/list';
import { ListsPage } from './pages/lists';
import { LoginPage } from './pages/login';

const App = () => (
    <Router>
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
            <Route path="/">
                <LoginPage />
            </Route>
        </Switch>
    </Router>
);

export default App;