import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainMap from '../MainMap/MainMap';

class Search extends Component{

  render(){
    if(this.props.reduxState.length === 0){
      return(
        <>
          <h3>Search Results</h3>
          <p>No Results</p>
        </>
      )
    }
    else{
      return(
        <>
          <h3>Search Results</h3>
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