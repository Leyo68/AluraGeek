
async function obtenerProductos() {
    try {
      const response = await fetch('https://github.com/Leyo68/AluraGeek/blob/main/db.json');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productos = await response.json();
      return productos;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    }
  }


async function mostrarProductos() {

    try {
        // Obtener productos desde la API fake
        const listaProductos = await obtenerProductos();
        console.log(listaProductos);

        // Obtener el contenedor donde vamos a mostrar los productos
        const listaProductosContainer = document.querySelector('.ulCarts');
        // Limpiamos la lista de productos antes de agregar nuevos
        listaProductosContainer.innerHTML = '';

        listaProductos.forEach((producto, index) => {

         // Creamos elementos HTML dinámicamente
            const li = document.createElement('li');
            li.classList.add('videos__item');

            const divCard = document.createElement('div');
            divCard.classList.add('card_item');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;

            const pNombre = document.createElement('p');
            pNombre.classList.add('pieImg');
            pNombre.textContent = producto.nombre;

            const divDescripcion = document.createElement('div');
            divDescripcion.classList.add('descripcion_borrar');

            const pPrecio = document.createElement('p');
            pPrecio.textContent = `${producto.precio}`;

            const imgBorrar = document.createElement('img');
            imgBorrar.src = 'img/borrar.svg';
            imgBorrar.alt = 'borrar';
            imgBorrar.classList.add('imgBorrar');

            // Añadimos los elementos creados al DOM
            divDescripcion.appendChild(pPrecio);
            divDescripcion.appendChild(imgBorrar);

            divCard.appendChild(img);
            divCard.appendChild(pNombre);
            divCard.appendChild(divDescripcion);

            li.appendChild(divCard);

            listaProductosContainer.appendChild(li);
        });
    } catch (error) {
        console.log("Error al intentar traer los productos desde la API ${error}");
    }
  }
  
  // Llama a esta función para mostrar los productos al cargar la página
//   mostrarProductos();
  document.addEventListener('DOMContentLoaded', mostrarProductos());
  


  async function agregarProducto(nombre, precio, imagen) {
    try {
      const response = await fetch('https://github.com/Leyo68/AluraGeek/blob/main/db.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio, imagen }),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }
      // Actualizamos la lista de productos después de agregar uno nuevo
      mostrarProductos();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }
  

  // Se utiliza para asegurarse de que el código JavaScript se ejecute solo después de que todo el contenido HTML haya sido cargado y esté listo para ser manipulado
  document.addEventListener('DOMContentLoaded', () => {
    console.log("Entro a DOMContentLoaded");
    const formularioProducto = document.getElementById('formularioProducto');

    formularioProducto.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que se envíe el formulario de forma tradicional

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').value;

        console.log(nombre, precio, imagen);

        try {
            const response = await fetch('https://github.com/Leyo68/AluraGeek/blob/main/db.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, precio, imagen }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const nuevoProducto = await response.json();
            console.log('Producto agregado:', nuevoProducto);

            // Aquí puedes realizar cualquier acción adicional después de agregar el producto

            // Limpiar el formulario después de enviarlo
            formularioProducto.reset();
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    });
});


const listaProductos = document.querySelector('.ulCarts');

listaProductos.addEventListener('click', function(event) {
  if (event.target.classList.contains('imgBorrar')) {
    const productoAEliminar = event.target.closest('.videos__item');
    productoAEliminar.remove();
    
    // Aquí podrías también enviar una solicitud DELETE a tu API para eliminar el producto correspondiente.
  }
});
