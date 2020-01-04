import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  handleClick = (search) => {
    this.props.dispatch({type: `SEARCH_FILM`, payload: this.state.search});
    this.props.history.push('/search='+search);
  }

  render(){
    return(
      <>
        <Link to={"/add"}>
          <Button variant="contained" color="primary" style={{marginRight:"150px"}}>
            Add new films and genres
          </Button>
        </Link>

        <TextField id="outlined-basic" 
          label="search titles" 
          variant="outlined"
          style={{marginRight:"20px"}}
          className="search-in inputs"
          onChange={(event)=>this.handleChange(event)}
          value={this.state.search}/>

        <Fab onClick={()=>this.handleClick(this.state.search)} color="primary" aria-label="search">
          <SearchIcon />
        </Fab>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default withRouter(connect(putReduxStateOnProps)(SearchBar));