import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Icon, Popup } from 'semantic-ui-react';

const ActionIcon = styled(Icon)`
    &&& {
        cursor: pointer;
        margin: 0;
    }
`;

/**
 * Ellipsis menu with action menus in a popup
 * @param {Direction} direction? direction of icon
 * @param {Size} size? size of icon
 * @param {function} onEdit? () => void
 * @param {function} onArchive? () => void
 * @param {function} onDelete? () => void
 */
const ActionPopup = (props) => {
    const { direction = 'horizontal', size, onEdit, onArchive, onDelete } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = useCallback((event) => {
        event.stopPropagation();
        setIsOpen(false);
        onEdit();
    }, [onEdit]);

    const handleArchive = useCallback((event) => {
        event.stopPropagation();
        setIsOpen(false);
        onArchive();
    }, [onArchive]);

    const handleDelete = useCallback((event) => {
        event.stopPropagation();
        setIsOpen(false);
        onDelete();
    }, [onDelete]);

    if (!onEdit && !onDelete) return null;

    return (
        // TODO: add confirmation / notification for delete
        <Popup
            size="tiny"
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
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            position="right center"
        >
            <div>
                {onEdit && (
                    <ActionIcon name="edit" size="large" onClick={handleEdit} style={{ marginRight: '8px' }} />
                )}
                {onArchive && (
                    <ActionIcon name="archive" size="large" onClick={handleArchive} style={{ marginRight: '10px' }} />
                )}
                {onDelete && (
                    <ActionIcon name="trash alternate" size="large" onClick={handleDelete} />
                )}
            </div>
        </Popup>
    );
}

export default ActionPopup;