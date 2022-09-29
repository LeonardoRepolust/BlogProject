import React from 'react';
import PostItem from './PostItem.js';
import  PropTypes from 'prop-types';

export class Posts extends React.Component {
	render() {
		
		return this.props.posts.map((post) => (
				<PostItem key={post.id} post ={post} delPost={this.props.delPost} />
					))
			}
	}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
}
export default Posts;