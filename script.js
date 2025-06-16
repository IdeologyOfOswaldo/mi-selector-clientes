document.addEventListener('DOMContentLoaded', () => {
    const clienteInput = document.getElementById('clienteInput'); // Ahora es un input
    const clientesList = document.getElementById('clientesList'); // El datalist
    const continuarBtn = document.getElementById('continuarBtn');
    let clientesData = []; // Aquí almacenaremos los datos de los clientes

    // Función para cargar el archivo configuration.json
    async function loadConfiguration() {
        try {
            const response = await fetch('configuration.json');
            if (!response.ok) {
                throw new Error(`Error al cargar configuration.json: ${response.statusText}`);
            }
            const config = await response.json();
            clientesData = config.clientes; // Guardamos los datos de los clientes

            // Llenar el datalist con las opciones de IDs de clientes
            // Cada option en un datalist tiene solo un 'value'
            // El texto que se muestra es el mismo que el valor
            clientesData.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id; // El valor de la opción (lo que se muestra y lo que se selecciona)
                // option.textContent = `Cliente ID: ${cliente.id}`; // Esto no es necesario para datalist
                clientesList.appendChild(option);
            });

            // --- ESTA ES LA LÍNEA QUE REMOVIMOS O COMENTAMOS ---
            // Opcional: Si quieres que el primer ID esté preseleccionado al cargar
            // if (clientesData.length > 0) {
            //     clienteInput.value = clientesData[0].id;
            // }
            // --- FIN DE LA MODIFICACIÓN ---

            // Aseguramos que el input esté vacío al inicio (aunque por defecto ya lo estaría si no hay valor asignado)
            clienteInput.value = '';

        } catch (error) {
            console.error('No se pudo cargar o procesar el archivo de configuración:', error);
            alert('Error: No se pudo cargar la configuración de clientes. Por favor, revisa la consola para más detalles.');
        }
    }

    // Función para manejar la redirección
    function redirectToClientUrl() {
        const enteredId = clienteInput.value; // Obtener el valor actual del input

        // Buscar el cliente que coincida exactamente con el ID ingresado
        const selectedClient = clientesData.find(cliente => cliente.id === enteredId);

        if (selectedClient && selectedClient.url) {
            console.log(`Redirigiendo al Cliente ID: ${selectedClient.id} a la URL: ${selectedClient.url}`);
            window.location.href = selectedClient.url; // Redirige a la URL
        } else {
            alert(`El ID de cliente "${enteredId}" no es válido o la URL no está definida. Por favor, selecciona uno de la lista o corrige el ID.`);
            console.error('ID de cliente no encontrado o URL no definida:', enteredId);
        }
    }

    // Cargar la configuración cuando el DOM esté completamente cargado
    loadConfiguration();

    // Asignar el evento click al botón de continuar
    continuarBtn.addEventListener('click', redirectToClientUrl);

    // Opcional: También puedes añadir un evento 'keydown' para que al presionar 'Enter' también se redirija
    clienteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            redirectToClientUrl();
        }
    });
});