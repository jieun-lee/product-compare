import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { fetchItems, createItem } from '../../data/redux/actions/items';
import { getUser } from '../../data/redux/selectors/user';
import { getItems } from '../../data/redux/selectors/items';
import CardSection from '../../components/cardSection';
import { getListById } from '../../data/redux/selectors/lists';

const ratingOptions = [
    { key: '0', text: '0', value: 0 },
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5', value: 5 },
];

export const ListPage = () => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const items = useSelector(getItems);
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        isFavourite: false,
        rating: 0
    });

    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch]);

    const updateItemData = useCallback((update) => {
        setItemData((state) => ({ ...state, ...update }));
    }, []);

    const toggleFavourite = useCallback(() => {
        setItemData((state) => ({ ...state, isFavourite: !state.isFavourite }));
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(createItem({ ...itemData, listId: listId }));
    }, [itemData]);

    if (!user) {
        return <div>Log in to view your list</div>
    } else if (!list) {
        return <div>List unknown</div>
    } else {
        return (
            <div>
                <h2>{ list.name }</h2>
                <CardSection data={items} />
                <Form onSubmit={handleSubmit} style={{ width: '300px', marginTop: '24px' }}>
                    <Form.Input
                        placeholder="Item Name"
                        value={itemData.name}
                        onChange={(e) => updateItemData({ 'name': e.target.value })}
                    />
                    <Form.Input
                        placeholder="Description"
                        value={itemData.description}
                        onChange={(e) => updateItemData({ 'description': e.target.value })}
                    />
                    <Form.Checkbox
                        label="Favourite Item"
                        checked={itemData.isFavourite}
                        onChange={() => toggleFavourite()}
                    />
                    <Form.Select
                        label="Rating"
                        options={ratingOptions}
                        value={itemData.rating}
                        onChange={(_, { value }) => updateItemData({ 'rating': value })}
                    />
                    <Form.Button content="Create" primary />
                </Form>
            </div>
        )
    }
}