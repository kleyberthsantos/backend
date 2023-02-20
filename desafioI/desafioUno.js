class TicketManager {

  //variable privada, se usa #nombreVariablePrivada
  #precioBaseGanancia = 0.15;

  constructor() {
      this.eventos = [];
  }

  //método “getEventos”
  getEventos = () => {
      return this.eventos;
  }

  //método “agregarEvento” y parametros
  agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) => {
      const evento = {
          nombre,
          lugar,
          precio: precio+precio*this.#precioBaseGanancia,
          capacidad,
          fecha,
          participantes: []
      }

      //campo id autoincrementable
      if (this.eventos.length === 0) {
          evento.id = 1;
      } else {
          evento.id = this.eventos[this.eventos.length - 1].id + 1;
      }

      this.eventos.push(evento);
  }

  //método “agregarUsuario” y parametros
  agregarUsuario = (idEvento, idUsuario) => {
      const eventoIndex = this.eventos.findIndex(e=>e.id === idEvento);

      //evaluación si el evento existe
      if (eventoIndex === -1) {
          console.log('Evento no encontrado');
          return;
      }

      //valida si usuario está registrado
      const usuarioRegistrado = this.eventos[eventoIndex].participantes.includes(idUsuario);
      if (usuarioRegistrado) {
          console.log('usuario ya registrado');
          return;
      }

      this.eventos[eventoIndex].participantes.push(idUsuario);
  }
}

const manejadorEventos = new TicketManager();
manejadorEventos.agregarEvento('Carrera Cerro Abajo 2023', 'Chile, Valparaiso', 120000);
manejadorEventos.agregarUsuario(1, 2);
manejadorEventos.agregarEvento('Carrera Nevados de Chillan', 'Chile, Chillan', 90500.30);
console.log(manejadorEventos.getEventos());