import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';

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
        {this.props.reduxState.map((film, i)=>
          <div key={i}>

            <Link to={"/details/"+film.movie_id}>
              <Fab color="secondary" aria-label="cancel">
                <CloseIcon />
              </Fab>
            </Link>

            <Link to={"/details/"+film.movie_id}>
              <Fab onClick={this.handleClickSave} color="primary" aria-label="save">
                <CheckIcon />
              </Fab>
            </Link>

            <Link to={"/details/"+film.movie_id}>
              <Fab onClick={()=>this.handleClickDelete(film.movie_id)} color="secondary" aria-label="delete">
                <DeleteForeverIcon />
              </Fab>
            </Link>

            <br />
            <br />

            <TextField id="standard-basic" 
              className="inputs"
              onChange={(event)=>this.handleFilmChange(event, 'title')}
              value={this.state.title}/>

            <TextField id="standard-basic" 
              className="inputs"
              onChange={(event)=>this.handleFilmChange(event, 'poster')}
              value={this.state.poster}/>

            <TextField id="standard-basic" 
              className="inputs multiline-in"
              onChange={(event)=>this.handleFilmChange(event, 'description')}
              value={this.state.description}
              multiline/>

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