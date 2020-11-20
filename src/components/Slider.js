import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
;
import slider_0 from '../images/slider_0.jpg';
import slider_1 from '../images/slider_1.jpg';
import slider_2 from '../images/slider_2.jpg';
import slider_3 from '../images/slider_3.jpg';


class Slider extends Component {

  render() {
    return (
      <Carousel>
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider_0}
            height="450"
            alt="First slide"
            fluid 
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider_1}
            alt="Secend slide"
            height="450"
            fluid 
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider_2}
            height="450"
            alt="Third slide"
            fluid 
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider_3}
            alt="Fourth slide"
            height="450"
            fluid 
          />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider_3}
            alt="Third slide"
            fluid 
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item> */}

      </Carousel>
    );
  }
}

export default Slider;
