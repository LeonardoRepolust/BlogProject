import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup } from 'reactstrap';
import {Card} from 'reactstrap';
	

class AddPost extends React.Component {
	state = {
		modal: false,
		title: '',
		body: ''		
	}

	toggle = () =>{
		this.setState({modal : !this.state.modal})
	}
	 onSubmit = (e) => {
	 	e.preventDefault();
    this.props.addpost(this.state.body, this.state.title);
    this.setState({ title: '', body: ''});
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render(){
		return (
			<div class="card border-primary mb-3" style={{width: '40rem' , margin: 'auto'}}>
      			<Button color="primary" onClick={this.toggle}>Create post</Button>
     			 <Modal isOpen={this.state.modal} toggle={this.toggle} >
       			 <ModalHeader toggle={this.toggle}>Create post:</ModalHeader>
        		<ModalBody>
        			 <Form onSubmit={this.onSubmit}>
        			  <FormGroup>
				       <input type="text" name="title" placeholder="Title ..." onChange={this.onChange} />
				      </FormGroup>

				       <FormGroup>
       				    <textarea  name="body" rows="5" cols="60" onChange={this.onChange} />
       				   </FormGroup>

       				   <FormGroup>
       				    <button type="submit" class="btn btn-primary" onClick={this.toggle}>Submit</button>
       				   </FormGroup>

       				 </Form>
       			</ModalBody>
      </Modal>
    </div>
			
		)
	}
}

export default AddPost
