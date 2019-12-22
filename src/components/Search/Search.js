import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainMap from '../MainMap/MainMap';

class Search extends Component{

  render(){
    return(
      <>
        <h3>Search Results</h3>
        <MainMap film={this.props.reduxState} />
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.searchFilmReducer
});

export default connect(putReduxStateOnProps)(Search);