import React from 'react';
import { Modal, Image, Icon } from 'semantic-ui-react';
import FavouriteDisplay from '../../ratingDisplay/favourite';
import RatingDisplay from '../../ratingDisplay/rating';
import { COLORS } from '../../../util/const';
import ArrowPair from '../../arrowPair';

/**
 * Modal for Viewing a List Item
 * @param {boolean} isModalOpen
 * @param {function} closeModal () => void
 * @param {Item} itemDetails
 * @param {function} toggleFavourite (isFavourite: boolean) => void
 * @param {function} changeRating (rating: number) => void
 */
const ItemViewModal = (props) => {
    const { isModalOpen, closeModal, itemDetails, toggleFavourite, changeRating } = props;

    // cannot show the modal without an item selected
    if (!itemDetails) return null;

    const { name, price, imageUrl, description, isFavourite, rating } = itemDetails;

    return (
        <Modal
            size="tiny"
            open={isModalOpen}
            onClose={closeModal}
            style={{ padding: '24px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex' }}>
                    <FavouriteDisplay
                        isFavourite={isFavourite}
                        updateFavourite={toggleFavourite}
                        style={{ marginTop: '4px', marginLeft: '-5px' }}
                    />
                    <div style={{ marginLeft: '8px' }}>
                        <h2 style={{ marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                            {name}
                            <Icon
                                name="pencil"
                                size="small"
                                style={{ marginLeft: '2px', cursor: 'pointer' }}
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
            </div>
            <div>
                {!!imageUrl?.length && (
                    <Image
                        src={imageUrl}
                        style={{ height: '200px', objectFit: 'scale-down', margin: 'auto' }}
                    />
                )}
                <div>{description}</div>
            </div>
            <div style={{ position: 'absolute', width: '100%', marginLeft: '-24px', bottom: '-36px' }}>
                <ArrowPair
                    style={{ textAlign: 'right' }}
                />
            </div>
        </Modal>
    )
}

export default ItemViewModal;