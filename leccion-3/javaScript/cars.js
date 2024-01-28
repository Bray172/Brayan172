const carst = document.querySelector(".cart");
const cartProducts = document.getElementById("products");
const btnCarrar = document.querySelector(".close-btn");

carst.addEventListener("click", () => {
  cartProducts.style.display = "block";
});
btnCarrar.addEventListener("click", () => {
  cartProducts.style.display = "none";
});
// Vriables a usar

const countProductos = document.querySelector(".count-products");
const carsItem = document.querySelector(".cart-items");
const totalPrecio = document.querySelector(".price-total");
const conteinerProducto = document.querySelector(".products");

let compras = [];
let totalCarrito = 0;
let contadorCarrito = 0;

// Funcionalidades

// agregar productos

conteinerProducto.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("btn-add-card")) {
    const productoSleccionado = e.target.parentElement;
    recuperarContenido(productoSleccionado);
  }
});

// aliminar

carsItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");
  

    compras.forEach((producto) => {
      if (producto.id === deleteId) {
        const restarPrecio =parseFloat(producto.cantidad) * parseFloat(producto.precio);
        totalCarrito=totalCarrito-restarPrecio

      }
    });

    compras = compras.filter((producto) => producto.id !== deleteId);
    contadorCarrito--;
  }

  if(compras.length===0){
    countProductos.innerHTML=0
    totalPrecio.innerHTML=0

  }
  comprasHtml()
});


// recuerarContenido

function recuperarContenido(product){
    const infoProducto={
        imagen:product.querySelector('div img').src,
        titulo:product.querySelector('.title').textContent,
        precio:product.querySelector('div p span').textContent,
        id:product.querySelector('a').getAttribute('data-id'),
        cantidad:1

    }
    totalCarrito=totalCarrito+parseFloat(infoProducto.precio)

    // validar id

    const validarId=compras.some(product=>product.id== infoProducto.id)

    if(validarId){
        const nuevoCarrito=compras.map(product=>{
            if(product.id==infoProducto.id){
                product.cantidad++
                return product
            }
            else{
                return product
            }
        })

        compras=[...nuevoCarrito]
    }
    else{
        compras=[...compras ,infoProducto]
        contadorCarrito++
    }

    comprasHtml()
}


function comprasHtml(){
    clearHtml()
    compras.forEach(product=>{
        const {imagen ,titulo,precio,cantidad,id}=product;
        const nuevoCarrito=document.createElement('div')
        nuevoCarrito.classList.add('items')
        nuevoCarrito.innerHTML=`
        <img src="${imagen}" alt="">
        <div class="item-content">
            <h5>${titulo}</h5>
            <h5 class="cart-price">${precio}</h5>
            <h5>Amount : ${cantidad}</h5>
        </div>
        <span class="delete-product" data-id="${id}">X</span>
        `;


        carsItem.appendChild(nuevoCarrito);
        totalPrecio.innerHTML=totalCarrito
        countProductos.innerHTML=contadorCarrito

    })
}

function clearHtml(){
    carsItem.innerHTML=''
}