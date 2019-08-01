import React from 'react';
import {
  View, Text, Button, Icon,
} from 'native-base';
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

const Comment = ({
  comment, children, addComment, id, postId
}) => {
  return (
    <View style={styles.comment}>
      <Text>{comment.text}</Text>
      <Text note>{comment.author}</Text>
      <View style={styles.replyButton}>
        <Button
          transparent
          onPress={() => Actions.addComment({
            postId,
            parentId: id,
            topLevelComment: false,
            postTitle: comment.text,
            onFormSubmit: addComment,
          })}
        >
          <Icon name="undo" />
        </Button>
      </View>
      {children}
    </View>
  );
};

const Comments = ({
  comments, topLevelCommentIds, addComment, postId
}) => {
  const renderComment = (id) => {
    const comment = comments[id];
    const replyIds = Object.values(comment.replies);

    if (replyIds.length === 0) {
      return <Comment comment={comment} key={id} id={id} postId={postId} addComment={addComment} />;
    }

    return (
      <Comment comment={comment} key={id} id={id} postId={postId} addComment={addComment}>
        {replyIds.sort().reverse().map((childId) => {
          return renderComment(childId);
        })}
      </Comment>
    );
  };

  return (
    <View>
      {Object.values(topLevelCommentIds).sort().reverse().map(id => renderComment(id))}
    </View>
  );
};

export default Comments;
