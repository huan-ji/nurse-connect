import React from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import Comments from './Comments';
import Post from './Post';

class PostWithComments extends Component {
  componentWillMount() {
    const { getComments, currentPost } = this.props;
    getComments(currentPost);
  }

  render() {
    const {
      currentPost, posts, addComment, addLike, comments
    } = this.props;
    const post = posts[currentPost];

    return (
      <Container>
        <Content padder>
          <Post
            key={currentPost}
            id={currentPost}
            post={post}
            addComment={addComment}
            addLike={addLike}
            {...post}
            details
          />
          {
            Object.keys(comments).length
              ? (
                <Comments
                  comments={comments}
                  topLevelCommentIds={post.topLevelCommentIds}
                  addComment={addComment}
                  postId={currentPost}
                />
              ) : undefined
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts || {},
  comments: state.comments.comments || {},
  currentPost: state.posts.currentPost,
});

const mapDispatchToProps = dispatch => ({
  getPosts: dispatch.posts.getPosts,
  createPost: dispatch.posts.createPost,
  addLike: dispatch.posts.createLike,
  addComment: dispatch.comments.createComment,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostWithComments);
