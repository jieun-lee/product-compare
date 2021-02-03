import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { fetchItems, deleteItem } from '../../data/redux/actions/items';
import { getUser } from '../../data/redux/selectors/user';
import { getItems } from '../../data/redux/selectors/items';
import CardSection from '../../components/cardSection';
import { getListById } from '../../data/redux/selectors/lists';
import EditItemModal from '../../components/modal/editItem';

export const ListPage = () => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const items = useSelector(getItems);
    
    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch, listId]);

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
            <EditItemModal isNew={true} listId={listId} title="Create New Item">
                <Button style={{ marginLeft: '12px', marginBottom: '24px' }}>
                    Add New Item
                </Button>
            </EditItemModal>
            <CardSection
                data={items}
                dataType="Item"
                onEdit={(id) => console.log(`editing item with id ${id}`)}
                onDelete={(id) => dispatch(deleteItem(id))}
            />
        </div>
    );
}