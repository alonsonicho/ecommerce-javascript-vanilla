const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
const botonCompra = document.getElementById('realizarCompra')

let carrito = []

let stockProductos = []



// Traer los productos del json
const obtenerDatos = async () => {
    try {
        let response = await fetch("/js/data.json")
        let result = await response.json()
        result.forEach(elemento => stockProductos.push(elemento))
        pintarCards(result)
    } catch (error) {
        console.log(error);
    }
}

// LOCAL STORAGE
document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos();
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.clear()
    actualizarCarrito()
})


const pintarCards = data => {
    data.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <div class="container-info">
                <img src=${producto.img} alt="" class="imagen"/>
                <div class="info">
                <div class="info-int">
                    <span>${producto.nombre}</span>
                    <span>$${producto.precio}</span>
                </div>
                <button id="${producto.id}" class="boton-agregar">AGREGAR<i class="fas fa-shopping-cart"></i></button>
                </div>
        </div>`
        contenedorProductos.appendChild(div)


        const boton = document.getElementById(`${producto.id}`)
        boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        Toastify({
            text: "Producto agregado",
            className: "info",
            newWindow: true,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(to right, #16222A 0%, #3A6073  51%, #16222A  100%)",
            }
          }).showToast();

    })
  })
}

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){ 
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}



const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    actualizarCarrito() 
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
            <span><img src=${prod.img} class="imagen-carrito"/></span>
            <span>${prod.nombre}</span>
            <span>Precio:$${prod.precio}</span>
            <span>Cantidad: <span id="cantidad">${prod.cantidad}</span></span>
            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div)

        // LOCAL STORAGE 
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

botonCompra.addEventListener('click', () => {
    if(carrito.length>=1){
        (async () => {
            const { value: email } = await Swal.fire({
              title: 'Reciba la informacion en su email',
              input: 'email',
              inputPlaceholder: 'email'
            })
                if (email) {
                Swal.fire(`Se ha enviado la informacion para procesar el pago: ${email}`,"","success")
                carrito.length = 0
                localStorage.clear()
                actualizarCarrito()
                }
            })()
    }
})


