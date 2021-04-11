import React from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * Button to open the sidebar
 * @param {function} setIsSidebarVisible
 */
const SidebarToggle = (props) => {
    const { setIsSidebarVisible } = props;
    return (
        <Icon
            name="bars"
            size="big"
            onClick={() => setIsSidebarVisible(true)}
            style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 0, margin: '16px' }}
        />
    );
};

export default SidebarToggle;