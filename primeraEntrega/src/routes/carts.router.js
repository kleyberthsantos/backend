import { Router } from 'express'
import cartShoppingManager from '../manager/cart.manager.js'

const manager = new cartShoppingManager('./carts.router.js')

const router = Router()

router.get('/', async (req, res) => {
  try {
    let carts = await manager.getAll()
    if (carts && req.query.limit && !isNaN(req.query.limit)) {
      carts = carts.slice(0, req.query.limit)
    }
    return res.json(carts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const cart = await manager.addCart()
    return res.json({ message: 'Carrito agregado' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/:cid', async (req, res) => {
  try {
    const cart = await manager.getCart(req.params.cid)
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' })
    }
    return res.json(cart)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await manager.addProductToCart(req.params)
    if (!result) {
      return res.json({ message: 'Producto agregado al carrito' })
    }
    return res.status(400).json({ error: result })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

export default router
