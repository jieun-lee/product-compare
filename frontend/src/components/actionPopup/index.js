import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Icon, Popup, Label } from 'semantic-ui-react';

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
 * @param {boolean} isArchived? whether item is archived
 * @param {function} toggleArchived? (isArchived: boolean) => void
 * @param {function} onEdit? () => void
 * @param {function} onDelete? () => void
 */
const ActionPopup = (props) => {
    const { direction = 'horizontal', size, isArchived, toggleArchived, onEdit, onDelete } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = useCallback((event) => {
        event.stopPropagation();
        setIsOpen(false);
        onEdit();
    }, [onEdit]);

    const handleArchive = useCallback((event) => {
        event.stopPropagation();
        setIsOpen(false);
        toggleArchived(!isArchived);
    }, [toggleArchived, isArchived]);

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
                    style={{ float: 'right', margin: 0, marginTop: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}
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
                    <ActionIcon name="edit" size="large" onClick={handleEdit} style={{ marginLeft: '2px', marginRight: '8px' }} />
                )}
                {toggleArchived && (
                    isArchived
                    ? <ActionIcon name="caret square up" size="large" onClick={handleArchive} style={{ marginRight: '10px' }} />
                    : <ActionIcon name="archive" size="large" onClick={handleArchive} style={{ marginRight: '10px' }} />
                )}
                {onDelete && (
                    <ActionIcon name="trash alternate" size="large" onClick={handleDelete} />
                )}
            </div>
        </Popup>
    );
}

export default ActionPopup;