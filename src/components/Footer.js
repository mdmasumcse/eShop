import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <p className='text-white text-left'>Copyright © 2020 — eShop. All Rights Reserved </p>
                </div>
                <div className='col-6'>
                    <p className='text-white text-right'>Develop by MD.MASUM </p>
                </div>
            </div>
        </div>
      
    );
  }
}

export default Footer;