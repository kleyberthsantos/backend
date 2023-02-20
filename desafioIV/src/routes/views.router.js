import { Router } from "express";
import { productController } from "../manager/product.manager.js";
import { uploader } from "../utils.js";

const router = Router()

router.get('/api', async (req, res) => {
    const products = await productController.getProducts()
    res.send(products)
})
router.post('/api', uploader.none(), async (req, res) => {
    const newProduct = req.body
    try {
        const product = await productController.addProduct(newProduct)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})
router.delete('/api', uploader.none(), async (req, res) => {
    try {
        const idProduct = req.body.id
        const deletedProd = await productController.deleteProduct(parseInt(idProduct))
        res.send(deletedProd)
    } catch (error) {
        res.send(error)
    }
})


router.get('/', async (req, res) => {
    try {
        const products = await productController.getProducts()
        res.render('home', {
            hasProducts: products.length > 0,
            products
        })
    } catch (error) {
        res.send(error)
    }
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

export default router;