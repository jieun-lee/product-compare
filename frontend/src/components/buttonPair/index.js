import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    width: 150px;
    margin: 0 8px !important;
`;

/**
 * Cancel and Save Button Pair
 * @param {string} saveLabel
 * @param {function} onSave
 * @param {function} onCancel
 * @param {boolean} isSaveDisabled?
 */
const ButtonPair = (props) => {
    const { saveLabel, onSave, onCancel, isSaveDisabled = false } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <StyledButton
                content="Cancel"
                onClick={onCancel}
                type="button"
            />
            <StyledButton
                content={saveLabel}
                primary
                onClick={onSave}
                disabled={isSaveDisabled}
                type="button"
            />
        </div>
    )
}

export default ButtonPair;