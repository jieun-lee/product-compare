import React, { useCallback, useState } from 'react';
import { Button, Icon, Input, List } from 'semantic-ui-react';
import { COLORS } from '../../util/const';
import styled from 'styled-components';
import { formatDate } from '../../util';

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    cursor: pointer;
    color: ${COLORS.SECONDARY_TEXT};
`;

/**
 * Single Comment in the Comment List
 * @param {string} comment
 * @param {Date} date
 * @param {function} deleteComment () => void
 */
const Comment = (props) => {
    const { comment, date, deleteComment } = props;

    return (
        <List.Item style={{ padding: '8px 0', position: 'relative' }}>
            <div>{comment}</div>
            <div style={{ fontSize: '12px', fontStyle: 'italic', color: COLORS.SECONDARY_TEXT, }}>
                {formatDate(date)}
            </div>
            <CloseIcon name="close" onClick={deleteComment} />
        </List.Item>
    );
}

/**
 * Comments Section
 * @param {Comment[]} comments
 * @param {function} updateComments (comments) => void
 */
const Comments = (props) => {
    const { comments = [], updateComments } = props;
    const [newComment, setNewComment] = useState('');

    const addComment = useCallback(() => {
        const currDate = new Date();
        updateComments([...comments, { comment: newComment, date: currDate }]);
        setNewComment('');
    }, [comments, updateComments, newComment]);

    const deleteComment = useCallback((index) => {
        updateComments([...comments.slice(0, index), ...comments.slice(index+1)]);
    }, [updateComments, comments]);

    return (
        <div>
            <List celled style={{ margin: 0 }}>
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        comment={comment.comment}
                        date={comment.date}
                        deleteComment={() => deleteComment(index)}
                    />
                ))}
            </List>
            <div style={{ marginTop: '8px', display: 'flex' }}>
                <Input
                    placeholder = "Enter comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    size="small"
                    style={{ marginRight: '8px', flex: 1 }}
                />
                <Button size="small" style={{ margin: 0 }} onClick={addComment}>Comment</Button>
            </div>
        </div>
    );
}

export default Comments;