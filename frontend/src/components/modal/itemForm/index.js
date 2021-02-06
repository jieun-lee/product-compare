import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal } from 'semantic-ui-react';
import { createItem, updateItem } from '../../../data/redux/actions/items';
import ImageSelector from '../../imageSelector';

const TITLE_NEW_ITEM = "Create New Item";
const TITLE_EDIT_ITEM = "Edit Item";

const blankItemData = {
    name: '',
    price: undefined,
    imageUrl: '',
    description: '',
    isFavourite: false,
    rating: 0
};

const extractItemData = (rawData) => ({
    name: rawData.name ?? '',
    price: rawData.price ?? undefined,
    imageUrl: rawData.imageUrl ?? '',
    description: rawData.description ?? '',
    isFavourite: rawData.isFavourite ?? false,
    rating: rawData.rating ?? 0
});

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
 * @param {boolean} isModalOpen
 * @param {function} closeModal
 * @param {string} listId list the item belongs to / will belong to
 * @param {string} itemId? the item we are editing
 * @param {object} savedItem? the item we are loading from
 */
const ItemFormModal = (props) => {
    const { isNew, isModalOpen, closeModal, listId, itemId, savedItem } = props;
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState(blankItemData);

    useEffect(() => {
        if (savedItem) setItemData(extractItemData(savedItem));
    }, [savedItem]);

    const updateItemData = useCallback((update) => {
        setItemData((state) => ({ ...state, ...update }));
    }, []);

    const toggleFavourite = useCallback(() => {
        setItemData((state) => ({ ...state, isFavourite: !state.isFavourite }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (isNew) {
            dispatch(createItem({ ...itemData, listId: listId }));
        } else {
            if (!!itemId) dispatch(updateItem(itemId, itemData));
        }
        setItemData(blankItemData); // reset form
        closeModal();
    }, [dispatch, closeModal, isNew, itemData, listId, itemId]);

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={closeModal}
            style={{ padding: '24px' }}
        >
            <h3>{isNew ? TITLE_NEW_ITEM : TITLE_EDIT_ITEM}</h3>
            <Form>
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
                <ImageSelector
                    currentUrl={itemData.imageUrl}
                    onUpdate={(imageUrl) => updateItemData({ 'imageUrl': imageUrl })}
                />
                <Form.Button content="Create" primary onClick={handleSubmit} />
            </Form>
        </Modal>
    )
}

export default ItemFormModal;