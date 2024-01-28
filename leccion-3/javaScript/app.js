const mostrar = document.querySelector(".cart");
const contenidoCarrito = document.querySelector(".contenido-carrito");
const btnCerrar = document.getElementById("cerrar");

mostrar.addEventListener("click", () => {
  contenidoCarrito.style.display = "block";
});

btnCerrar.addEventListener("click", () => {
  contenidoCarrito.style.display = "none";
});

// varaiables a usar

const conteinerCarrito = document.querySelector(".contenedor-carrito");
const precioTotal = document.getElementById("precio");
const cantidadProducto = document.getElementById("cantidad");
const seccionProducto = document.querySelector(".section-product");
const productCars = document.querySelector(".produdct");


let compras = [];
let totalCarrito = 0;
let contadorCarrito = 0;

//

seccionProducto.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn-agregar")) {
    const productoSelecciodado = e.target.parentElement;
    recuperarContenido(productoSelecciodado);
  }
});
// funcion para eliminar
conteinerCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-cerrar")) {
    const idEliminar = e.target.getAttribute("data-id");
    compras = compras.filter(producto => producto.id !==idEliminar);
    console.log(compras);
  
  }
  comprasHtml();
});

function recuperarContenido(producto) {
  let infoContenido = {
    imagen: producto.querySelector("div img").src,
    titulo: producto.querySelector(".titulo-producto").textContent,
    precio: producto.querySelector(".precio-producto").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  totalCarrito = totalCarrito + parseInt(infoContenido.precio);
  console.log(totalCarrito);

  let validarId = compras.some((producto) => producto.id === infoContenido.id);

  if (validarId) {
    let nuevoProducto = compras.map((producto) => {
      if (producto.id === infoContenido.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    compras = [...nuevoProducto];
  } else {
    compras = [...compras, infoContenido];
    contadorCarrito++;
  }

  comprasHtml();
}

function comprasHtml() {
  limpiarCarrito();

  compras.forEach((producto) => {
    const { imagen, titulo, precio, cantidad, id } = producto;

    const nuevoCarrito = document.createElement("div");
    nuevoCarrito.classList.add("producto-carrito");
    nuevoCarrito.innerHTML = `
    <img src="${imagen}" alt="" />
    <div class="contenido-cart">
      <h5>${titulo}</h5>
      <p class="precio">${precio}</p>
       <p class="cantidad">cantidad ${cantidad}</p>
    </div>
   <span class="btn-cerrar"  data-id"${id}" id="btn-cerrar"><ion-icon name="trash-outline"class="btn-cerrar"  data-id"${id}" ></ion-icon></span>
    
    
    `;

    conteinerCarrito.appendChild(nuevoCarrito);
    cantidadProducto.innerHTML = contadorCarrito;
    precioTotal.innerHTML = totalCarrito;
  });
}

function limpiarCarrito() {
  conteinerCarrito.innerHTML = "";
}
