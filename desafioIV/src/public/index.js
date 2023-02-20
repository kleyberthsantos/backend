const socketClient = io();
const productForm = document.getElementById('productForm');
const productDeleteForm = document.getElementById('productDeleteForm');

productForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(productForm)
    fetch('/api', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    socketClient.emit('updateProducts')
})

productDeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(productDeleteForm)

    fetch('/api', {
        method: 'DELETE',
        body: formData
    })
    .then(res => res.json())
    socketClient.emit('updateProducts')
})

socketClient.on('fetchProducts', () => {
    fetch('/api', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(products => {
        let realTimeProductList = document.getElementById('realTimeProductList')
        let productList = products.map(prod => {
            return `<h3>${prod.title}</h3>
                    <p>${prod.category}</p>
                    <p>Descripción:${prod.description}</p>
                    <p>Precio: $ ${prod.price}</p>
                    <p>Código: ${prod.code}</p>
                    <p>Stock: ${prod.stock}</p>
                    <p>ID: ${prod.id}</p>
                    <img src=${prod.thumbnail} alt="${prod.title}" width="180" height="180"></img>`
        }).join(' ')
        realTimeProductList.innerHTML = productList
    })
});