// 1. Una sola declaración de constantes
const getTicketBtn = document.getElementById('getTicketBtn');
const ticketDisplay = document.getElementById('ticketCode');
const statusMessage = document.getElementById('statusMessage');

// 2. Un solo evento de escucha
getTicketBtn.addEventListener('click', async () => {
    ticketDisplay.innerText = "GENERANDO...";
    statusMessage.innerText = "";
    getTicketBtn.disabled = true; // Evita clics dobles

    try {
        const { data, error } = await supabase.rpc('admin_crear_ticket_nuevo');

        if (error) {
            console.error("Error detallado:", error);
            ticketDisplay.innerText = "ERROR";
            statusMessage.style.color = "red";
            statusMessage.innerText = "Error: " + (error.message || "Consulta la consola");
        } else {
            ticketDisplay.innerText = data;
            statusMessage.style.color = "#28a745";
            statusMessage.innerText = "¡Ticket creado exitosamente!";
        }
    } catch (err) {
        console.error("Error inesperado:", err);
    } finally {
        getTicketBtn.disabled = false;
    }
});

// 3. Función de copiado
const copiarTicket = () => {
    const texto = ticketDisplay.innerText;
    if (texto && texto.includes('-')) {
        navigator.clipboard.writeText(texto);
        const originalText = statusMessage.innerText;
        statusMessage.innerText = "¡Copiado al portapapeles!";
        setTimeout(() => { statusMessage.innerText = originalText; }, 2000);
    }
};