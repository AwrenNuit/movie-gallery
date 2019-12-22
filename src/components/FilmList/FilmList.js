import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainMap from '../MainMap/MainMap';
import SearchBar from '../SearchBar/SearchBar';


class FilmList extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FILM`});
  }

  render(){
    return(
      <>
        <h3>All Films</h3>
        <SearchBar />
        <MainMap film={this.props.reduxState} />
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.filmReducer
});

export default connect(putReduxStateOnProps)(FilmList);