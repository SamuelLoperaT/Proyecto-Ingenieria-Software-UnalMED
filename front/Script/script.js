function guardarCaracteristicas() {
  var numeroJugadores = document.getElementById("numeroJugadores").value; 
  var numDados = document.getElementById("numDados").value;
  var numCaras = document.getElementById("numCaras").value;

  // Validar que los campos estén completos
  if (numeroJugadores === "" || numDados === "" || numCaras === "") {
    alert("Para continuar, selecciona el número de jugadores, dados y caras deseados.");
    return;
  }

  // Guardar el número de jugadores en el almacenamiento local
  localStorage.setItem("numeroJugadores", numeroJugadores);

  // Guardar el número de dados en el almacenamiento local
  localStorage.setItem("numDados", numDados);

  // Guardar el número de caras en el almacenamiento local
  localStorage.setItem("numCaras", numCaras);

  // Redireccionar a la página de sala de espera
  window.location.href = "../html/sala-de-espera.html"; // Reemplaza con la ruta correcta de la página de sala de espera
}

// Obtener referencia al botón de iniciar partida
var btnIniciarPartida = document.getElementById("btnIniciarPartida");

// Agregar evento de clic al botón
btnIniciarPartida.addEventListener("click", function() {
  // Obtener los valores de los campos
  var numeroJugadores = document.getElementById("numeroJugadores").value;
  var numDados = document.getElementById("numDados").value;
  var numCaras = document.getElementById("numCaras").value;

  // Validar que los campos estén completos
  if (numeroJugadores === "" || numDados === "" || numCaras === "") {
    alert("Para continuar, selecciona el número de jugadores, dados y caras deseados.");
    return;
  }

  // Guardar los valores en el almacenamiento local
  localStorage.setItem("numeroJugadores", numeroJugadores);
  localStorage.setItem("numDados", numDados);
  localStorage.setItem("numCaras", numCaras);

  // Redireccionar a la página de sala de espera
  window.location.href = "../html/sala-de-espera.html";
});

  