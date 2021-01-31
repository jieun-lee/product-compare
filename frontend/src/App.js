import React, { useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './pages/list';
import { ListsPage } from './pages/lists';
import { LoginPage } from './pages/login';
import { Button } from 'semantic-ui-react';
import { logoutUser } from './data/redux/actions/users';
import { getUser } from './data/redux/selectors/user';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const resetUser = useCallback(() => {
        dispatch(logoutUser);
    }, [dispatch]);

    return (
        <Router>
            {user && (
                <Button
                    size="tiny"
                    style={{ float: 'right', margin: '16px' }}
                    onClick={resetUser}
                >
                    Log Out
                </Button>
            )}
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
}

export default App;