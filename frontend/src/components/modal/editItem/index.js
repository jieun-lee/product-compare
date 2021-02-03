import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal } from 'semantic-ui-react';
import { createItem } from '../../../data/redux/actions/items';

const blankItemData = {
    name: '',
    description: '',
    isFavourite: false,
    rating: 0
};

const ratingOptions = [
    { key: '0', text: '0', value: 0 },
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5', value: 5 },
];

/**
 * Modal for Creating / Editing Items
 * @param {boolean} isNew
 * @param {string} listId
 * @param {string} title
 */
const EditItemModal = (props) => {
    const { isNew, listId, title } = props;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemData, setItemData] = useState(blankItemData);

    const updateItemData = useCallback((update) => {
        setItemData((state) => ({ ...state, ...update }));
    }, []);

    const toggleFavourite = useCallback(() => {
        setItemData((state) => ({ ...state, isFavourite: !state.isFavourite }));
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(createItem({ ...itemData, listId: listId }));
        setItemData(blankItemData); // reset form
        setIsModalOpen(false);
    }, [dispatch, itemData, listId]);

    return (
        <Modal
            size="tiny"
            onClose={() => setIsModalOpen(false)}
            onOpen={() => setIsModalOpen(true)}
            open={isModalOpen}
            trigger={props.children}
            style={{ padding: '24px' }}
        >
            <h3>{title}</h3>
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
    )
}

export default EditItemModal;