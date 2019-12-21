import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class EditFilm extends Component{

  state = {

  }

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id});
    this.setState(this.props.reduxState[0]); // DOES NOT RUN
  }

  // Return to film list page
  goBack = () => {
    this.props.history.push(`/`);
  }

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    })
  }

  // Open confirmation dialog, if YES delete film and return to main film list page
  handleClickDelete = (id) => {
    let popup = window.confirm(`Are you sure you want to delete ${this.state.title}?`);
    if(popup){
      this.sendDeleteRequestToSaga(id);
      this.goBack();
    }
  }

  // Dispatch state to saga for PUT
  handleClickSave = () => {
    this.props.dispatch({type: `EDIT_FILM`, payload: this.state});
  }

  // Dispatch film ID to saga for DELETE
  sendDeleteRequestToSaga = (id) => {
    console.log('in send delete request client with:', id);
    this.props.dispatch({type: `DELETE_FILM`, payload: id});
  }

  render(){
    return(
      <div className="main-edit-div">
        {JSON.stringify(this.state)}
        {this.props.reduxState.map((film, i)=>
          <div key={i}>
            <input type="text" onChange={(event)=>this.handleChange(event, 'title')} value={this.state.title} />
            <input type="text" onChange={(event)=>this.handleChange(event, 'name')} value={this.state.name} />
            <input type="text" onChange={(event)=>this.handleChange(event, 'poster')} value={this.state.poster} />
            <textarea rows="6" cols="30" onChange={(event)=>this.handleChange(event, 'description')} value={this.state.description}></textarea>
            <Link to={"/details/"+film.movie_id}>
              <button>CANCEL</button>
            </Link>
            <Link to={"/details/"+film.movie_id}>
              <button onClick={this.handleClickSave}>SAVE</button>
            </Link>
            <button className="delete-btn" onClick={()=>this.handleClickDelete(film.movie_id)}>DELETE</button>
          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer
});

export default connect(putReduxStateOnProps)(EditFilm);