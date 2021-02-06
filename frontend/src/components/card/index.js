import React, { useCallback } from 'react';
import styled from 'styled-components';
import CardMenu from '../cardMenu';
import { Rating, Image } from 'semantic-ui-react';
import { DEFAULT_IMAGE } from '../../util/const';

const StyledCard = styled.div`
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    width: 250px;
    margin: 12px;
    padding: 16px;
    box-shadow: 2px 2px 2px 0 #00000040;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        cursor: pointer;
    }
`;

const CardHeader = styled.h3`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4px;
    margin-top: 14px;
`;

/**
 * Card for displaying a list or ist item
 * @param {string} itemType
 * @param {string} name
 * @param {number} price?
 * @param {string} imageUrl?
 * @param {string} description?
 * @param {boolean} isFavourite?
 * @param {boolean} rating?
 * @param {function} onCardClick?
 * @param {function} onEdit?
 * @param {function} onDelete?
 */
const Card = (props) => {
    const {
        itemType,
        name,
        price,
        imageUrl,
        description,
        isFavourite = false,
        rating,
        onCardClick,
        onEdit,
        onDelete,
        toggleFavourite,
        changeRating
    } = props;

    const handleClick = useCallback(() => {
        if (onCardClick) onCardClick();
    }, [onCardClick]);

    const handleToggleFavourite = (event, rating) => {
        event.stopPropagation();
        toggleFavourite(rating ? true : false);
    }

    const handleChangeRating = (event, rating) => {
        event.stopPropagation();
        changeRating(rating);
    }

    return (
        <StyledCard onClick={handleClick}>
            <div style={{ marginBottom: '8px' }}>
                {/* TODO: get rid of blue outline after clicking */}
                <Rating
                    icon="heart"
                    size="massive"
                    maxRating={1}
                    rating={isFavourite ? 1 : 0}
                    onRate={(event, { rating }) => handleToggleFavourite(event, rating)}
                    style={{ position: 'absolute', zIndex: 1, right: 0, top: 0, margin: '8px 4px' }}
                />
                <Image
                    src={imageUrl?.length ? imageUrl : DEFAULT_IMAGE}
                    size='large'
                    style={{ height: '180px', objectFit: 'scale-down' }}
                />
                <CardHeader>
                    <span>{name}</span>
                    {price && <span style={{ color: '#609638' }}>${price}</span>}
                </CardHeader>
                <p>{description}</p>
            </div>
            <div>
                {rating !== undefined && (
                    <Rating
                        icon="star"
                        maxRating={5}
                        rating={rating}
                        clearable
                        onRate={(event, { rating }) => handleChangeRating(event, rating)}
                    />
                )}
                <CardMenu
                    itemType={itemType}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </StyledCard>
    );
}

export default Card;