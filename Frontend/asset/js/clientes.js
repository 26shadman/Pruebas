$(document).ready(function () {
    // URL de base de la API \\
    var baseUrl = 'http://localhost:9000/Shoe_Store';

    // Contador del id  \\
    var contadorClientes = 1;

    // Los id para editar \\
    var clientesEditandoId = null;

    actualizarTablasClientes();

    // Clientes \\
    $('#agregarClienteBtn').click(function () {
        $('#clienteForm')[0].reset();
        clientesEditandoId = null;
        $('#modalCliente').modal('show');
    });

    // $('#agregarClienteBtn').click(function () {
    //     var url = 'Registrar_clientes.html'; 
    //     var windowName = 'Registrar Cliente';
    //     var windowFeatures = 'width=800,height=600,resizable=yes,scrollbars=yes';
    
    //     // Abrir la ventana emergente
    //     var newWindow = window.open(url, windowName, windowFeatures);
    //     if (newWindow) {
    //         console.log('Ventana emergente abierta con éxito.');
    //     } else {
    //         console.error('No se pudo abrir la ventana emergente.');
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'No se pudo abrir la ventana emergente.',
    //             icon: 'error'
    //         });
    //     }
    // });
    

    $('#guardarCliente').click(function () {
        var clienteData = {
            documentType: $('#documentType').val(),
            clientDocument: $('#document').val(),
            clientNames: $('#fisrtNames').val(),
            clientsLastNames: $('#fisrtLastNames').val(),
            clientPhoneNumber: $('#phoneNumber').val(),
            customerAddress: $('#address').val(),
            city: $('#city').val(),
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del cliente al Back-end \\
        if (clientesEditandoId) {
            $.ajax({
                url: baseUrl + '/customer/' + clientesEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function (response) {
                    Swal.fire({
                        imageUrl: "../asset/img/decision-correcta.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Cambios realizados satisfactoriamente!"
                    });
                    actualizarTablasClientes();
                    $('#modalCliente').modal('hide');
                },
                error: function (error) {
                    if (error.status === 400 && error.responseText === "El campo 'Estado' no puede quedar vacío.") {
                        Swal.fire({
                            imageUrl: "../asset/img/Alerta.png",
                            imageWidth: 300,
                            imageHeight: 250,
                            title: error.responseText
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

            // Peticion del POST (Agregar), del cliente al Back-end \\
            $.ajax({
                url: baseUrl + '/customer',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function (response) {
                    Swal.fire({
                        imageUrl: "../asset/img/decision-correcta.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Cliente agregado satisfactoriamente!"
                    });
                    $('#modalCliente').modal('hide');
                    actualizarTablasClientes();
                },
                error: function (error) {
                    Swal.fire({
                        imageUrl: "../asset/img/mala-decision.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Hubo un error al intentar agregar el cliente."
                    });
                    console.error(error);
                }
            });
        }
    });

    // Peticion del DELETE (Eliminar), del cliente al Back-end \\
    $('#clienteTable').on('click', '.eliminar-cliente', function () {
        var idCliente = $(this).data('id');
        var nombreCliente = obtenerNombrePersona($(this));
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de que desea eliminar al cliente " + nombreCliente + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar cliente",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: baseUrl + '/customer/' + idCliente,
                    type: 'DELETE',
                    success: function (response) {
                        eliminarFila($(this));
                        swalWithBootstrapButtons.fire({
                            title: "¡Eliminado!",
                            text: "El cliente " + nombreCliente + " ha sido eliminado.",
                            icon: "success"
                        });
                        actualizarTablasClientes();
                    },
                    error: function (error) {
                        swalWithBootstrapButtons.fire({
                            title: "Error",
                            text: "Hubo un error al intentar eliminar al cliente " + nombreCliente + ".",
                            icon: "error"
                        });
                        console.error(error);
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "El cliente " + nombreCliente + " no fue eliminado.",
                    icon: "error"
                });
            }
        });
    });

    function actualizarTablasClientes(data) {
        var datos = data || null;
        if (!datos) {
            $.ajax({
                url: baseUrl + '/customer',
                type: 'GET',
                success: function (response) {
                    datos = response;
                    llenarTabla(datos);
                },
                error: function (error) {
                    console.error(error);
                    Swal.fire({
                        imageUrl: "../asset/img/mala-desiscion.gif",
                        imageWidth: 300,
                        imageHeight: 250,
                        title: "Hubo un error al intentar obtener los datos de los clientes."
                    });
                }
            });
        } else {
            llenarTabla(datos);
        }
    }

    function llenarTabla(data) {
        $('#clienteTable tbody').empty();
        data.forEach(function (cliente) {
            var iconoEstado = cliente.status ? "<i class='bx bxs-toggle-right bx-tada' style='color:#5c0305'></i>" : "<i class='bx bxs-toggle-left bx-tada' style='color:#0fb132'></i>";
            var fila = '<tr>' +
                '<td>' + cliente.id + '</td>' +
                '<td>' + cliente.documentType + '</td>' +
                '<td>' + cliente.clientDocument + '</td>' +
                '<td>' + cliente.clientNames + '</td>' +
                '<td>' + cliente.clientsLastNames + '</td>' +
                '<td>' + cliente.clientPhoneNumber + '</td>' +
                '<td>' + cliente.customerAddress + '</td>' +
                '<td>' + cliente.city + '</td>' +
                '<td>' + (cliente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-editar editar-cliente" data-id="' + cliente.id + '"><i class="bx bx-pencil bx-tada" style="color:#74f131"></i></button>' +
                '<button class="btn btn-sm btn-eliminar eliminar-cliente" data-id="' + cliente.id + '"><i class="bx bxs-trash bx-tada" style="color:#ff0606"></i></button>' +
                '<button class="btn btn-sm btn-info cambiar-estado-cliente" data-id="' + cliente.id + '" data-estado="' + (cliente.status ? 'Habilitado' : 'Deshabilitado') + '">' + iconoEstado + '</button>' +
                '</td>' +
                '</tr>';
            $('#clienteTable tbody').append(fila);
        });
    }

    // Función para obtener los datos de una fila de la tabla \\
    function obtenerDatosFila(elemento) {
        var fila = elemento.closest('tr');
        var datos = {
            documentType: fila.find('td:eq(1)').text(),
            clientDocument: fila.find('td:eq(2)').text(),
            clientNames: fila.find('td:eq(3)').text(),
            clientsLastNames: fila.find('td:eq(4)').text(),
            phoneNumber: fila.find('td:eq(5)').text(),
            customerAddress: fila.find('td:eq(6)').text(),
            city: fila.find('td:eq(7)').text(),
            status: fila.find('td:eq(8)').text()
        };
        return datos;
    }

    // Función para llenar el formulario del cliente con los datos de un cliente que ya existe \\
    function llenarFormularioCliente(clienteData) {
        $('#documentType').val(clienteData.documentType);
        $('#document').val(clienteData.clientDocument);
        $('#fisrtNames').val(clienteData.clientNames);
        $('#fisrtLastNames').val(clienteData.clientsLastNames);
        $('#phoneNumber').val(clienteData.phoneNumber);
        $('#city').val(clienteData.city);
        $('#address').val(clienteData.customerAddress);
        $('#status').val(clienteData.status);
        $('#status').val('disabled', false);
    }

    // Función para obtener el nombre de la persona de una fila \\
    function obtenerNombrePersona(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(3)').text() + " " + fila.find('td:eq(4)').text();
        return nombre;
    }

    // Función para eliminar una fila de la tabla \\
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Peticion del GET (Buscar), del cliente al Back-end \\
    // filtro del cliente  por nombres o apellidos \\
    $('#search_por_nombre').on('keyup', function () {
        var campoVacio = $('#search_por_nombre').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/customer/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterClientes = response.filter(function (cliente) {
                        return (
                            cliente.clientNames.toLowerCase().includes(searchText) ||
                            cliente.clientsLastNames.toLowerCase().includes(searchText)
                        );
                    });
                    actualizarTablasClientes(filterClientes);
                },
                error: function (error) {
                    console.error(error);
                    Swal.fire("No hay registros.");
                }
            });
        } else {
            tabla();
        }
    });

    // filtro del cliente  por Ciudad \\
    $('#search_por_ciudad').on('keyup', function () {
        var campoVacio = $('#search_por_ciudad').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/customer/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterClientes = response.filter(function (cliente) {
                        return (
                            cliente.city.toLowerCase().includes(searchText)
                        );
                    });
                    actualizarTablasClientes(filterClientes);
                },
                error: function (error) {
                    console.error(error);
                    Swal.fire("No hay registros.");
                }
            });
        } else {
            tabla();
        }
    });

    // filtro del cliente  por Estado \\
    $('#search_por_estado').on('keyup', function () {
        var campoVacio = $('#search_por_estado').val();
        if (campoVacio) {
            var searchText = $(this).val().toLowerCase();
            $.ajax({
                url: baseUrl + '/customer/filter/' + searchText,
                type: 'GET',
                success: function (response) {
                    var filterClientes = response.filter(function (cliente) {
                        return (
                            cliente.status.toLowerCase().includes(searchText)
                        );
                    });
                    actualizarTablasClientes(filterClientes);
                },
                error: function (error) {
                    console.error(error);
                    Swal.fire("No hay registros.");
                }
            });
        } else {
            tabla();
        }
    });

    $('#clienteTable').on('click', '.editar-cliente', function () {
        var idCliente = $(this).data('id');
        clientesEditandoId = idCliente; // Cambio 'clienteEditandoId' por 'clientesEditandoId'
        // Obtener los datos del clientes de la fila correspondiente en la tabla //
        var clienteData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del cliente //
        llenarFormularioCliente(clienteData);
        // Mostrar el modal //
        $('#modalCliente').modal('show');
    });

    // Funcion del ID unico \\
    function generarIDCliente() {
        return "CLIENTE" + contadorClientes;
    }

    // Función para cambiar el estado de un cliente //
    $('#clienteTable').on('click', '.cambiar-estado-cliente', function () {
        var idCliente = $(this).data('id');
        var estadoActual = $(this).data('estado');
        var nuevoEstado = estadoActual === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
        cambiarEstadoCliente(idCliente, nuevoEstado);
    });

    // Función para cambiar el estado de un cliente \\
    function cambiarEstadoCliente(idCliente, nuevoEstado) {
        var nombreCliente = obtenerNombrePersona($('#clienteTable').find("[data-id='" + idCliente + "']").closest('tr').find('.editar-cliente'));
        var url = baseUrl + '/customer/' + idCliente;
        var nuevoEstadoTexto = nuevoEstado === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de que desea cambiar el estado del cliente " + nombreCliente + " a " + nuevoEstadoTexto + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Cambiar estado",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la solicitud PUT para cambiar el estado del cliente
                $.ajax({
                    url: url,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({ status: nuevoEstado }),
                    success: function (response) {
                        // Actualizar la fila correspondiente en la tabla
                        var fila = $('#clienteTable').find("[data-id='" + idCliente + "']").closest('tr');
                        fila.find('td:eq(8)').text(nuevoEstadoTexto);
                        // Mostrar mensaje de éxito
                        swalWithBootstrapButtons.fire({
                            title: "¡Estado cambiado!",
                            text: "El estado del cliente " + nombreCliente + " ha sido cambiado a " + nuevoEstado + " exitosamente.",
                            icon: "success"
                        });
                    },
                    error: function (error) {
                        // Mostrar mensaje de error
                        swalWithBootstrapButtons.fire({
                            title: "Error",
                            text: "Hubo un error al intentar cambiar el estado del cliente " + nombreCliente + ".",
                            icon: "error"
                        });
                        console.error(error);
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "El estado del cliente " + nombreCliente + " no ha sido cambiado.",
                    icon: "error"
                });
            }
        });
    }
    
});