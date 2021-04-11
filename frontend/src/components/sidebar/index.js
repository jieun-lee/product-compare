import React, { useCallback } from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../data/redux/actions/users';

const StyledSidebar = styled(Sidebar)`
    background-color: white;
    padding: 16px;
`;

const StyledCloseButton = styled(Icon)`
    &&& {
        position: absolute;
        top: 8px;
        right: 8px;
        margin: 0;
        cursor: pointer;
    }
`;

/**
 * Base Sidebar
 * @param {boolean} isVisible
 * @param {function} setIsVisible
 */
const BaseSidebar = (props) => {
    const { isVisible, setIsVisible, children } = props;
    const dispatch = useDispatch();

    const resetUser = useCallback(() => {
        dispatch(logoutUser);
    }, [dispatch]);

    return (
        <StyledSidebar
            direction="right"
            animation="overlay"
            visible={isVisible}
            onHide={() => setIsVisible(false)}
        >
        <StyledCloseButton name='close' color='grey' onClick={() => setIsVisible(false)} />
            {children}
            <Button size="tiny" onClick={resetUser} style={{ marginTop: '24px', width: '100%' }}>
                Log Out
            </Button>
        </StyledSidebar>
    );
}

export default BaseSidebar;
