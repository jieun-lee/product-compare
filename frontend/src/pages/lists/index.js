import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../data/redux/selectors/user';
import { getLists } from '../../data/redux/selectors/lists';
import { createList, fetchLists } from '../../data/redux/actions/lists';
import { Form } from 'semantic-ui-react';

export const ListsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const lists = useSelector(getLists);
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
        }
    }, [listData, user]);

    if (!user) {
        return <div>Log in to view your lists</div>
    } else {
        return (
            <div>
                <h2>Lists Page</h2>
                {Object.keys(lists).map((id) => (
                    <div key={id}>
                        <h3 onClick={() => history.push(`/list/${id}`)}>{lists[id].name}</h3>
                    </div>
                ))}
                <Form onSubmit={handleSubmit} style={{ width: '300px', marginTop: '24px' }}>
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
            </div>
        );
    }
}