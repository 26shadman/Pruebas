$(document).ready(function () {
    // URL de base de la API //
    var baseUrl = 'http://localhost:9000/Shoe_Store';

    // Contador del id  //
    var contadorProductos = 1;

    // Los id para editar //
    var productosEditandoId = null;

    actualizarTablaProductos();

    // Productos //
    $('#agregarProductoBtn').click(function () {
        $('#productoForm')[0].reset();
        productosEditandoId = null;
        $('#modalProducto').modal('show');
    });

    $('#guardarProducto').click(function () {
        var productoData = {
            productName: $('#productName').val(),
            description: $('#description').val(),
            amount: $('#cantidad').val(),
            vatPercentage: $('#iva').val(),
            discountPercentage: $('#descuento').val(),
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del producto al Back-end //
        if (productosEditandoId) {
            $.ajax({
                url: baseUrl + '/products/' + productosEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productoData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablaProductos();
                    $('#modalProducto').modal('hide');
                },
                error: function (error) {
                    alert("Hubo un error al intentar guardar los cambios.");
                    console.error(error);
                }
            });
        } else {
            // Peticion del POST (Agregar), del producto al Back-end //           
            $.ajax({
                url: baseUrl + '/products',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(productoData),
                success: function (response) {
                    alert("Producto agregado satisfactoriamente!");
                    $('#modalProducto').modal('hide');
                    actualizarTablaProductos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar agregar el producto.");
                    console.error(error);
                }
            });
        }
    });

    // Peticion del DELETE (Eliminar), del producto al Back-end //
    $('#productoTable').on('click', '.eliminar-producto', function () {
        var idProducto = $(this).data('id');
        var nombreProducto = obtenerNombreProducto($(this));
        if (confirm("¿Está seguro de que desea eliminar el producto " + nombreProducto + "?")) {
            $.ajax({
                url: baseUrl + '/products/' + idProducto,
                type: 'DELETE',
                success: function (response) {
                    eliminarFila($(this));
                    alert("El producto " + nombreProducto + " fue eliminado exitosamente.");
                    actualizarTablaProductos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar eliminar el producto " + nombreProducto + ".");
                    console.error(error);
                }
            });
        }
    });

    $('#modalProducto').modal('hide');

    function actualizarTablaProductos(data) {
        var datos = data || null;
        if (!datos) {
            $.ajax({
                url: baseUrl + '/products',
                type: 'GET',
                success: function (response) {
                    datos = response;
                    llenarTablaProductos(datos);
                },
                error: function (error) {
                    console.error(error);
                    alert("Hubo un error al intentar obtener los datos de los productos.");
                }
            });
        } else {
            llenarTablaProductos(datos);
        }
    }


    function llenarTablaProductos(data) {
        $('#productoTable tbody').empty();
        data.forEach(function (producto) {
            var fila = '<tr>' +
                '<td>' + producto.id + '</td>' +
                '<td>' + producto.productName + '</td>' +
                '<td>' + producto.description + '</td>' +
                '<td>' + producto.amount + '</td>' +
                '<td>' + producto.price + '</td>' +
                '<td>' + producto.vatPercentage + '</td>' +
                '<td>' + producto.discountPercentage + '</td>' +
                '<td>' + (producto.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-primary editar-producto" data-id="' + producto.id + '"><i class="bx bx-pencil bx-tada" style="color:#74f131"></i></button>' +
                '<button class="btn btn-sm btn-danger eliminar-producto" data-id="' + producto.id + '"><i class="bx bxs-trash bx-tada" style="color:#ff0606"></i></button>' +
                '</td>' +
                '</tr>';
            $('#productoTable tbody').append(fila);
        });
    }

    // Función para obtener el nombre del producto de una fila //
    function obtenerNombreProducto(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(1)').text(); // Nombre del producto //
        return nombre;
    }

    // Función para eliminar una fila de la tabla //
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Peticion del GET (Buscar), del producto al Back-end //
    $('#searchProducto').on('keyup', function () {
        var campoVacio = $('#searchProducto').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/products/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterProductos = response.filter(function (producto) {
                        return (
                            producto.id.toString().toLowerCase().includes(searchText) ||
                            producto.productName.toLowerCase().includes(searchText) ||
                            producto.description.toLowerCase().includes(searchText) ||
                            producto.status.toString().toLowerCase().includes(searchText)
                        );
                    });
                    actualizarTablaProductos(filterProductos);
                },
                error: function (error) {
                    console.error(error);
                    alert("No hay registros.");
                }
            });
        } else {
            actualizarTablaProductos();
        }
    });

    $('#productoTable').on('click', '.editar-producto', function () {
        var idProducto = $(this).data('id');
        productosEditandoId = idProducto;
        // Obtener los datos del producto de la fila correspondiente en la tabla //
        var productoData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del producto //
        llenarFormularioProducto(productoData);
        // Mostrar el modal //
        $('#modalProducto').modal('show');
    });

    // Función para obtener los datos de una fila de la tabla //
    function obtenerDatosFila(elemento) {
        var fila = elemento.closest('tr');
        var datos = {
            productName: fila.find('td:eq(1)').text(),
            description: fila.find('td:eq(2)').text(),
            amount: fila.find('td:eq(3)').text(),
            price: fila.find('td:eq(4)').text(),
            vatPercentage: fila.find('td:eq(5)').text(),
            discountPercentage: fila.find('td:eq(6)').text(),
            status: fila.find('td:eq(7)').text()
        };
        return datos;
    }

    // Función para llenar el formulario del producto con los datos de un producto que ya existe //
    function llenarFormularioProducto(productoData) {
        $('#productName').val(productoData.productName);
        $('#description').val(productoData.description);
        $('#cantidad').val(productoData.amount);
        $('#precio').val(productoData.price);
        $('#iva').val(productoData.vatPercentage);
        $('#descuento').val(productoData.discountPercentage);
        $('#status').val(productoData.status);
    }
});
