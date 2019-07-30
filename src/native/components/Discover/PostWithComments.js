import React from 'react';
import { Container, Content } from 'native-base';

import Comments from './Comments';
import Post from './Post';

const PostWithComments = ({
  post,
  addLike,
  id,
  addNewComment,
}) => {
  console.log(post);
  return (
    <Container>
      <Content padder>
        <Post
          id={id}
          title={post.title}
          text={post.text}
          author={post.author}
          specialty={post.specialty}
          imageUrl={post.imageUrl}
          likes={post.likes || 0}
          addLike={() => addLike(id)}
          commentCount={Object.keys(post.comments).length}
          comments={post.comments}
          topLevelCommentIds={post.topLevelCommentIds}
          addNewComment={addNewComment}
          details
        />
        {
          !!Object.keys(post.comments).length
          && <Comments
            comments={post.comments}
            topLevelCommentIds={post.topLevelCommentIds}
            addNewComment={addNewComment}
            postId={id}
          />
        }
      </Content>
    </Container>
  );
};

export default PostWithComments;
