import React, { Component } from 'react';

class ProductAdd extends Component {

  render() {
    return (
      <div id="content">
        <div className='col-md-12 px-0'>
          <h1 className='text-success font-weight-bolder'>Add Products</h1>
          <hr></hr>
        </div>
        <form onSubmit = {(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.producPrice.value.toString(), 'Ether') 
          const manufacture = this.productManufacture.value 
          const details = this.productDetails.value

          this.props.createProduct(name, price, manufacture, details)
        }}>
          <div className="form-group mr-sm-2 col-md-6 px-0">
            <input 
              id="productName"
              type="text"
              ref = {(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2 col-md-6 px-0">
            <input 
              id="producPrice"
              type="text"
              ref = {(input) => { this.producPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <div className="form-group mr-sm-2 col-md-6 px-0">
            <input 
              id="productManufacture"
              type="text"
              ref = {(input) => { this.productManufacture = input }}
              className="form-control"
              placeholder="Product Manufacture"
              required
            />
          </div>
          <div className="form-group mr-sm-2 col-md-6 px-0">
            <textarea 
              id="productDetails"
              type="text"
              ref = {(input) => { this.productDetails = input }}
              className="form-control"
              placeholder="Product Details"
              required
            />
          </div>
          <button type="submit" className="btn btn-success font-weight-bold py-2">Add Producrt</button>
        </form>
    </div>
    );
  }   
}

export default ProductAdd;
