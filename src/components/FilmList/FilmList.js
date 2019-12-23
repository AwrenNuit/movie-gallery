import React, {Component} from 'react';
import {connect} from 'react-redux';
// Components
import MainMap from '../MainMap/MainMap';
import SearchBar from '../SearchBar/SearchBar';

class FilmList extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FILM`});
  }

  render(){
    return(
      <>
        <SearchBar />
        <h2>All Films</h2>
        <MainMap film={this.props.reduxState} />
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.filmReducer
});

export default connect(putReduxStateOnProps)(FilmList);