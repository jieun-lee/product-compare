import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import BaseSidebar from '../index';
import styled from 'styled-components';
import SidebarToggle from '../toggle';

const StyledHeader = styled.h3`
    margin: 0;
`;

/**
 * Sidebar for Single List Page
 * @param {boolean} isVisible
 * @param {function} setIsVisible
 */
const ListSidebarWrapper = (props) => {
    const { isVisible, setIsVisible, children } = props;
    return (
        <Sidebar.Pushable>
            <BaseSidebar isVisible={isVisible} setIsVisible={setIsVisible}>
                <StyledHeader>Filters</StyledHeader>
                {/* List Sidebar Content Here */}
            </BaseSidebar>
            <Sidebar.Pusher dimmed={isVisible}>
                <SidebarToggle setIsVisible={setIsVisible} />
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}

export default ListSidebarWrapper;