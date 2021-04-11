import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../data/redux/selectors/user';
import { getListById, getLists } from '../../data/redux/selectors/lists';
import { fetchLists, deleteList, updateList } from '../../data/redux/actions/lists';
import { clearItems } from '../../data/redux/actions/items';
import { Button, Sidebar } from 'semantic-ui-react';
import CardSection from '../../components/cardSection';
import ListFormModal from '../../components/modal/listForm';
import ArchivedAccordion from '../../components/archived/accordion';
import ListsSidebarWrapper from '../../components/sidebar/lists';

export const ListsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(getUser);
    const allLists = useSelector(getLists);
    const [mainLists, setMainLists] = useState([]);
    const [archivedLists, setArchivedLists] = useState([]);

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState('');
    const selectedList = useSelector((state) => getListById(state, selectedListId));

    useEffect(() => {
        dispatch(clearItems);
    }, [dispatch]);

    useEffect(() => {
        if (user?._id) dispatch(fetchLists(user._id));
    }, [dispatch, user]);

    useEffect(() => {
        const main = [];
        const archived = [];
        Object.keys(allLists).map((i) => {
            if (allLists[i].isArchived) {
                archived.push(allLists[i]);
            } else {
                main.push(allLists[i]);
            }
        });
        setMainLists(main);
        setArchivedLists(archived);
    }, [allLists]);

    const handleEditList = useCallback((id) => {
        setSelectedListId(id);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedListId('');
    }, []);

    return (!user) ? <Redirect to="/login" /> : (
        <ListsSidebarWrapper isVisible={isSidebarVisible} setIsVisible={setIsSidebarVisible}>
            <div style={{ padding: '12px' }}>
                <ListFormModal
                    isNew={!selectedListId}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    user={user}
                    listId={selectedListId}
                    savedList={selectedList}
                />
                <h2 style={{ margin: '12px' }}>My Lists</h2>
                    <Button onClick={() => setIsModalOpen(true)} style={{ marginLeft: '12px', marginBottom: '24px' }}>
                        Add New List
                    </Button>
                <CardSection
                    data={mainLists}
                    onClick={(id) => history.push(`/list/${id}`)}
                    onEdit={(id) => handleEditList(id)}
                    toggleArchived={(id, isArchived) => dispatch(updateList(id, { isArchived }))}
                    onDelete={(id) => dispatch(deleteList(id))}
                    toggleFavourite={(id, isFavourite) => dispatch(updateList(id, { isFavourite }))}
                />
                {archivedLists.length > 0 && (
                    <ArchivedAccordion>
                        <CardSection
                            data={archivedLists}
                            onClick={(id) => history.push(`/list/${id}`)}
                            onEdit={(id) => handleEditList(id)}
                            toggleArchived={(id, isArchived) => dispatch(updateList(id, { isArchived }))}
                            onDelete={(id) => dispatch(deleteList(id))}
                            toggleFavourite={(id, isFavourite) => dispatch(updateList(id, { isFavourite }))}
                        />
                    </ArchivedAccordion>
                )}
            </div>
        </ ListsSidebarWrapper>
    );
}