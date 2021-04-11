import React from 'react';
import BaseSidebar from '../index';
import styled from 'styled-components';

const StyledHeader = styled.h3`
    margin: 0;
`;

/**
 * Sidebar for Single List Page
 * @param {boolean} isVisible
 * @param {function} setIsVisible
 */
const ListSidebar = (props) => {
    const { isVisible, setIsVisible } = props;
    return (
        <BaseSidebar isVisible={isVisible} setIsVisible={setIsVisible}>
            <StyledHeader>Filters</StyledHeader>
        </BaseSidebar>
    );
}

export default ListSidebar;