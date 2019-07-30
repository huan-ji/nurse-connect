import React, { Component } from 'react';
import { Content, Text } from 'native-base';
import Post from './Post.js'

export default ({ posts, addLike, addNewComment }) => {
  return (
    <Content>
      {Object.keys(posts).map((id) => {
        const post = posts[id];

        return (
          <Post
            key={id}
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
            post={post}
          />
        );
      })}
    </Content>
  );
};
