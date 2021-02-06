import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    width: 150px;
    margin: 0 8px !important;
`;

const ButtonPair = (props) => {
    const { saveLabel, onSave, onCancel } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <StyledButton
                content="Cancel"
                onClick={onCancel}
            />
            <StyledButton
                content={saveLabel}
                primary
                onClick={onSave}
            />
        </div>
    )
}

export default ButtonPair;