import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import EShop from '../abis/EShop.json'
import Navbar from './Navbar'
import logo from '../logo.png';
import Slider from './Slider'
import ProductList from './ProductList'
import ProductAdd from './ProductAdd'
import FooterInfo from './FooterInfo'
import Footer from './Footer'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockcainData()

  }

  async loadWeb3(){
     if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        console.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockcainData(){
    const web3 = window.web3
    // load account
    const accounts = await web3.eth.getAccounts() 
    //console.log(accounts)
    this.setState({ account: accounts[0]})
    //console.log(EShop.abi, EShop.networks[5777].address)

    //const abi = EShop.abi
    //const address = EShop.networks[networkId].address
    //const eShop = web3.eth.Contract(abi, address)
    //console.log(eShop)

    const networkId = await web3.eth.net.getId()
    //console.log(networkId)
    const networkData = EShop.networks[networkId]
    if(networkData) {
      const eShop = web3.eth.Contract(EShop.abi, networkData.address)
      //console.log(eShop)
      this.setState({ eShop })
      const productCount = await eShop.methods.productCount().call()
      //console.log(productCount.toString())
      this.setState({ productCount })
      //load products
      for (var i = 1; i<= productCount; i++){
        const product = await eShop.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
      //console.log(this.state.products)
    }else{
      window.alert('EShop contract not deployed to detected network.');
    }

  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
      
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)

  }

  createProduct(name, price, manufacture, details){
    this.setState({loading: true})
    this.state.eShop.methods.createProduct(name, price, manufacture, details).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  purchaseProduct(id, price){
    this.setState({loading: true})
    this.state.eShop.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  
  render() {
    return (
      <div>
        {/* Navbar section */}
        <Navbar account={this.state.account} />

        {/* Slider section */}
        <div className="container-fluid pt-3 mt-5 border-bottom">
          <div className="row">
            <main role="main" className="col-md-12 px-0">
              { this.state.loading 
                ? <div id="loading" className="text-center"><p className="text-center">Loading Slider ...</p></div> 
                : <Slider />
              }
            </main>
          </div>
        </div>        

        {/* Product add section */}
        <div className="container mt-5">
          <div className="row">
            <main role="main" className="col-md-12">
              { this.state.loading 
                ? <div id="loading" className="text-center"><p className="text-center">Loading Product Add...</p></div> 
                : <ProductAdd 
                  products = {this.state.products}
                  createProduct = {this.createProduct}
                  purchaseProduct = {this.purchaseProduct}
                  
                  />
              }
            </main>
          </div>
        </div>

        {/* Product list section */}
        <div className="container mt-5">
          <div className="row">
            <main role="main" className="col-md-12 d-flex">
              { this.state.loading 
                ? <div id="loading" className="text-center"><p className="text-center">Loading Product List...</p></div> 
                : <ProductList
                  products = {this.state.products}
                  createProduct = {this.createProduct}
                  purchaseProduct = {this.purchaseProduct}
                  />
              }
            </main>
          </div>
        </div>
        
        {/* FooterInfo section */}
        <div className="container-fluid bg-light border-top py-5 mt-5">
            <main role="main">
              { this.state.loading 
                ? <div id="loading" className="text-center"><p className="text-center">Loading FooterInfo ...</p></div> 
                : <FooterInfo />
              }
            </main>
        </div>

        {/* Page footer section */}
        <div className="container-fluid bg-success pt-3">
            <main role="main">
              { this.state.loading 
                ? <div id="loading" className="text-center"><p className="text-center">Loading Footer ...</p></div> 
                : <Footer />
              }
            </main>
        </div>

      </div>
    );
  }
}

export default App;
