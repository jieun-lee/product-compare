import React, { useCallback } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const CloseButton = styled(Icon)`
    cursor: pointer;    
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4px;
`;

/**
 * List of Inputs with an Add Button
 * @param {string[]} values
 * @param {function} onUpdate (values) => void
 */
const InputList = (props) => {
    const { values = [], onUpdate, placeholder, buttonLabel } = props;

    const onAddInput = useCallback(() => {
        onUpdate([...values, '']);
    }, [onUpdate, values]);

    const updateValue = useCallback((index, value) => {
        onUpdate([...values.slice(0, index), value, ...values.slice(index+1)]);
    }, [onUpdate, values]);

    const removeValue = useCallback((index) => {
        onUpdate([...values.slice(0, index), ...values.slice(index+1)]);
    }, [onUpdate, values]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {values.map((value, index) => (
                <div key={index} style={{ marginBottom: '4px', position: 'relative' }}>
                    <Input
                        placeholder={placeholder}
                        value={value}
                        size="small"
                        onChange={(e) => updateValue(index, e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <CloseButton name="close" onClick={() => removeValue(index)} />
                </div>
            ))}
            <Button basic size="small" style={{ margin: 0 }} onClick={onAddInput}>
                {buttonLabel}
            </Button>
        </div>
    );
}

export default InputList;