import React, { useEffect, useCallback, useState } from 'react';
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
import ArchivedAccordion from '../../components/archived/accordion';
import ArchivedTag from '../../components/archived/tag';
import ListSidebarWrapper from '../../components/sidebar/list';

export const ListPage = () => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(getUser);
    const list = useSelector((state) => getListById(state, listId));
    const allItems = useSelector(getItems);
    const [mainItems, setMainItems] = useState([]);
    const [archivedItems, setArchivedItems] = useState([]);
    const [orderedItemKeys, setOrderedItemKeys] = useState([]);

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // if the modal for create/edit is open
    const [isViewing, setIsViewing] = useState(false); // if modal for view is open
    const [selectedItemId, setSelectedItemId] = useState('');
    const selectedItem = useSelector((state) => getItemById(state, selectedItemId));
    
    useEffect(() => {
        dispatch(fetchItems(listId));
    }, [dispatch, listId]);

    useEffect(() => {
        const main = [];
        const archived = [];
        Object.keys(allItems).map((i) => {
            if (allItems[i].isArchived) {
                archived.push(allItems[i]);
            } else {
                main.push(allItems[i]);
            }
        });
        setMainItems(main);
        setArchivedItems(archived);
        // TODO: update items based on this order, also need to handle order with archived
        if (allItems) setOrderedItemKeys(Object.keys(allItems));
    }, [allItems]);

    const backToLists = useCallback(() => {
        history.push('/lists');
    }, [history]);

    const onNextSelectedItem = useCallback((isNext) => {
        if (!orderedItemKeys || !selectedItemId) return;
        const currIndex = orderedItemKeys.findIndex((element) => element === selectedItemId);
        const numItems = orderedItemKeys.length;
        const newIndex = isNext ? ((currIndex + 1) % numItems) : ((currIndex - 1 + numItems) % numItems);
        setSelectedItemId(orderedItemKeys[newIndex]);
    }, [orderedItemKeys, selectedItemId]);

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

    const updateItemWithId = useCallback((id, update) => {
        dispatch(updateItem(id, update));
    }, [dispatch]);

    const handleDeleteItem = useCallback((id) => {
        setIsViewing(false);
        setIsEditing(false);
        dispatch(deleteItem(id));
    }, [dispatch]);

    return (!user) ? <Redirect to="/login" /> : (!list) ? <Redirect to="/lists" /> : (
        <ListSidebarWrapper isVisible={isSidebarVisible} setIsVisible={setIsSidebarVisible}>
            <div style={{ padding: '12px', minHeight: '100vh' }}>
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
                    onBackClicked={() => onNextSelectedItem(false)}
                    onNextClicked={() => onNextSelectedItem(true)}
                    toggleFavourite={(isFavourite) => updateItemWithId(selectedItemId, { isFavourite })}
                    changeRating={(rating) => updateItemWithId(selectedItemId, { rating })}
                    updateComments={(comments) => updateItemWithId(selectedItemId, { comments })}
                    onEdit={() => handleEditItem(selectedItemId)}
                    toggleArchived={(isArchived) => updateItemWithId(selectedItemId, { isArchived })}
                    onDelete={() => handleDeleteItem(selectedItemId)}
                />
                <h2 style={{ margin: '12px', display: 'flex', alignItems: 'center' }}>
                    <Icon
                        name='arrow alternate circle left outline'
                        onClick={backToLists}
                        style={{ cursor: 'pointer', marginTop: '-4px' }}
                    />
                    {list.name}
                    {list.isArchived && <ArchivedTag />}
                </h2>
                <Button onClick={() => setIsEditing(true)} style={{ marginLeft: '12px', marginBottom: '24px' }}>
                    Add New Item
                </Button>
                <CardSection
                    data={mainItems}
                    onClick={(id) => handleViewItem(id)}
                    onEdit={(id) => handleEditItem(id)}
                    toggleArchived={(id, isArchived) => updateItemWithId(id, { isArchived })}
                    onDelete={handleDeleteItem}
                    toggleFavourite={(id, isFavourite) => updateItemWithId(id, { isFavourite })}
                    changeRating={(id, rating) => updateItemWithId(id, { rating })}
                />
                {archivedItems.length > 0 && (
                    <ArchivedAccordion>
                        <CardSection
                            data={archivedItems}
                            onClick={(id) => handleViewItem(id)}
                            onEdit={(id) => handleEditItem(id)}
                            toggleArchived={(id, isArchived) => updateItemWithId(id, { isArchived })}
                            onDelete={handleDeleteItem}
                            toggleFavourite={(id, isFavourite) => updateItemWithId(id, { isFavourite })}
                            changeRating={(id, rating) => updateItemWithId(id, { rating })}
                        />
                    </ArchivedAccordion>
                )}
            </div>
        </ListSidebarWrapper>
    );
}