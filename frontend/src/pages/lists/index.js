import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../data/redux/selectors/user';
import { getLists } from '../../data/redux/selectors/lists';
import { createList, fetchLists } from '../../data/redux/actions/lists';
import { Form, Modal, Button } from 'semantic-ui-react';
import CardSection from '../../components/cardSection';

export const ListsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const lists = useSelector(getLists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listData, setListData] = useState({ name: '', description: '', isFavourite: false });

    useEffect(() => {
        if (user?._id) dispatch(fetchLists(user._id));
    }, [user]);

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
            setIsModalOpen(false);
        }
    }, [listData, user]);

    return (!user) ? <Redirect to="/login" /> : (
        <div style={{ padding: '12px' }}>
            <h2 style={{ margin: '12px' }}>My Lists</h2>
            <Modal
                size="tiny"
                onClose={() => setIsModalOpen(false)}
                onOpen={() => setIsModalOpen(true)}
                open={isModalOpen}
                trigger={<Button style={{ marginLeft: '12px', marginBottom: '24px' }}>Add New List</Button>}
                style={{ padding: '24px' }}
            >
                <h3>Create New List</h3>
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
            <CardSection
                data={lists}
                dataType="List"
                onClick={(id) => history.push(`/list/${id}`)}
                onEdit={(id) => console.log(`editing list with id ${id}`)}
                onDelete={(id) => console.log(`deleting list with id ${id}`)}
            />
        </div>
    );
}