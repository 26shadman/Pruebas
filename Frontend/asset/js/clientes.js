$(document).ready(function () {
    // URL de base de la API //
    var baseUrl = 'http://127.0.0.1:9000/Shoe_Store';

    // Contador del id  //
    var contadorClientes = 1;

    // Los id para editar //
    var clientesEditandoId = null;

    actualizarTablasClientes();

    // Clientes //
    $('#agregarClienteBtn').click(function () {
        $('#clienteForm')[0].reset();
        clientesEditandoId = null;
        $('#modalCliente').modal('show');
    });

    $('#guardarCliente').click(function () {
        var clienteData = {
            documentType: $('#documentType').val(),
            document: $('#document').val(),
            firstNames: $('#fisrtNames').val(),
            firstLastNames: $('#fisrtLastNames').val(),
            phoneNumber: $('#phoneNumber').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del cliente al Back-end //
        if (clientesEditandoId) {
            $.ajax({
                url: baseUrl + '/customer/' + clientesEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablasClientes();
                    $('#modalCliente').modal('hide');
                },
                error: function (error) {
                    if (error.status === 400 && error.responseText === "El campo 'Estado', no puede quedar vacío.") {
                        alert(error.responseText);
                    } else {
                        alert("Hubo un error al intentar guardar los cambios.");
                        console.error(error);
                    }
                }
            });

            // Peticion del POST (Agregar), del cliente al Back-end //           
        } else {
            $.ajax({
                url: baseUrl + '/customer',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function (response) {
                    alert("Cliente agregado satisfactoriamente!");
                    $('#modalCliente').modal('hide');
                    actualizarTablasClientes();
                },
                error: function (error) {
                    alert("Hubo un error al intentar agregar el cliente.");
                    console.error(error);
                }
            });
        }

    });

    // Peticion del DELETE (Eliminar), del cliente al Back-end //
    $('#clienteTable').on('click', '.eliminar-cliente', function () {
        var idCliente = $(this).data('id');
        var nombreCliente = obtenerNombrePersona($(this));
        if (confirm("¿Está seguro de que desea eliminar al cliente " + nombreCliente + "?")) {
            $.ajax({
                url: baseUrl + '/customer/' + idCliente,
                type: 'DELETE',
                success: function (response) {
                    eliminarFila($(this));
                    alert("El cliente " + nombreCliente + " fue eliminado exitosamente.");
                    actualizarTablasClientes();
                },
                error: function (error) {
                    alert("Hubo un error al intentar eliminar al cliente " + nombreCliente + ".");
                    console.error(error);
                }
            });
        }
    });

    $('#modalCliente').modal('hide');

    function actualizarTablasClientes() {
        $.ajax({
            url: baseUrl + '/customer',
            type: 'GET',
            success: function (response) {
                $('#clienteTable tbody').empty();
                response.forEach(function (cliente) {
                    var fila = '<tr>' +
                        '<td>' + cliente.id + '</td>' +
                        '<td>' + cliente.documentType + '</td>' +
                        '<td>' + cliente.document + '</td>' +
                        '<td>' + cliente.firstNames + '</td>' +
                        '<td>' + cliente.firstLastNames + '</td>' +
                        '<td>' + cliente.phoneNumber + '</td>' +
                        '<td>' + cliente.address + '</td>' +
                        '<td>' + (cliente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                        '<td>' +
                        '<button class="btn btn-sm btn-primary editar-cliente" data-id="' + cliente.id + '"><i class="bx bx-pencil bx-tada" style="color:#74f131"></i></button>' +
                        '<button class="btn btn-sm btn-danger eliminar-cliente" data-id="' + cliente.id + '"><i class="bx bxs-trash bx-tada" style="color:#ff0606"></i></button>' +
                        '</td>' +
                        '</tr>';
                    $('#clienteTable tbody').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los clientes.");
            }
        });
    }    

    // Funcion del ID unico \\

    function generarIDCliente() {
        return "CLIENTE" + contadorClientes;
    }

    // Función para obtener los datos de una fila de la tabla //
    function obtenerDatosFila(elemento) {
        var fila = elemento.closest('tr');
        var datos = {
            documentType: fila.find('td:eq(1)').text(),
            document: fila.find('td:eq(2)').text(),
            firstNames: fila.find('td:eq(3)').text(),
            firstLastNames: fila.find('td:eq(4)').text(),
            phoneNumber: fila.find('td:eq(5)').text(),
            address: fila.find('td:eq(6)').text(),
            status: fila.find('td:eq(11)').text()
        };
        return datos;
    }

    // Función para llenar el formulario del cliente con los datos de un cliente que ya existe \\
    function llenarFormularioCliente(clienteData) {
        $('#documentType').val(clienteData.documentType);
        $('#document').val(clienteData.document);
        $('#firstNames').val(clienteData.firstNames);
        $('#firstLastNames').val(clienteData.firstLastNames);
        $('#phoneNumber').val(clienteData.phoneNumber);
        $('#address').val(clienteData.address);
        $('#status').val(clienteData.status);
    }

    // Función para obtener el nombre de la persona de una fila //
    function obtenerNombrePersona(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(3)').text() + " " + fila.find('td:eq(5)').text(); // Primer nombre y primer apellido //
        return nombre;
    }

    // Función para eliminar una fila de la tabla //
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Peticion del GET (Buscar), del cliente al Back-end //
    $('#searchCliente').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/customer',
            type: 'GET',
            success: function (response) {
                var filterClientes = response.filter(function (cliente) {
                    return (
                        cliente.id.toString().toLowerCase().includes(searchText) ||
                        cliente.documentType.toLowerCase().includes(searchText) ||
                        cliente.document.toLowerCase().includes(searchText) ||
                        cliente.firstNames.toLowerCase().includes(searchText) ||
                        cliente.firstLastNames.toLowerCase().includes(searchText)
                    );
                });
                actualizarTablasClientes(filterClientes);
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los clientes.");
            }
        });
    });

    function actualizarTablasClientes(cliente) {
        $('#clienteTable tbody').empty();
        clientes.forEach(function (cliente) {
            var fila = '<tr>' +
                '<td>' + cliente.id + '</td>' +
                '<td>' + cliente.documentType + '</td>' +
                '<td>' + cliente.document + '</td>' +
                '<td>' + cliente.firstName + '</td>' +
                '<td>' + cliente.secondName + '</td>' +
                '<td>' + cliente.firstLastName + '</td>' +
                '<td>' + cliente.secondLastName + '</td>' +
                '<td>' + cliente.phoneNumber + '</td>' +
                '<td>' + cliente.mail + '</td>' +
                '<td>' + (cliente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-primary editar-cliente" data-id="' + cliente.id + '">Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-cliente" data-id="' + cliente.id + '">Eliminar</button>' +
                '</td>' +
                '</tr>';
            $('#clienteTable tbody').append(fila);
        });
    }

    $('#clienteTable').on('click', '.editar-cliente', function () {
        var idCliente = $(this).data('id');
        clienteEditandoId = idCliente;
        // Obtener los datos del clientes de la fila correspondiente en la tabla //
        var clienteData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del cliente //
        llenarFormularioCliente(clienteData);
        // Mostrar el modal //
        $('#modalCliente').modal('show');
    });
});