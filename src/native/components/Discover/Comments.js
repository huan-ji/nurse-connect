import React from 'react';
import { View, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

const styles = {
  comment: {
    marginLeft: 15,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    borderLeftWidth: 1,
    borderLeftColor: 'lightgrey',
    borderStyle: 'solid',
    position: 'relative',
  },
  replyButton: {
    position: 'absolute',
    right: 10,
  },
};

const Comment = ({ comment, children, addNewComment, id, postId }) => {
  return (
    <View style={styles.comment}>
      <Text>{comment.text}</Text>
      <Text note>{comment.author}</Text>
      <View style={styles.replyButton}>
        <Button
          transparent
          onPress={() => Actions.addNewComment({
            postId,
            parentId: id,
            topLevelComment: false,
            postTitle: comment.text,
            onFormSubmit: addNewComment,
          })}
        >
          <Icon name="undo" />
        </Button>
      </View>
      {children}
    </View>
  );
};

const Comments = ({ comments, topLevelCommentIds, addNewComment, postId }) => {
  const renderComment = (id) => {
    const comment = comments[id];
    const replyIds = comment.replies;

    if (replyIds.length === 0) return <Comment comment={comment} key={id} id={id} postId={postId} addNewComment={addNewComment} />;

    return (
      <Comment comment={comment} key={id} id={id} postId={postId} addNewComment={addNewComment}>
        {replyIds.sort().reverse().map((childId) => {
          return renderComment(childId);
        })}
      </Comment>
    );
  };

  return (
    <View>
      {topLevelCommentIds.sort().reverse().map(id => renderComment(id))}
    </View>
  );
};

export default Comments;
