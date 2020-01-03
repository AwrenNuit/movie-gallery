import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class EditFilm extends Component{

  state = {
    movie_id: '',
    title: '',
    poster: '',
    description: '',
    genres: '',
    junction: {
      movie_id: '',
      genre_id: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id});
    this.props.dispatch({type: `GET_GENRE`});
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState(this.props.reduxState[0]);
      this.props.dispatch({type: `GET_GENRE`});
    }
  }

  // Clear junction state
  clearJunctionState = () => {
    this.setState({
      junction: {
        movie_id: '',
        genre_id: ''
      }
    })
  }

  // Return to main film list page
  goBack = () => {
    this.props.history.push(`/`);
  }

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    });
  }

  // Add genre to selected film
  handleClickAddGenre = () => {
    this.props.dispatch({type: `POST_JUNCTION`, payload: this.state.junction});
    this.clearJunctionState();
    alert(`Genre added to film!`);
  }

  // Open confirmation dialog, if YES delete film and return to main film list page
  handleClickDelete = (id) => {
    let popup = window.confirm(`Are you sure you want to delete ${this.state.title}?`);
    if(popup){
      this.sendDeleteRequestToSaga(id);
      this.goBack();
    }
  }

  // Remove genre from selected film
  handleClickRemoveGenre = () => {
    this.props.dispatch({type: `DELETE_JUNCTION`, payload: this.state.junction});
    this.clearJunctionState();
    alert(`Genre removed from film!`);
  }

  // Dispatch state to saga for PUT
  handleClickSave = (title) => {
    this.props.dispatch({type: `EDIT_FILM`, payload: this.state});
    this.props.history.push('/details/'+title);
  }

  // Set junction state to input value
  handleJunctionChange = (event) => {
    this.setState({
      junction: {
        movie_id: this.state.movie_id,
        genre_id: event.target.value
      }
    });
  }

  // Dispatch film ID to saga for DELETE
  sendDeleteRequestToSaga = (id) => {
    console.log('in send delete request client with:', id);
    this.props.dispatch({type: `DELETE_FILM`, payload: id});
  }

  render(){
    return(
      <div>
        {JSON.stringify(this.state)}
        {this.props.reduxState.map((film, i)=>
          <div key={i}>

            <div className="nav-btn-div">

              <Fab onClick={()=>this.handleClickDelete(film.movie_id)} color="default" aria-label="delete" 
                style={{display:"inline-block", marginRight:"20px"}}>
                <DeleteForeverIcon />
              </Fab>

              <Link to={"/details/"+film.title}>
                <Fab color="secondary" aria-label="cancel" 
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <CloseIcon />
                </Fab>
              </Link>

              <Fab onClick={()=>this.handleClickSave(film.title)} color="primary" aria-label="save" 
                style={{display:"inline-block", marginRight:"20px"}}>
                <CheckIcon />
              </Fab>
            </div>

            <h2>Edit Film</h2>

            <div className="input-div-box">
              <TextField id="standard-basic" 
                style={{marginRight:"50px"}}
                label="film title"
                onChange={(event)=>this.handleChange(event, 'title')}
                value={this.state.title || ''}/>

              <TextField id="standard-basic" 
                style={{marginRight:"50px"}}
                label="film poster"
                onChange={(event)=>this.handleChange(event, 'poster')}
                value={this.state.poster || ''}/>

              <TextField id="standard-basic" 
                style={{marginRight:"50px", width:"300px"}}
                label="film description"
                onChange={(event)=>this.handleChange(event, 'description')}
                value={this.state.description || ''}
                multiline/>

              <div>
                <p>film genres</p>
                <p>{this.props.reduxState.map(genre => 
                      <span key={genre.genres}>{genre.genres.join(', ')}</span>
                  )}</p>
                <TextField
                  id="standard-select"
                  style={{width: "200px", marginRight:"50px"}}
                  select
                  label="add or remove a genre"
                  value={this.state.junction.genre_id}
                  onChange={(event)=>this.handleJunctionChange(event)}>

                  {this.props.genre.map((genre, i)=>
                    <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                  )}
                </TextField>

                <Fab onClick={()=>this.handleClickRemoveGenre(film.title)} color="secondary" aria-label="remove" 
                  size="small"
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <CloseIcon />
                </Fab>

                <Fab onClick={()=>this.handleClickAddGenre(film.title)} color="primary" aria-label="add" 
                  size="small"
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <AddIcon />
                </Fab>
        
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer,
  genre: reduxState.genreReducer
});

export default connect(putReduxStateOnProps)(EditFilm);