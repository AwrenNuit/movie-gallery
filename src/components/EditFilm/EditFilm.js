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
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState(this.props.reduxState[0]);
    }
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
  handleClickSave = (title) => {
    this.props.dispatch({type: `EDIT_FILM`, payload: this.state});
    this.props.history.push('/details/'+title);
  }

  // Dispatch film ID to saga for DELETE
  sendDeleteRequestToSaga = (id) => {
    console.log('in send delete request client with:', id);
    this.props.dispatch({type: `DELETE_FILM`, payload: id});
  }

  render(){
    return(
      <div>
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
            </div>
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