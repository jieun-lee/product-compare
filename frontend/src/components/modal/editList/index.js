import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { createList } from '../../../data/redux/actions/lists';

const blankListData = { name: '', description: '', isFavourite: false };

/**
 * Modal for Creating / Editing Lists
 * @param {boolean} isNew
 * @param {User} user
 * @param {string} title
 */
const EditListModal = (props) => {
    const { isNew, user, title } = props;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listData, setListData] = useState(blankListData);

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
            dispatch(createList({ ...listData, userId: user._id }));
            setListData(blankListData); // reset form
            setIsModalOpen(false);
        }
    }, [dispatch, listData, user]);

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
                <Form.Button content="Create" primary />
            </Form>
        </Modal>
    )
}

export default EditListModal;