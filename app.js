const getTicketBtn = document.getElementById('getTicketBtn');
const ticketDisplay = document.getElementById('ticketCode');

getTicketBtn.addEventListener('click', async () => {
    ticketDisplay.innerText = "Generando nuevo ticket...";

    // Llamamos a la función RPC que creamos en Supabase
    const { data, error } = await supabase.rpc('admin_crear_ticket_nuevo');

    if (error) {
        console.error("Error creando ticket:", error);
        ticketDisplay.innerText = "Error al generar";
        
        // Tip: Si te da error 403, revisa los permisos de RLS o la definición SECURITY DEFINER
    } else {
        // 'data' contendrá directamente el string del ticket (ej: ABCD-1234-EFGH)
        ticketDisplay.innerText = data;
        console.log("Nuevo ticket creado con éxito:", data);
    }
});
const getTicketBtn = document.getElementById('getTicketBtn');
const ticketDisplay = document.getElementById('ticketCode');
const statusMessage = document.getElementById('statusMessage');

getTicketBtn.addEventListener('click', async () => {
    ticketDisplay.innerText = "GENERANDO...";
    statusMessage.innerText = "";

    const { data, error } = await supabase.rpc('admin_crear_ticket_nuevo');

    if (error) {
        console.error("Error:", error);
        ticketDisplay.innerText = "ERROR";
        statusMessage.style.color = "red";
        statusMessage.innerText = "No se pudo conectar con la base de datos";
    } else {
        ticketDisplay.innerText = data;
        statusMessage.style.color = "#28a745";
        statusMessage.innerText = "¡Ticket creado exitosamente!";
    }
});

const copiarTicket = () => {
    const texto = ticketDisplay.innerText;
    if (texto.includes('-')) {
        navigator.clipboard.writeText(texto);
        const originalText = statusMessage.innerText;
        statusMessage.innerText = "¡Copiado al portapapeles!";
        setTimeout(() => { statusMessage.innerText = originalText; }, 2000);
    }
};