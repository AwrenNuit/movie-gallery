import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

  render(){
    return(
      <>
        <Link to={"/"}>
          <h1 className="main-header">Film Gallery</h1>
        </Link>
      </>
    )
  }
}

export default Header;