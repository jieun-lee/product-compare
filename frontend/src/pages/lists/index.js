import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../data/redux/selectors/user';
import { getLists } from '../../data/redux/selectors/lists';
import { fetchLists, deleteList } from '../../data/redux/actions/lists';
import { Button } from 'semantic-ui-react';
import CardSection from '../../components/cardSection';
import EditListModal from '../../components/modal/editList';

export const ListsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const lists = useSelector(getLists);

    useEffect(() => {
        if (user?._id) dispatch(fetchLists(user._id));
    }, [dispatch, user]);

    return (!user) ? <Redirect to="/login" /> : (
        <div style={{ padding: '12px' }}>
            <h2 style={{ margin: '12px' }}>My Lists</h2>
            <EditListModal isNew={true} user={user} title="Create New List">
                <Button style={{ marginLeft: '12px', marginBottom: '24px' }}>
                    Add New List
                </Button>
            </EditListModal>
            <CardSection
                data={lists}
                dataType="List"
                onClick={(id) => history.push(`/list/${id}`)}
                onEdit={(id) => console.log(`editing list with id ${id}`)}
                onDelete={(id) => dispatch(deleteList(id))}
            />
        </div>
    );
}