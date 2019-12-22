import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SearchBar extends Component{

  state = {
    search: ''
  }

  // Set state to input value
  handleChange = (event) => {
    this.setState({
      search: event.target.value
    });
  }

  // Dispatch state to saga for GET
  handleClick = () => {
    this.props.dispatch({type: `SEARCH_FILM`, payload: this.state.search});
  }

  render(){
    return(
      <>
        <input type="text" onChange={(event)=>this.handleChange(event)} value={this.state.search} placeholder="search" />
        <Link to={"/results"}>
          <button onClick={this.handleClick}>Search</button>
        </Link>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(SearchBar);