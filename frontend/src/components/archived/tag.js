import React from 'react';
import { Button } from 'semantic-ui-react';
import { COLORS } from '../../util/const';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    &&& {
        padding: 4px 8px;
        margin-left: 8px;
        margin-top: 2px;
        background-color: ${COLORS.ARCHIVE};
        color: white;
        cursor: default;
    }
`;

const ArchivedTag = (props) => (
    <StyledButton style={props.style}>
        Archived
    </StyledButton>
);

export default ArchivedTag;