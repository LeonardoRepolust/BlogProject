import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import axios from 'axios';
/* import Comments from './Comments' ; */

import { BrowserRouter as Router , Route, Link, IndexRoute, Switch} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export class PostItem extends React.Component {
	
	state ={
		users : [],
		name : "",
		modal: false
	};
	toggle = () =>{
		this.setState({modal : !this.state.modal})
	}

	componentDidMount() {
    axios
      .get('http://localhost:4000/posts')
      .then(res => this.setState({ users: res.data }));
  }

	render() {
		 const {userId, id, title, body} = this.props.post;
		 this.state.users.map((user) => {
  		if(user.id === userId)
  		{
  			this.state.name = user.name;
  		}

  	});
		return (
			<Router>
		  <div class="card border-primary mb-3" style={{width: '40rem' , margin: 'auto'}}>
			  <div class="card-header">{this.state.name}
			  <button type="button" onClick={this.props.delPost.bind(this,id)} class="btn btn-outline-danger" style={{float: 'right'}}>Delete</button>
			  </div>
			    <div class="card-body">
			     <h4 class="card-title">{title}</h4>
			    <p class="card-text">{body}</p>	
			   
			  {/*   <a href="#" onClick={this.toggle}>Comments</a>
     			 <Modal isOpen={this.state.modal} toggle={this.toggle} >
       			 <ModalHeader toggle={this.toggle}>Comments</ModalHeader>
        		<ModalBody>
        		<Comments postId={id} /> */}
        		{/* </ModalBody>
        		      </Modal> */}
			    
			    		  
		  </div>
		  </div>	
		  </Router>		
		);
	}
}


export default PostItem;