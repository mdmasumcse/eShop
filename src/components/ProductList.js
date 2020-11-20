import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import demo_product from '../images/demo_product.png';

class ProductList extends Component {

  render() {

    return (
      <div id="productlist">
        <div className='row'>
            <div className='col-md-12'>
              <h1 className='text-success font-weight-bolder'>Latest Products</h1>
              <hr></hr>
            </div>

            { this.props.products.map((product, key) => {
              return(
                <div className='text-center col-md-4 my-3'>
                <Card  key={key}>
                  <Card.Img 
                    variant="top"
                    className="d-block w-100"
                    src={demo_product}
                    //height="200"
                    fluid 
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                    Owner: {product.owner}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Price: {window.web3.utils.fromWei(product.price.toString(), 'Ether')}  Ether</ListGroupItem>
                    <ListGroupItem>Manufacture: {product.manufacture}</ListGroupItem>
                    <ListGroupItem>Details: {product.details}</ListGroupItem>
                  </ListGroup>
                  { !product.purchased
                      ? <button
                          className="btn btn-success font-weight-bold py-2"
                          name = {product.id}
                          value = {product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy Product
                        </button>
                      : <h5 className='text-success font-weight-bold py-1'>Not Available</h5>
                    }
                </Card>
                </div>
                )
              }) }
          </div>
      </div>
    );
  }   
}

export default ProductList;