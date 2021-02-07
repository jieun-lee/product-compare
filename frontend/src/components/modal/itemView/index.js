import React from 'react';
import { Modal, Image, List } from 'semantic-ui-react';
import FavouriteDisplay from '../../ratingDisplay/favourite';
import RatingDisplay from '../../ratingDisplay/rating';
import { COLORS, SIZES, PADDING } from '../../../util/const';
import ArrowPair from '../../arrowPair';
import FormLabel from '../../text/formLabel';
import ActionPopup from '../../actionPopup';
import Comments from '../../comments';
import styled from 'styled-components';

const ItemViewModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: ${PADDING.MODAL_INNER_PADDING};
`;

const ItemViewModalContent = styled.div`
    overflow-y: auto;
    max-height: ${SIZES.MAX_VIEW_MODAL_HEIGHT};
    padding: ${PADDING.MODAL_INNER_PADDING};
`;

const ItemViewModalFooter = styled.div`
    position: absolute;
    width: 100%;
    margin-left: -12px;
    bottom: -36px;
`;

/**
 * Modal for Viewing a List Item
 * @param {boolean} isModalOpen
 * @param {function} closeModal () => void
 * @param {Item} itemDetails
 * @param {function} toggleFavourite (isFavourite: boolean) => void
 * @param {function} changeRating (rating: number) => void
 * @param {function} updateComments (comments: Comment[]) => void
 * @param {function} onEdit () => void
 * @param {function} onDelete () => void
 */
const ItemViewModal = (props) => {
    const {
        isModalOpen,
        closeModal,
        itemDetails,
        toggleFavourite,
        changeRating,
        updateComments,
        onEdit,
        onDelete
    } = props;

    // cannot show the modal without an item selected
    if (!itemDetails) return null;

    const { name, price, imageUrl, description, details = [], isFavourite, rating, comments = [] } = itemDetails;

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={closeModal}
            style={{ padding: PADDING.MODAL_OUTER_PADDING }}
        >
            <ItemViewModalHeader>
                <div style={{ display: 'flex' }}>
                    <FavouriteDisplay
                        isFavourite={isFavourite}
                        updateFavourite={toggleFavourite}
                        style={{ marginTop: '4px', marginLeft: '-5px' }}
                    />
                    <div style={{ marginLeft: '8px' }}>
                        <h2 style={{ marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '4px' }}>{name}</span>
                            <ActionPopup
                                direction="vertical"
                                size="small"
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </h2>
                        <RatingDisplay
                            rating={rating}
                            updateRating={changeRating}
                        />
                    </div>
                </div>
                {!!price && (
                    <h2 style={{ margin: 0, color: COLORS.PRICE }}>${price}</h2>
                )}
            </ItemViewModalHeader>
            <ItemViewModalContent>
                {!!imageUrl?.length && (
                    <Image
                        src={imageUrl}
                        style={{ height: '200px', objectFit: 'scale-down', margin: 'auto' }}
                    />
                )}
                <FormLabel style={{ fontSize: '16px', marginTop: '8px', marginBottom: '6px' }}>
                    {description}
                </FormLabel>
                <div>
                    <List bulleted>
                        {details.map((detail, index) => (
                            <List.Item key={index}>{detail}</List.Item>
                        ))}
                    </List>
                </div>
                <div>
                    <FormLabel style={{ fontSize: '16px', marginTop: '24px', marginBottom: 0 }}>Comments</FormLabel>
                    <Comments
                        comments={comments}
                        updateComments={updateComments}
                    />
                </div>
            </ItemViewModalContent>
            <ItemViewModalFooter>
                <ArrowPair
                    style={{ textAlign: 'right' }}
                />
            </ItemViewModalFooter>
        </Modal>
    )
}

export default ItemViewModal;