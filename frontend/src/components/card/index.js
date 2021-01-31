import React from 'react';
import styled from 'styled-components';
import { Rating, Image } from 'semantic-ui-react';

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/image.png';

const StyledCard = styled.div`
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    width: 250px;
    margin: 12px;
    padding: 16px;
    box-shadow: 2px 2px 2px 0 #00000040;

    &:hover {
        cursor: pointer;
    }
`;

const Card = (props) => {
    const { name, price, imageUrl, description, isFavourite, rating, onClick } = props;

    const handleClick = () => {
        if (onClick) onClick();
    }

    return (
        <StyledCard onClick={handleClick}>
            <Image src={imageUrl ?? DEFAULT_IMAGE} size='large' />
            <h3 style={{ marginBottom: '4px' }}>
                {name}
                <Rating
                    icon="heart"
                    size="huge"
                    maxRating={1}
                    defaultRating={isFavourite ? 1 : 0}
                    style={{ float: 'right' }}
                />
            </h3>
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
        </StyledCard>
    );
}

export default Card;