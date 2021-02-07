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
import ItemViewModal from '../../components/modal/itemView';

export const ListPage = () => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const items = useSelector(getItems);

    const [isEditing, setIsEditing] = useState(false); // if the modal for create/edit is open
    const [isViewing, setIsViewing] = useState(false); // if modal for view is open
    const [selectedItemId, setSelectedItemId] = useState('');
    const selectedItem = useSelector((state) => getItemById(state, selectedItemId));
    
    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch, listId]);

    const onBackClicked = useCallback(() => {
        history.push('/lists');
    }, [history]);

    const handleEditItem = useCallback((id) => {
        setSelectedItemId(id);
        setIsViewing(false);
        setIsEditing(true);
    }, []);

    const stopEditing = useCallback(() => {
        setIsEditing(false);
        setSelectedItemId('');
    }, []);

    const handleViewItem = useCallback((id) => {
        setSelectedItemId(id);
        setIsEditing(false);
        setIsViewing(true);
    }, []);

    const stopViewing = useCallback(() => {
        setIsViewing(false);
        setSelectedItemId('');
    }, []);

    const toggleItemFavourite = useCallback((id, isFavourite) => {
        dispatch(updateItem(id, { isFavourite: isFavourite }));
    }, [dispatch]);

    const changeItemRating = useCallback((id, rating) => {
        dispatch(updateItem(id, { rating: rating }));
    }, [dispatch]);

    const handleDeleteItem = useCallback((id) => {
        setIsViewing(false);
        setIsEditing(false);
        dispatch(deleteItem(id));
    }, [dispatch]);

    return (!user) ? <Redirect to="/login" /> : (!list) ? <Redirect to="/lists" /> : (
        <div style={{ padding: '12px' }}>
            <ItemFormModal
                isNew={!selectedItemId}
                isModalOpen={isEditing}
                closeModal={stopEditing}
                listId={listId}
                itemId={selectedItemId}
                savedItem={selectedItem}
            />
            <ItemViewModal
                isModalOpen={isViewing}
                closeModal={stopViewing}
                itemDetails={selectedItem}
                toggleFavourite={(isFavourite) => toggleItemFavourite(selectedItemId, isFavourite)}
                changeRating={(rating) => changeItemRating(selectedItemId, rating)}
                onEdit={() => handleEditItem(selectedItemId)}
                onDelete={() => handleDeleteItem(selectedItemId)}
            />
            <h2 style={{ margin: '12px' }}>
                <Icon
                    name='arrow alternate circle left outline'
                    onClick={onBackClicked}
                    style={{ cursor: 'pointer' }}
                />
                {list.name}
            </h2>
            <Button onClick={() => setIsEditing(true)} style={{ marginLeft: '12px', marginBottom: '24px' }}>
                Add New Item
            </Button>
            <CardSection
                data={items}
                dataType="Item"
                onClick={(id) => handleViewItem(id)}
                onEdit={(id) => handleEditItem(id)}
                onDelete={handleDeleteItem}
                toggleFavourite={toggleItemFavourite}
                changeRating={changeItemRating}
            />
        </div>
    );
}