import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { createList, updateList } from '../../../data/redux/actions/lists';
import ButtonPair from '../../buttonPair';
import ImageSelector from '../../imageSelector';
import FavouriteDisplay from '../../ratingDisplay/favourite';
import FormLabel from '../../text/formLabel';

const TITLE_NEW_LIST = "Create a New List";
const TITLE_EDIT_LIST = "Edit List";
const SAVE_BUTTON_NEW_LIST = "Create";
const SAVE_BUTTON_EDIT_LIST ="Save";

const blankListData = {
    name: '',
    imageUrl: '',
    description: '',
    isFavourite: false
};

const rawDataToFormData = (rawData) => ({
    name: rawData.name ?? '',
    imageUrl: rawData.imageUrl ?? '',
    description: rawData.description ?? '',
    isFavourite: rawData.isFavourite ?? false
});

/**
 * Modal for Creating / Editing Lists
 * @param {boolean} isNew
 * @param {boolean} isModalOpen
 * @param {function} closeModal
 * @param {object} user user the list belongs to / will belong to
 * @param {string} listId? the list we are editing
 * @param {object} savedList? the list we are loading from
 */
const ListFormModal = (props) => {
    // TODO: pass in userId instead of user
    const { isNew, isModalOpen, closeModal, user, listId, savedList } = props;
    const dispatch = useDispatch();
    const [listData, setListData] = useState(blankListData);

    useEffect(() => {
        if (savedList) {
            setListData(rawDataToFormData(savedList));
        } else {
            setListData(blankListData);
        }
    }, [savedList]);

    const updateListData = useCallback((update) => {
        setListData((state) => ({ ...state, ...update }));
    }, []);

    const handleModalClose = useCallback(() => {
        setListData(blankListData); // reset form
        closeModal();
    }, [closeModal]);

    const handleSubmit = useCallback(() => {
        if (!user) {
            alert('Please login and try again');
        } else {
            if (isNew) {
                dispatch(createList({ ...listData, userId: user._id }));
            } else {
                if (!!listId) dispatch(updateList(listId, listData));
            }
            handleModalClose();
        }
    }, [dispatch, handleModalClose, isNew, listData, user, listId]);

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={handleModalClose}
            style={{ padding: '24px' }}
        >
            <h3>{isNew ? TITLE_NEW_LIST : TITLE_EDIT_LIST }</h3>
            <Form>
                <FormLabel required>Name</FormLabel>
                <Form.Input
                    placeholder="List Name"
                    value={listData.name}
                    onChange={(e) => updateListData({ 'name': e.target.value })}
                />
                <FormLabel>Description</FormLabel>
                <Form.Input
                    placeholder="Description"
                    value={listData.description}
                    onChange={(e) => updateListData({ 'description': e.target.value })}
                />
                <div style={{ display: 'flex', margin: '8px 0' }}>
                    <FormLabel>Favourite</FormLabel>
                    <FavouriteDisplay
                        isFavourite={listData.isFavourite}
                        updateFavourite={(isFavourite) => updateListData({ 'isFavourite': isFavourite })}
                        size="huge"
                        style={{ marginLeft: '4px' }}
                    />
                </div>
                <ImageSelector
                    currentUrl={listData.imageUrl}
                    onUpdate={(imageUrl) => updateListData({ 'imageUrl': imageUrl })}
                />
                <ButtonPair
                    saveLabel={isNew ? SAVE_BUTTON_NEW_LIST : SAVE_BUTTON_EDIT_LIST}
                    isSaveDisabled={!listData.name?.length}
                    onSave={handleSubmit}
                    onCancel={handleModalClose}
                />
            </Form>
        </Modal>
    )
}

export default ListFormModal;