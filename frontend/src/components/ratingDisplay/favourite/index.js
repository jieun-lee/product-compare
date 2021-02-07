import React from 'react';
import { Rating } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledRating = styled(Rating)`
    &&& i:focus {
        outline: none;
    }
`;

/**
 * Displays the isFavourite boolean with a Heart
 * @param {boolean} isFavourite
 * @param {function} updateFavourite (isFavourite) => void
 * @param {SemanticSIZES} size?
 * @param {style} style? passed into Rating to set styles
 */
const FavouriteDisplay = (props) => {
    const { isFavourite, updateFavourite, size, style } = props;

    const handleToggleFavourite = (event, rating) => {
        event.stopPropagation();
        updateFavourite(rating ? true : false);
    }

    // TODO: get rid of blue outline after clicking
    return (
        <StyledRating
            icon="heart"
            size={size ?? "massive"}
            maxRating={1}
            rating={isFavourite ? 1 : 0}
            onRate={(event, { rating }) => handleToggleFavourite(event, rating)}
            style={style}
        />
    )
}

export default FavouriteDisplay;