import React from 'react';
import BaseSidebar from '../index';
import styled from 'styled-components';
import { Sidebar } from 'semantic-ui-react';
import SidebarToggle from '../toggle';

const StyledHeader = styled.h3`
    margin: 0;
`;

/**
 * Sidebar for Lists Page
 * @param {boolean} isVisible
 * @param {function} setIsVisible
 */
const ListsSidebarWrapper = (props) => {
    const { isVisible, setIsVisible, children } = props;
    return (
        <Sidebar.Pushable>
            <BaseSidebar isVisible={isVisible} setIsVisible={setIsVisible}>
                <StyledHeader>Settings</StyledHeader>
                {/* Lists Sidebar Content Here */}
            </BaseSidebar>
            <Sidebar.Pusher dimmed={isVisible}>
                <SidebarToggle setIsVisible={setIsVisible} />
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}

export default ListsSidebarWrapper;