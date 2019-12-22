import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class AddFilm extends Component{

  state = {
    title: '',
    poster: '',
    description: '',
    name: ''
  }

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    })
  }

  // Dispatch state to saga for POST
  handleClickAdd = () => {
    this.props.dispatch({type: `POST_FILM`, payload: this.state});
  }

  render(){
    return(
      <>
        <input type="text" onChange={(event)=>this.handleChange(event, 'title')} value={this.state.title} placeholder="film title" />
        <input type="text" onChange={(event)=>this.handleChange(event, 'name')} value={this.state.name} placeholder="genre" />
        <input type="text" onChange={(event)=>this.handleChange(event, 'poster')} value={this.state.poster} placeholder="https://movie.com/image.jpg" />
        <textarea rows="6" cols="30" onChange={(event)=>this.handleChange(event, 'description')} value={this.state.description} placeholder="film synopsis"></textarea>
        <Link to={"/"}>
          <button>CANCEL</button>
        </Link>
        <Link to={"/"}>
          <button onClick={this.handleClickAdd}>ADD</button>
        </Link>
      </>
    )
  }
}

export default connect()(AddFilm);