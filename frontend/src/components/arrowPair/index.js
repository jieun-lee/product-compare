import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledIcon = styled(Icon)`
    color: #ffffffa6;
    margin: 0 !important;
    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
    &.disabledArrow {
        color: #ffffff40;
        cursor: default;
    }
`;

/**
 * Left and Right Arrow Pairs
 * @param {function} onBackClicked? () => void
 * @param {function} onNextClicked? () => void
 * @param {style} style
 */
const ArrowPair = (props) => {
    const { onBackClicked, onNextClicked, style } = props;

    return (
        <div style={style}>
            <StyledIcon
                name="arrow alternate circle left"
                size="big"
                className={onBackClicked ? '' : 'disabledArrow'}
                onClick={onBackClicked}
            />
            <StyledIcon
                name="arrow alternate circle right"
                size="big"
                className={onNextClicked ? '' : 'disabledArrow'}
                onClick={onNextClicked}
            />
        </div>
    );
}

export default ArrowPair;