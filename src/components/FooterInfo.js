import React, { Component } from 'react';
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons"

class FooterInfo extends Component {

  render() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-4'>
                    <h3 className='name text-success'>eShop</h3>
                    <p className='text-black-50 font-weight-bold text-left pt-3'>
                        Dhaka - 1200, Bangladesh<br></br>
                        Email: support@eshop.com.bd<br></br>
                        Contact no: +8801681952638<br></br>
                    </p>
                </div>
                <div className='col-4'>
                    <ul className="">
                        <li className="d-flex">
                            <h5 className='font-weight-bold text-black pb-3'>Menu</h5>
                        </li>
                        {/* <li className="d-flex">
                            <a className=" font-weight-bolder text-black-50" href='#'>About</a>
                        </li> */}
                        <li className="d-flex">
                            <a className=" font-weight-bold text-black-50" href='#'>Privacy Policy</a>
                        </li>
                        <li className="d-flex">
                            <a className=" font-weight-bold text-black-50" href='#'>Purchasing Policy</a>
                        </li>
                        <li className="d-flex">
                            <a className=" font-weight-bold text-black-50" href='#'>Terms & Conditions</a>
                        </li>
                        
                    </ul>
                </div>
                <div className='col-4'>
                    <ul className="d-flex flex-column">
                        <li className="d-flex justify-content-end">
                            <h5 className='font-weight-bolder text-black pb-3'>Get in Touch</h5>
                        </li>
                        <li className="d-flex justify-content-end">
                            <ul className="d-flex footer_social">
                                <li className="d-flex pl-2">
                                    <a className=" font-weight-bolder" href='#'><FontAwesomeIcon icon={faFacebookSquare} /></a>
                                </li>
                                <li className="d-flex pl-2">
                                    <a className=" font-weight-bolder" href='#'><FontAwesomeIcon icon={faTwitterSquare} /></a>
                                </li>
                                <li className="d-flex pl-2">
                                    <a className=" font-weight-bolder" href='#'><FontAwesomeIcon icon={faLinkedin} /></a>
                                </li>
                                <li className="d-flex pl-2">
                                    <a className=" font-weight-bolder" href='#'><FontAwesomeIcon icon={faInstagramSquare} /></a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      
    );
  }
}

export default FooterInfo;