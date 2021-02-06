import React from 'react';
import Card from '../card';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

/**
 * Section for displaying a set of cards
 * @param {object} data object with key-value pairs of items to display
 * @param {string} dataType "List" or "Item" (the label)
 * @param {function} onClick callback function when a single card is clicked
 * @param {function} onEdit callback function when we click edit
 * @param {function} onDelete callback function when we click delete
 */
const CardSection = (props) => {
    const {
        data,
        dataType = "Item",
        onClick,
        onEdit,
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
            {Object.keys(data).map((id) => {
                return (!!data[id]) ? (
                    <Card
                        key={id}
                        itemType={dataType}
                        name={data[id].name}
                        price={data[id].price} // TODO
                        imageUrl={data[id].imageUrl}
                        description={data[id].description}
                        rating={data[id].rating}
                        isFavourite={data[id].isFavourite}
                        onCardClick={handleItemClick(id)}
                        onEdit={handleItemEdit(id)}
                        onDelete={handleItemDelete(id)}
                        toggleFavourite={(isFavourite) => handleToggleFavourite(id, isFavourite)}
                        changeRating={(rating) => handleChangeRating(id, rating)}
                    />
                ) : null;
            })}
        </CardWrapper>
    );
}

export default CardSection;