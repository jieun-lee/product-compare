import React from 'react';
import Card from '../card';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CardSection = (props) => {
    const { data, onItemClick } = props;

    const handleItemClick = (id) => {
        if (onItemClick) onItemClick(id);
    }
    return (
        <CardWrapper>
            {Object.keys(data).map((id) => (
                <Card
                    key={id}
                    name={data[id].name}
                    description={data[id].description}
                    rating={data[id].rating}
                    isFavourite={data[id].isFavourite}
                    onClick={() => handleItemClick(id)}
                />
            ))}
        </CardWrapper>
    );
}

export default CardSection;