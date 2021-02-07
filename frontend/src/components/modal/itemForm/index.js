import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { createItem, updateItem } from '../../../data/redux/actions/items';
import ImageSelector from '../../imageSelector';
import ButtonPair from '../../buttonPair';
import FavouriteDisplay from '../../ratingDisplay/favourite';
import RatingDisplay from '../../ratingDisplay/rating';
import FormLabel from '../../text/formLabel';
import InputList from '../../inputList';

const TITLE_NEW_ITEM = "Create New Item";
const TITLE_EDIT_ITEM = "Edit Item";
const SAVE_BUTTON_NEW_ITEM = "Create";
const SAVE_BUTTON_EDIT_ITEM ="Save";

const PriceInput = styled(Form.Input)`
    width: 100px;
    &&& input {
        padding: 4px;
        margin-left: 2px;
    }
`;

const blankItemData = {
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    details: [],
    isFavourite: false,
    rating: 0
};

const rawDataToFormData = (rawData) => ({
    name: rawData.name ?? '',
    price: rawData.price?.toString() ?? '',
    imageUrl: rawData.imageUrl ?? '',
    description: rawData.description ?? '',
    details: rawData.details ?? [],
    isFavourite: rawData.isFavourite ?? false,
    rating: rawData.rating ?? 0
});

const formDataToSavedData = (listId, formData) => ({
    ...formData,
    listId: listId,
    price: isNaN(parseFloat(formData.price)) ? undefined : parseFloat(formData.price)
});

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
        if (savedItem) {
            setItemData(rawDataToFormData(savedItem));
        } else {
            setItemData(blankItemData);
        }
    }, [savedItem]);

    const updateItemData = useCallback((update) => {
        setItemData((state) => ({ ...state, ...update }));
    }, []);

    const handleModalClose = useCallback(() => {
        setItemData(blankItemData); // reset form
        closeModal();
    }, [closeModal]);

    const handleSubmit = useCallback(() => {
        if (isNew) {
            dispatch(createItem(formDataToSavedData(listId, itemData)));
        } else {
            if (!!itemId) dispatch(updateItem(itemId, formDataToSavedData(listId, itemData)));
        }
        handleModalClose();
    }, [dispatch, handleModalClose, isNew, itemData, listId, itemId]);

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={handleModalClose}
            style={{ padding: '24px' }}
        >
            <h3>{isNew ? TITLE_NEW_ITEM : TITLE_EDIT_ITEM}</h3>
            <Form>
                <FormLabel required>Name</FormLabel>
                <Form.Input
                    placeholder="Item Name"
                    value={itemData.name}
                    onChange={(e) => updateItemData({ 'name': e.target.value })}
                />
                <FormLabel>Description</FormLabel>
                <Form.Input
                    placeholder="Description"
                    value={itemData.description}
                    onChange={(e) => updateItemData({ 'description': e.target.value })}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel style={{ marginRight: '4px' }}>Price:</FormLabel>
                    <FormLabel>$</FormLabel>
                    <PriceInput
                        placeholder="Price"
                        value={itemData.price}
                        onChange={(e) => updateItemData({ 'price': e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', margin: '8px 0' }}>
                    <FormLabel>Favourite</FormLabel>
                    <FavouriteDisplay
                        isFavourite={itemData.isFavourite}
                        updateFavourite={(isFavourite) => updateItemData({ 'isFavourite': isFavourite })}
                        size="huge"
                        style={{ marginLeft: '4px' }}
                    />
                </div>
                <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center' }}>
                    <FormLabel>Rating</FormLabel>
                    <RatingDisplay
                        rating={itemData.rating}
                        updateRating={(rating) => updateItemData({ 'rating': rating })}
                        style={{ marginLeft: '8px' }}
                    />
                </div>
                <ImageSelector
                    currentUrl={itemData.imageUrl}
                    onUpdate={(imageUrl) => updateItemData({ 'imageUrl': imageUrl })}
                />
                <FormLabel>Details</FormLabel>
                <InputList
                    values={itemData.details}
                    onUpdate={(values) => updateItemData({ 'details': values })}
                    placeholder="Enter Detail"
                    buttonLabel="+ Add Detail"
                />
                <ButtonPair
                    saveLabel={isNew ? SAVE_BUTTON_NEW_ITEM : SAVE_BUTTON_EDIT_ITEM}
                    onSave={handleSubmit}
                    onCancel={handleModalClose}
                    isSaveDisabled={!itemData.name?.length}
                />
            </Form>
        </Modal>
    )
}

export default ItemFormModal;