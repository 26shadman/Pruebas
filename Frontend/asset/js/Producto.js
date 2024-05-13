$(document).ready(function () {
    // URL de base de la API
    var baseUrl = 'http://localhost:9000/Shoe_Store';

    // Contador del id
    var contadorProductos = 1;

    // Los id para editar
    var productosEditandoId = null;

    actualizarTablaProductos();

    // Productos
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
            price: $('#precio').val(),
            vatPercentage: $('#iva').val(),
            discountPercentage: $('#descuento').val(),
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del producto al Back-end \\
        if (productosEditandoId) {
            $.ajax({
                url: baseUrl + '/products/' + productosEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productoData),
                success: function (response) {
                    Swal.fire({
                        imageUrl: "../asset/img/decision-correcta.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Cambios realizados satisfactoriamente!"
                    });
                    actualizarTablaProductos();
                    $('#modalProducto').modal('hide');
                },
                error: function (error) {
                    if (error.status === 400 && error.responseText.includes("El campo 'Estado' no puede quedar vacío.")) {
                        Swal.fire({
                            imageUrl: "../asset/img/Alerta.png",
                            imageWidth: 300,
                            imageHeight: 250,
                            title: "El campo 'Estado' no puede quedar vacío."
                        });
                    } else {
                        Swal.fire({
                            imageUrl: "../asset/img/mala-decision.gif",
                            imageWidth: 300,
                            imageHeight: 250,
                            title: "Hubo un error al intentar guardar los cambios."
                        });
                        console.error(error);
                    }
                }                                
            });
        } else {

            // Peticion del POST (Agregar), del producto al Back-end \\
            $.ajax({
                url: baseUrl + '/products',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(productoData),
                success: function (response) {
                    Swal.fire({
                        imageUrl: "../asset/img/decision-correcta.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Producto agregado satisfactoriamente!"
                    });
                    $('#modalProducto').modal('hide');
                    actualizarTablaProductos();
                },
                error: function (error) {
                    Swal.fire({
                        imageUrl: "../asset/img/mala-decision.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Hubo un error al intentar agregar el Producto."
                    });
                    console.error(error);
                }
            });
        }
    });

    // Peticion del DELETE (Eliminar), del producto al Back-end \\
    $('#productoTable').on('click', '.eliminar-producto', function () {
        var idProducto = $(this).data('id');
        var nombreProducto = obtenerNombreProducto($(this));
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de que desea eliminar el producto " + nombreProducto + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, deseo eliminarlo",
            cancelButtonText: "No, prefiero cancelarlo",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: baseUrl + '/products/' + idProducto,
                    type: 'DELETE',
                    success: function (response) {
                        eliminarFila($(this));
                        swalWithBootstrapButtons.fire({
                            title: "¡Eliminado!",
                            text: "El Producto " + nombreProducto + " ha sido eliminado.",
                            icon: "success"
                        });
                        actualizarTablaProductos();
                    },
                    error: function (error) {
                        swalWithBootstrapButtons.fire({
                            title: "Error",
                            text: "Hubo un error al intentar eliminar al producto " + nombreProducto + ".",
                            icon: "error"
                        });
                        console.error(error);
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "El Producto " + nombreProducto + " no fue eliminado.",
                    icon: "error"
                });
            }
        });
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
                    Swal.fire({
                        imageUrl: "../asset/img/mala-desiscion.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Hubo un error al intentar obtener los datos de los productos."
                    });
                }
            });
        } else {
            llenarTablaProductos(datos);
        }
    }

    function llenarTablaProductos(data) {
        $('#productoTable tbody').empty();
        data.forEach(function (producto) {
            var iconoEstado = producto.status ? "<i class='bx bxs-toggle-right bx-tada' style='color:#5c0305'></i>" : "<i class='bx bxs-toggle-left bx-tada' style='color:#0fb132'></i>";
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
                '<button class="btn btn-sm btn-editar editar-producto" data-id="' + producto.id + '"><i class="bx bx-pencil bx-tada" style="color:#74f131"></i></button>' +
                '<button class="btn btn-sm btn-eliminar eliminar-producto" data-id="' + producto.id + '"><i class="bx bxs-trash bx-tada" style="color:#ff0606"></i></button>' +
                '<button class="btn btn-sm btn-info cambiar-estado-producto" data-id="' + producto.id + '" data-estado="' + (producto.status ? 'Habilitado' : 'Deshabilitado') + '">' + iconoEstado + '</button>' +
                '</td>' +
                '</tr>';
            $('#productoTable tbody').append(fila);
        });
    }

    // Función para obtener el nombre del producto de una fila
    function obtenerNombreProducto(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(1)').text(); // Nombre del producto
        return nombre;
    }

    // Función para eliminar una fila de la tabla
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Peticion del GET (Buscar), del producto al Back-end
    // Filtro del producto por nombre
    $('#search_por_nombre').on('keyup', function () {
        var campoVacio = $('#search_por_nombre').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/products/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterProductos = response.filter(function (producto) {
                        return (
                            producto.productName.toLowerCase().includes(searchText)
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

    // Filtro del producto por estado \\
    $('#search:por:estado').on('keyup', function () {
        var campoVacio = $('#search:por:estado').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/products/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterProductos = response.filter(function (producto) {
                        return (
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
        // Obtener los datos del producto de la fila correspondiente en la tabla
        var productoData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del producto
        llenarFormularioProducto(productoData);
        // Mostrar el modal
        $('#modalProducto').modal('show');
    });

    // Función para obtener los datos de una fila de la tabla
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

    // Función para llenar el formulario del producto con los datos de un producto que ya existe \\
    function llenarFormularioProducto(productoData) {
        $('#productName').val(productoData.productName);
        $('#description').val(productoData.description);
        $('#cantidad').val(productoData.amount);
        $('#precio').val(productoData.price);
        $('#iva').val(productoData.vatPercentage);
        $('#descuento').val(productoData.discountPercentage);
        $('#status').val(productoData.status);
    }

    // Función para cambiar el estado de un producto \\
    $('#productoTable').on('click', '.cambiar-estado-producto', function () {
        var idProducto = $(this).data('id');
        var estadoActual = $(this).data('estado');
        var nuevoEstado = estadoActual === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
        cambiarEstadoProducto(idProducto, nuevoEstado);
    });

    // Función para cambiar el estado de un producto \\
    function cambiarEstadoProducto(idProducto, nuevoEstado) {
        var nombreProducto = obtenerNombreProducto($('#productoTable').find("[data-id='" + idProducto + "']").closest('tr').find('.editar-producto'));
        var url = baseUrl + '/products/' + idProducto;
        var nuevoEstadoTexto = nuevoEstado === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de que desea cambiar el estado del producto " + nombreProducto + " a " + nuevoEstadoTexto + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, deseo cambiarlo",
            cancelButtonText: "No, lo cancelo",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la solicitud PUT para cambiar el estado del producto \\
                $.ajax({
                    url: url,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({ status: nuevoEstado }),
                    success: function (response) {
                        // Actualizar la fila correspondiente en la tabla \\
                        var fila = $('#productoTable').find("[data-id='" + idProducto + "']").closest('tr');
                        fila.find('td:eq(8)').text(nuevoEstadoTexto);
                        // Mostrar mensaje de éxito \\
                        swalWithBootstrapButtons.fire({
                            title: "¡Estado cambiado!",
                            text: "El estado del producto " + nombreProducto + " ha sido cambiado a " + nuevoEstado + " exitosamente.",
                            icon: "success"
                        });
                    },
                    error: function (error) {
                        // Mostrar mensaje de error \\
                        swalWithBootstrapButtons.fire({
                            title: "Error",
                            text: "Hubo un error al intentar cambiar el estado del producto " + nombreProducto + ".",
                            icon: "error"
                        });
                        console.error(error);
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "El estado del producto " + nombreProducto + " no ha sido cambiado.",
                    icon: "error"
                });
            }
        });
    }
});