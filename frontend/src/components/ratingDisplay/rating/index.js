import React from 'react';
import { Rating } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledRating = styled(Rating)`
    &&& i:focus {
        outline: none;
    }
`;

/**
 * Displays the rating with stars
 * @param {number} rating
 * @param {function} updateRating (rating) => void
 * * @param {style} style? passed into Rating to set styles
 */
const RatingDisplay = (props) => {
    const { rating, updateRating, style } = props;

    const handleChangeRating = (event, rating) => {
        event.stopPropagation();
        updateRating(rating);
    }

    // TODO: get rid of blue outline after clicking
    return (
        <StyledRating
            icon="star"
            maxRating={5}
            rating={rating}
            clearable
            onRate={(event, { rating }) => handleChangeRating(event, rating)}
            style={style}
        />
    )
}

export default RatingDisplay;