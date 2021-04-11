import React from 'react';
import BaseSidebar from '../index';
import styled from 'styled-components';

const StyledHeader = styled.h3`
    margin: 0;
`;

/**
 * Sidebar for Lists Page
 * @param {boolean} isVisible
 * @param {function} setIsVisible
 */
const ListsSidebar = (props) => {
    const { isVisible, setIsVisible } = props;
    return (
        <BaseSidebar isVisible={isVisible} setIsVisible={setIsVisible}>
            <StyledHeader>Settings</StyledHeader>
        </BaseSidebar>
    );
}

export default ListsSidebar;