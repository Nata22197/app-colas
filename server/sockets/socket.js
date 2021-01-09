const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.next();
        
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir un evento llamado: 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
        // actualizar o notificar cambios en los ultimos 4


    });

});