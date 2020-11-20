import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-success fixed-top flex-md-nowrap p-0 shadow px-4">
          <a
            className="navbar-brand font-weight-bolder text-white" href="#" rel="noopener noreferrer"
          >
            <h1 className='name'>eShop</h1>
          </a>
          <ul className="pt-3">
            <li className="d-flex">
              <small className="text-white font-weight-bolder"><span id="account">Account ID: {this.props.account}</span></small>
            </li>
          </ul>
        </nav>
    );
  }
}

export default Navbar;
