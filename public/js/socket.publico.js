const socket = io();

// labels
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

// escritorios
const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(resp) {
    actualizaHTML(resp.ultimos4);
});

// ultimos4
socket.on('ultimos4', function(resp) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    actualizaHTML(resp.ultimos4);
});

function actualizaHTML(ultimos4) {

    for (let index = 0; index < ultimos4.length; index++) {
        lblTickets[index].text('Ticket ' + ultimos4[index].numero);
        lblEscritorios[index].text('Escritorio ' + ultimos4[index].escritorio);
        
    }

}