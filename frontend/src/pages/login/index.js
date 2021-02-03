import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router';
import { Form } from 'semantic-ui-react';
import { createUser, fetchUser } from '../../data/redux/actions/users';
import { getUser } from '../../data/redux/selectors/user';

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const handleSubmit = useCallback(() => {
        if (isNewUser) {
            dispatch(createUser({
                username: username,
                pin: parseInt(pin)
            }));
        } else {
            // TODO: pass in username + pin and do validation
            dispatch(fetchUser(username));
        }
        history.push('/lists');
    }, [isNewUser, username, pin, dispatch, history]);

    return (user) ? <Redirect to="/lists" /> : (
        <div style={{ padding: '24px' }}>
            <h3>Login</h3>
            <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <Form.Input
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                    placeholder="Pin Code"
                    name="pincode"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
                <Form.Checkbox
                    name="newUser"
                    label="I am a new user"
                    checked={isNewUser}
                    onChange={() => setIsNewUser((state) => !state)}
                />
                <Form.Button content="Login" primary />
            </Form>
        </div>
    );
}