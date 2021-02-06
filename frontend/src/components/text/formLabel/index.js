import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
    margin-bottom: 2px !important;
    font-weight: 600;
`;

/**
 * Form Label Text
 * @param {React.ReactNode} children
 * @param {boolean} required?
 * @param {style} style?
 */
const FormLabel = (props) => {
    const { children, required = false, style } = props;
    return (
        <Text style={style}>
            {children}
            <span style={{ color: 'red' }}>
                {required ? '*' : ''}
            </span>
        </Text>
    );
};

export default FormLabel;