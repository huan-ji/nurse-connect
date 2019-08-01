import React from 'react';
import { Container, Content } from 'native-base';

import Comments from './Comments';
import Post from './Post';

class PostWithComments extends Component {
  componentWillMount() {
    const { categoryId, getPosts } = this.props;
    getPosts(categoryId);
  }
  
  render() {
    const { posts, addComment, addLike } = this.props;
    
    return (
      <Container>
        <Content padder>
        <Post
          key={id}
          id={id}
          post={post}
          addComment={addComment}
          addLike={addLike}
          {...post}
          details
        />
          {
            !!Object.keys(post.comments).length
            && <Comments
              comments={post.comments}
              topLevelCommentIds={post.topLevelCommentIds}
              addNewComment={addComment}
              postId={id}
            />
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts || {},
});

const mapDispatchToProps = dispatch => ({
  getPosts: dispatch.posts.getPosts,
  createPost: dispatch.posts.createPost,
  addLike: dispatch.posts.createLike,
  addComment: dispatch.comments.createComment,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostWithComments);
