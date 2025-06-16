document.addEventListener('DOMContentLoaded', () => {
    const clienteInput = document.getElementById('clienteInput');
    const continuarBtn = document.getElementById('continuarBtn');
    let clientesData = []; // To store client data

    // Function to load the configuration.json file
    async function loadConfiguration() {
        try {
            const response = await fetch('configuration.json');
            if (!response.ok) {
                throw new Error(`Error al cargar configuration.json: ${response.statusText}`);
            }
            const config = await response.json();
            clientesData = config.clientes; // Store the client data

            // Ensure the input starts empty
            clienteInput.value = '';

        } catch (error) {
            console.error('No se pudo cargar o procesar el archivo de configuración:', error);
            alert('Error: No se pudo cargar la configuración de clientes. Por favor, revisa la consola para más detalles.');
        }
    }

    // Function to handle redirection
    function redirectToClientUrl() {
        const enteredId = clienteInput.value.trim(); // Get the input value and trim whitespace

        // Find the client that exactly matches the entered ID
        const selectedClient = clientesData.find(cliente => cliente.id === enteredId);

        if (selectedClient && selectedClient.url) {
            console.log(`Redirigiendo al Cliente ID: ${selectedClient.id} a la URL: ${selectedClient.url}`);
            window.location.href = selectedClient.url; // Redirect to the URL
        } else {
            alert(`El ID de cliente "${enteredId}" no es válido o no existe. Por favor, ingresa un ID correcto.`);
            console.error('ID de cliente no encontrado o URL no definida:', enteredId);
        }
    }

    // Load configuration when the DOM is fully loaded
    loadConfiguration();

    // Assign the click event to the continue button
    continuarBtn.addEventListener('click', redirectToClientUrl);

    // Optional: Also add a 'keydown' event for 'Enter' key to redirect
    clienteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            redirectToClientUrl();
        }
    });
});