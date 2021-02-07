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
 * @param {Direction} direction? direction of icon
 * @param {Size} size? size of icon
 * @param {function} onEdit?
 * @param {function} onDelete?
 */
const CardMenu = (props) => {
    const { itemType, direction = 'horizontal', size, onEdit, onDelete } = props;

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
        // TODO: close popup when we click edit
        // TODO: add confirmation for delete
        <Popup
            size="small"
            // TODO: make trigger region larger
            trigger={(
                <Icon
                    size={size}
                    onClick={(e) => e.stopPropagation()}
                    name={`ellipsis ${direction}`}
                    style={{ float: 'right', margin: 0, marginTop: '2px', cursor: 'pointer' }}
                />
            )}
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