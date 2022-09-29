import React from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import AddPost from './components/AddPost';

import axios from 'axios';
class App extends React.Component {

  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:4000/posts')
      .then(res => this.setState({ posts: res.data }));
  }

  addpost =  (body, title) =>{

   axios.post('http://localhost:4000/posts',{
   body,
   title,
   })
   .then(res => this.setState({ posts: 
    [...this.state.posts, res.data]}));
  };

 

  render() {
    return (
      <div class="jumbotron jumbotron-fluid">
      <div class="container">
       <AddPost addpost={this.addpost}/>
        <Posts  posts = {this.state.posts} />
      </div>  
      </div>
    );
  }
}

export default App;
