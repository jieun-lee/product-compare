import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Form, Modal, Button, Icon } from 'semantic-ui-react';
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
    const history = useHistory();
    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const items = useSelector(getItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        isFavourite: false,
        rating: 0
    });

    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch, listId]);

    const updateItemData = useCallback((update) => {
        setItemData((state) => ({ ...state, ...update }));
    }, []);

    const toggleFavourite = useCallback(() => {
        setItemData((state) => ({ ...state, isFavourite: !state.isFavourite }));
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(createItem({ ...itemData, listId: listId }));
        setIsModalOpen(false);
    }, [dispatch, itemData, listId]);

    const onBackClicked = useCallback(() => {
        history.push('/lists');
    }, [history]);

    return (!user) ? <Redirect to="/login" /> : (!list) ? <Redirect to="/lists" /> : (
        <div style={{ padding: '12px' }}>
            <h2 style={{ margin: '12px' }}>
                <Icon
                    name='arrow alternate circle left outline'
                    onClick={onBackClicked}
                    style={{ cursor: 'pointer' }}
                />
                {list.name}
            </h2>
            <Modal
                size="tiny"
                onClose={() => setIsModalOpen(false)}
                onOpen={() => setIsModalOpen(true)}
                open={isModalOpen}
                trigger={<Button style={{ marginLeft: '12px', marginBottom: '24px' }}>Add New Item</Button>}
                style={{ padding: '24px' }}
            >
                <h3>Create New Item</h3>
                <Form onSubmit={handleSubmit}>
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
            </Modal>
            <CardSection
                data={items}
                dataType="Item"
                onEdit={(id) => console.log(`editing item with id ${id}`)}
                onDelete={(id) => console.log(`deleting item with id ${id}`)}
            />
        </div>
    );
}