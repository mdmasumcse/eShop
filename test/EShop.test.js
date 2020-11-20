const { assert } = require("chai");
const { default: Web3 } = require("web3");

const EShop = artifacts.require("EShop");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EShop', ([deployer, seller, buyer]) => {
    let eShop

    before(async() => {
        eShop = await EShop.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfilly', async() => {
            const address = await eShop.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await eShop.name()
            assert.equal(name, 'eShop')
        })
    })

    describe('products', async() => {
        let result, productCount

        before(async() => {
            result = await eShop.createProduct('name', web3.utils.toWei('1', 'Ether'), 'manufacture', 'details', 'mfgdate', { from: seller })
            productCount = await eShop.productCount()
        })

        it('creates products', async() => {
            //Sucess
            assert.equal(productCount, 1)
            //console.log(result.logs)  //see run result
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'name', 'Name is correct')
            assert.equal(event.price, '1000000000000000000', 'Price is correct')
            assert.equal(event.manufacture, 'manufacture', 'manufacture is correct')
            assert.equal(event.details, 'details', 'details is correct')
            assert.equal(event.mfgdate, 'mfgdate', 'mfgdate is correct')
            assert.equal(event.owner, seller, 'Owner is correct')
            assert.equal(event.purchased, false, 'Purchased is correct')

            //Failure: Product must have a name
            await eShop.createProduct('', web3.utils.toWei('1', 'Ether'), 'manufacture', 'details', 'mfgdate', { from: seller }).should.be.rejected;

            //Failure: Product must have a price
            await eShop.createProduct('name', 0, 'manufacture', 'details', 'mfgdate', { from: seller }).should.be.rejected;

        })

        it('lists products', async() => {
            const product = await eShop.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, 'name', 'Name is correct')
            assert.equal(product.price, '1000000000000000000', 'Price is correct')
            assert.equal(product.manufacture, 'manufacture', 'manufacture is correct')
            assert.equal(product.details, 'details', 'details is correct')
            assert.equal(product.mfgdate, 'mfgdate', 'mfgdate is correct')
            assert.equal(product.owner, seller, 'Owner is correct')
            assert.equal(product.purchased, false, 'Purchased is correct')

        })

        it('sells products', async() => {
            // Track the seller blance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            // Sucess: Buyer makes purchase
            result = await eShop.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

            // check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'name', 'Name is correct')
            assert.equal(event.price, '1000000000000000000', 'Price is correct')
            assert.equal(event.manufacture, 'manufacture', 'manufacture is correct')
            assert.equal(event.details, 'details', 'details is correct')
            assert.equal(event.mfgdate, 'mfgdate', 'mfgdate is correct')
            assert.equal(event.owner, buyer, 'Owner is correct')
            assert.equal(event.purchased, true, 'Purchased is correct')

            // Check that seller received funds
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

           // console.log(oldSellerBalance, newSellerBalance, price)

           const exepectedBalance = oldSellerBalance.add(price)

           assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

           //Failure: Tries to buy a product that dose not exist, i.e.., product must have valid id
           await eShop.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
           //Failure: Buyer tries to buy without enough ether
           await eShop.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
           //Failure: Deployer tries to buy the product, i.e.., product can't be purchased twice
           await eShop.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
           //Failure: Buyer tries to buy again, i.e.., buyer can't be the seller
           await eShop.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

        })

    })


})