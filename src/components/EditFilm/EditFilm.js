import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    })
  }

  // Open confirmation dialog, if YES delete film and return to main film list page
  handleClickDelete = (id) => {
    this.handleClickOpen();
    // if(popup){
    //   this.sendDeleteRequestToSaga(id);
    //   this.goBack();
    // }
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

            <div className="nav-btn-div">
              <Link to={"/details/"+film.movie_id}>
                <Fab color="secondary" aria-label="cancel" 
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <CloseIcon />
                </Fab>
              </Link>

              <Link to={"/details/"+film.movie_id}>
                <Fab onClick={()=>this.handleClickDelete(film.movie_id)} color="secondary" aria-label="delete" 
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <DeleteForeverIcon />
                </Fab>
              </Link>

      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently remove ${this.state.title} from your library?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            No
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>






              <Link to={"/details/"+film.movie_id}>
                <Fab onClick={this.handleClickSave} color="primary" aria-label="save" 
                  style={{display:"inline-block", marginRight:"20px"}}>
                  <CheckIcon />
                </Fab>
              </Link>
            </div>

            <h2>Edit Film</h2>

            <TextField id="standard-basic" 
              style={{marginRight:"50px"}}
              onChange={(event)=>this.handleFilmChange(event, 'title')}
              value={this.state.title}/>

            <TextField id="standard-basic" 
              style={{marginRight:"50px"}}
              onChange={(event)=>this.handleFilmChange(event, 'poster')}
              value={this.state.poster}/>

            <TextField id="standard-basic" 
              style={{marginRight:"50px", width:"300px"}}
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