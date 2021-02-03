import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Icon, Popup, Divider } from 'semantic-ui-react';

const MenuItem = styled.div`
    text-align: center;
    cursor: pointer;
    width: 70px;

    &:hover {
        font-weight: 700;
    }
`;

/**
 * Ellipsis menu on cards
 * @param {string} itemType
 * @param {function} onEdit?
 * @param {function} onDelete?
 */
const CardMenu = (props) => {
    const { itemType, onEdit, onDelete } = props;

    const handleEdit = useCallback((event) => {
        event.stopPropagation();
        onEdit();
    }, [onEdit]);

    const handleDelete = useCallback((event) => {
        event.stopPropagation();
        onDelete();
    }, [onDelete]);

    if (!onEdit && !onDelete) return null;

    return (
        <Popup
            size="small"
            trigger={<Icon onClick={(e) => e.stopPropagation()} name="ellipsis horizontal" style={{ float: 'right', margin: 0, marginTop: '2px' }} />}
            on="click"
            position="right center"
        >
            <div>
                {onEdit && (
                    <MenuItem onClick={handleEdit}>Edit {itemType}</MenuItem>
                )}
                {onEdit && onDelete && (
                    <Divider style={{ margin: '8px', width: '100%', marginLeft: '-1px' }} />
                )}
                {onDelete && (
                    <MenuItem onClick={handleDelete}>Delete {itemType}</MenuItem>
                )}
            </div>
        </Popup>
    );
}

export default CardMenu;