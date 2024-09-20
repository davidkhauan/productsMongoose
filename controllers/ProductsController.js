const Product = require ('../models/ProductModel')

class ProductController {
    static async showProducts (requisition, response) {
        const products = await Product.find().lean()

        response.render ('products/all', { products })
    }

    static createProduct (requisition, response) {
        response.render ('products/create')
    }

    static async editProduct (requisition, response) {
        const id = requisition.params.id

        const product = await Product.findById (id).lean()

        response.render ('products/edit', { product })
    }

    static async editProductPost (requisition, response) {
        const id = requisition.body.id
        const name = requisition.body.name
        const image = requisition.body.image
        const price = requisition.body.price
        const description = requisition.body.description

        const product = { name, image, price, description }

        await Product.updateOne ({ _id: id }, product)

        response.redirect ('/products')
    }

    static async removeProduct (requisition, response) {
        const id = requisition.params.id

        await Product.deleteOne ({ _id: id })

        response.redirect ('/products')
    }

    static async createProductPost (requisition, response) {
        const name = requisition.body.name
        const image = requisition.body.image
        const price = requisition.body.price
        const description = requisition.body.description

        const product = new Product ({ name, image, price, description })

        await product.save()

        response.redirect ('/products')
    }

    static async getProduct (requisition, response) {
        const id = requisition.params.id

        const product = await Product.findById (id).lean()

        response.render ('products/product', { product })
    }
}

module.exports = ProductController