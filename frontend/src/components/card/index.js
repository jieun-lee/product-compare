import React, { useCallback } from 'react';
import styled from 'styled-components';
import CardMenu from '../cardMenu';
import { Rating, Image } from 'semantic-ui-react';

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/image.png';

const StyledCard = styled.div`
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    width: 250px;
    margin: 12px;
    padding: 16px;
    box-shadow: 2px 2px 2px 0 #00000040;
    position: relative;

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
        rating = 0,
        onCardClick,
        onEdit,
        onDelete
    } = props;

    const handleClick = useCallback(() => {
        if (onCardClick) onCardClick();
    }, [onCardClick]);

    return (
        <StyledCard onClick={handleClick}>
            <Rating
                icon="heart"
                size="massive"
                maxRating={1}
                defaultRating={isFavourite ? 1 : 0}
                style={{ position: 'absolute', zIndex: 1, right: 0, top: 0, margin: '8px 4px' }}
            />
            <Image src={imageUrl ?? DEFAULT_IMAGE} size='large' />
            <CardHeader>
                <span>{name}</span>
                {price && <span style={{ color: '#609638' }}>${price}</span>}
            </CardHeader>
            <p>{description}</p>
            {rating !== undefined && (
                <Rating
                    icon="star"
                    maxRating={5}
                    defaultRating={rating}
                    clearable
                    onRate={(_, { rating }) => console.log(rating)}
                />
            )}
            <CardMenu
                itemType={itemType}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </StyledCard>
    );
}

export default Card;