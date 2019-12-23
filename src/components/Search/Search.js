import React, {Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
// Components
import MainMap from '../MainMap/MainMap';

class Search extends Component{

  // Return to main list page
  handleClickBack = () => {
    this.props.history.push(`/`);
  }

  render(){
    if(this.props.reduxState.length === 0){
      return(
        <>
          <div className="nav-btn-div">
            <Fab onClick={this.handleClickBack} color="secondary" aria-label="back" 
              style={{display:"inline-block", marginRight:"20px"}}>
              <CloseIcon />
            </Fab>
          </div>

          <h2>Search Results</h2>
          <p>No Results</p>
        </>
      )
    }
    else{
      return(
        <>
          <div className="nav-btn-div">
            <Fab onClick={this.handleClickBack} color="secondary" aria-label="back" 
              style={{display:"inline-block", marginRight:"20px"}}>
              <CloseIcon />
            </Fab>
          </div>
          
          <h2>Search Results</h2>
          <MainMap film={this.props.reduxState} />
        </>
      )
    }
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.searchFilmReducer
});

export default connect(putReduxStateOnProps)(Search);