document.addEventListener('DOMContentLoaded', () => {
    const clienteSelect = document.getElementById('clienteSelect');
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

            // Llenar el select con las opciones de clientes
            clientesData.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id; // El valor de la opción será el ID
                option.textContent = `Cliente ID: ${cliente.id}`; // Lo que se muestra al usuario
                clienteSelect.appendChild(option);
            });

            // Si hay al menos un cliente, selecciona el primero por defecto
            if (clientesData.length > 0) {
                clienteSelect.value = clientesData[0].id;
            }

        } catch (error) {
            console.error('No se pudo cargar o procesar el archivo de configuración:', error);
            alert('Error: No se pudo cargar la configuración de clientes. Por favor, revisa la consola para más detalles.');
        }
    }

    // Función para manejar la redirección
    function redirectToClientUrl() {
        const selectedId = clienteSelect.value;
        const selectedClient = clientesData.find(cliente => cliente.id === selectedId);

        if (selectedClient && selectedClient.url) {
            console.log(`Redirigiendo al Cliente ID: ${selectedClient.id} a la URL: ${selectedClient.url}`);
            window.location.href = selectedClient.url; // Redirige a la URL
        } else {
            alert('Por favor, selecciona un ID de cliente válido o la URL no está definida.');
            console.error('ID de cliente no encontrado o URL no definida:', selectedId);
        }
    }

    // Cargar la configuración cuando el DOM esté completamente cargado
    loadConfiguration();

    // Asignar el evento click al botón de continuar
    continuarBtn.addEventListener('click', redirectToClientUrl);
});