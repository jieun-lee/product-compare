import React from 'react';
import Card from './components/card';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

/**
 * Section for displaying a set of cards
 * @param {object} data array of items to display
 * @param {function} onClick callback function when a single card is clicked
 * @param {function} onEdit callback function when we click edit
 * @param {function} toggleArchived callback function when we click archive
 * @param {function} onDelete callback function when we click delete
 * @param {function} toggleFavourite callback function when we click favourite
 * @param {function} changeRating callback function to change the rating
 */
const CardSection = (props) => {
    const {
        data,
        onClick,
        onEdit,
        toggleArchived,
        onDelete,
        toggleFavourite,
        changeRating
    } = props;

    const handleItemClick = (id) => {
        if (onClick) {
            return () => onClick(id);
        } else return undefined;
    }

    const handleItemEdit = (id) => {
        if (onEdit) {
            return () => onEdit(id);
        } else return undefined;
    }

    const handleToggleArchived = (id, isArchived) => {
        if (toggleArchived) toggleArchived(id, isArchived);
    }
    
    const handleItemDelete = (id) => {
        if (onDelete) {
            return () => onDelete(id);
        } else return undefined;
    }

    const handleToggleFavourite = (id, isFavourite) => {
        if (toggleFavourite) toggleFavourite(id, isFavourite);
    }

    const handleChangeRating = (id, rating) => {
        if (changeRating) changeRating(id, rating);
    }

    return (
        <CardWrapper>
            {data.map((item) => (
                <Card
                    key={item._id}
                    name={item.name}
                    price={item.price} // TODO
                    imageUrl={item.imageUrl}
                    description={item.description}
                    rating={item.rating}
                    isArchived={item.isArchived}
                    isFavourite={item.isFavourite}
                    onCardClick={handleItemClick(item._id)}
                    onEdit={handleItemEdit(item._id)}
                    toggleArchived={(isArchived) => handleToggleArchived(item._id, isArchived)}
                    onDelete={handleItemDelete(item._id)}
                    toggleFavourite={(isFavourite) => handleToggleFavourite(item._id, isFavourite)}
                    changeRating={(rating) => handleChangeRating(item._id, rating)}
                />
            ))}
        </CardWrapper>
    );
}

export default CardSection;