const Colores = ["Azul", "Verde", "Amarillo","Rojo","Morado", "Gris", "Blanco", "Negro"]

document.addEventListener("DOMContentLoaded", function() {
  // Generar un ID de partida aleatorio
  var gameId = generateGameId();

  // Mostrar el ID de partida en la sala de espera
  var gameIdElement = document.getElementById("gameId");
  if (gameIdElement) {
    gameIdElement.textContent = gameId;
  }
});

// Generar un ID de partida aleatorio
function generateGameId() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gameId = "";

  for (var i = 0; i < 10; i++) {
    gameId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return gameId;

}


// Obtener el contenedor de los jugadores
var playersContainer = document.getElementById("playersContainer");

// Obtener el número de jugadores seleccionado
let numeroJugadores = localStorage.getItem("numeroJugadores"); // Aquí deberás obtener el número de jugadores seleccionado en la pantalla de configuración de partida

// Verificar si hay un número de jugadores almacenado
if (numeroJugadores) {
    // Generar los elementos HTML para los jugadores según el número almacenado
    for (let i = 1; i <= numeroJugadores; i++) {
        // Crear el elemento de jugador
        let playerElement = document.createElement("div");
        playerElement.classList.add("player");
          // Crear la imagen del jugador
          let playerImage = document.createElement("img");
          playerImage.src = "../img/peepo.jpg"; // Reemplaza con la ruta correcta de las fotos
          playerImage.alt = "Foto del Jugador " + i;

          // Crear el nombre del jugador
          let playerName = document.createElement("span");
          playerName.textContent = "Jugador " + i; //AQUI tengo que obtener el nombre del jugador o lo dejamos como jugador 1,2,3... y ya fue.
          
          let inputColor= document.createElement("select")
          for(let x of Colores){
            let colorOption= document.createElement("option");
            colorOption.value= x;
            colorOption.text = x;
            colorOption.id = "player"+i+x;

            inputColor.appendChild(colorOption);
          }
          // Agregar la imagen y el nombre al elemento de jugador
          playerElement.appendChild(playerImage);
          playerElement.appendChild(inputColor);
          playerElement.appendChild(playerName);

          // Agregar el elemento de jugador al contenedor
          playersContainer.appendChild(playerElement);
    }
  } else {
    // Código para manejar el caso en el que no hay un número de jugadores almacenado
  }


// Obtener referencia al botón de "Volver al Menú de configuraciones"
const startButtom = document.getElementById("startButton");

// Agregar evento de clic al botón
startButtom.addEventListener("click", () => {
  // Redireccionar a la página principal
  //TODO: Cambiar redireccionamiento
  window.location.href = "../Tablero/tablero.html" ; //AQUI VA EL ARCHIVO DEL TABLERO
});

// Obtener referencia al botón de "Volver al Menú de configuraciones"
const backButton = document.getElementById("backButton");

// Agregar evento de clic al botón
backButton.addEventListener("click", () => {
  // Redireccionar a la página principal
  window.location.href = "../html/index.html";
});
  
// Obtener el número de Caras seleccionado
var numCaras = localStorage.getItem("numCaras");

// Obtener el número de Dados seleccionado
var numDados = localStorage.getItem("numDados");
