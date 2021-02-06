import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { createList, updateList } from '../../../data/redux/actions/lists';
import ImageSelector from '../../imageSelector';

const TITLE_NEW_LIST = "Create a New List";
const TITLE_EDIT_LIST = "Edit List";

const blankListData = {
    name: '',
    imageUrl: '',
    description: '',
    isFavourite: false
};

const extractListData = (rawData) => ({
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
        if (savedList) setListData(extractListData(savedList));
    }, [savedList]);

    const updateListData = useCallback((update) => {
        setListData((state) => ({ ...state, ...update }));
    }, []);

    const toggleFavourite = useCallback(() => {
        setListData((state) => ({ ...state, isFavourite: !state.isFavourite }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (!user) {
            alert('Please login and try again');
        } else {
            if (isNew) {
                dispatch(createList({ ...listData, userId: user._id }));
            } else {
                if (!!listId) dispatch(updateList(listId, listData));
            }
            setListData(blankListData); // reset form
            closeModal();
        }
    }, [dispatch, closeModal, isNew, listData, user, listId]);

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={closeModal}
            style={{ padding: '24px' }}
        >
            <h3>{isNew ? TITLE_NEW_LIST : TITLE_EDIT_LIST }</h3>
            <Form>
                <Form.Input
                    placeholder="List Name"
                    value={listData.name}
                    onChange={(e) => updateListData({ 'name': e.target.value })}
                />
                <Form.Input
                    placeholder="Description"
                    value={listData.description}
                    onChange={(e) => updateListData({ 'description': e.target.value })}
                />
                <Form.Checkbox
                    label="Favourite List"
                    checked={listData.isFavourite}
                    onChange={() => toggleFavourite()}
                />
                <ImageSelector
                    currentUrl={listData.imageUrl}
                    onUpdate={(imageUrl) => updateListData({ 'imageUrl': imageUrl })}
                />
                <Form.Button content="Create" primary onClick={handleSubmit} />
            </Form>
        </Modal>
    )
}

export default ListFormModal;