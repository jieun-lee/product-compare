import React from 'react';
import { Rating } from 'semantic-ui-react';

/**
 * Displays the rating with stars
 * @param {number} rating
 * @param {function} updateRating
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
        <Rating
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