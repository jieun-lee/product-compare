import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { createUser, fetchUser } from '../../data/redux/actions/users';

export const LoginPage = () => {
    const dispatch = useDispatch();
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
    }, [isNewUser, username, pin, dispatch]);

    return (
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
    );
}