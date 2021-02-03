import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { fetchItems, deleteItem, updateItem } from '../../data/redux/actions/items';
import { getUser } from '../../data/redux/selectors/user';
import { getItemById, getItems } from '../../data/redux/selectors/items';
import CardSection from '../../components/cardSection';
import { getListById } from '../../data/redux/selectors/lists';
import ItemFormModal from '../../components/modal/itemForm';

export const ListPage = () => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const items = useSelector(getItems);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const selectedItem = useSelector((state) => getItemById(state, selectedItemId));
    
    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch, listId]);

    const handleEditItem = useCallback((id) => {
        setSelectedItemId(id);
        setIsModalOpen(true);
    }, []);

    const onBackClicked = useCallback(() => {
        history.push('/lists');
    }, [history]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedItemId('');
    }, []);

    return (!user) ? <Redirect to="/login" /> : (!list) ? <Redirect to="/lists" /> : (
        <div style={{ padding: '12px' }}>
            <ItemFormModal
                isNew={!selectedItemId}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                listId={listId}
                itemId={selectedItemId}
                savedItem={selectedItem}
            />
            <h2 style={{ margin: '12px' }}>
                <Icon
                    name='arrow alternate circle left outline'
                    onClick={onBackClicked}
                    style={{ cursor: 'pointer' }}
                />
                {list.name}
            </h2>
            <Button onClick={() => setIsModalOpen(true)} style={{ marginLeft: '12px', marginBottom: '24px' }}>
                Add New Item
            </Button>
            <CardSection
                data={items}
                dataType="Item"
                onEdit={(id) => handleEditItem(id)}
                onDelete={(id) => dispatch(deleteItem(id))}
                toggleFavourite={(id, isFavourite) => dispatch(updateItem(id, { isFavourite: isFavourite }))}
                changeRating={(id, rating) => dispatch(updateItem(id, { rating: rating }))}
            />
        </div>
    );
}