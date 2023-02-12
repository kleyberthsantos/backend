import { Router } from 'express'
import productShoppingManager from '../manager/product.manager.js'

const router = Router()
const items = new productShoppingManager('./products.router.js')

router.get('/', async (req, res) => {
  try {
    if (!isNaN(req.query.limit)) {
      let products = await items.getAll()
      products = products.slice(0, parseInt(req.query.limit))
      if (products) {
        return res.json(products)
      }
    }
    return res.status(400).json({ error: 'Limit debe ser un número' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Get
router.get('/:pid', async (req, res) => {
  try {
    const product = await items.getByID(req.params.pid)
    if (product) {
      return res.json(product)
    }
    return res.status(404).json({ error: 'Producto no encontrado' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const product = await items.addProduct(req.body)
    if (!product) {
      return res.status(202).json('Producto agregado')
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Put
router.put('/:pid', async (req, res) => {
  try {
    const product = await items.updateProduct(req.params.pid, req.body)
    if (product) {
      return res.status(200).json('El producto se actualizo')
    }
    return res.status(404).json({ error: 'Producto no encontrado' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//delete
router.delete('/:pid', async (req, res) => {
  try {
    const product = await items.delete(req.params.pid)
    if (!product) {
      return res.status(200).json('Producto eliminado')
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

export default router
