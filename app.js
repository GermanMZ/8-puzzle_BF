
var estadoFinal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var arreglos = [];
var hash = {};
var  openList = [];
var  tiempoInicial;
var  tiempofinal;
var  estado = false;
var  pasos = 0;
var contador = 100;
var  counted = 0;
var  consultar = 0;



function revolver(array) {
  var size = array.length;
  var rand;
  for (var i = 1; i < size; i += 1) {
    rand = Math.round(Math.random() * i);
    swap(array, rand, i);
  }
  return array;
}
function estadoSeconds() {
  var now = new Date();
  if (now.getTime() - tiempoInicial.getTime() >= contador) {
    console.log('counted', contador, consultar - counted);
    counted = consultar;
    contador += 100;
  }
}

function Comparar(state) {
  var pos = state.indexOf(0);
  var _state = state.slice();
  _state.splice(pos,1);
  var count = 0;
  for (var i = 0; i < _state.length; i++) {
    for (var j = i + 1; j < _state.length; j++) {
      if (_state[i] > _state[j]) {
        count++;
      }
    }
  }
  return count % 2 === 0;
}

function generarNuevo(state) {
  inicial = [5,7,6,2,1,3,4,0,8]
  let tabla = `Estado Inicial: <table class="default">
              <tr>
                <td>${inicial[0]}</td>
                <td>${inicial[1]}</td>
                <td>${inicial[2]}</td>
              </tr>
              <tr>
                <td>${inicial[3]}</td>
                <td>${inicial[4]}</td>
                <td>${inicial[5]}</td>
              </tr>
              <tr>
                <td>${inicial[6]}</td>
                <td>${inicial[7]}</td>
                <td>${inicial[8]}</td>
              </tr>
              </table>`

  document.getElementById("log").innerHTML+=`${tabla}`;
  return inicial;
}

function movimiento(state, sucesores, pos, steps) {
  var _state, newState;
  newState = state.slice();
  swap(newState, pos, pos + steps);
  if (!compare(newState, state.prev)) {
    _state = newState.join('');
    if (typeof hash[_state] === 'undefined') {
      hash[_state] = newState;
      newState.prev = state;
      newState.manhanttanDistance = Manhattan(newState);
      newState.levels = newState.prev.levels + 1;
      sucesores.push(newState);
    }
  }
}

function swap(state, from, to) {
  var _ = state[from];
  state[from] = state[to];
  state[to] = _;
}

function compare(arr1, arr2) {
  if (!arr1 || !arr2) {
    return false;
  }

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}


function getSuccessors(state) {
  var sucesores = [];
  var pos = state.indexOf(0);
  var fila = Math.floor(pos / 3);
  var columna = pos % 3;
  if (fila > 0) {
    movimiento(state, sucesores, pos, -3);
  }
  if (columna > 0) {
    movimiento(state, sucesores, pos, -1);
  }
  if (fila < 2) {
    movimiento(state, sucesores, pos, 3);
  }
  if (columna < 2) {
    movimiento(state, sucesores, pos, 1);
  }
  return sucesores;
}

function Manhattan(state) {
  var totalDistancia = 0;
  for (var i = 0; i < state.length - 1; i++) {
    if (state[i] !== 0) {
      var realPos = estadoFinal.indexOf(state[i]);
      var realCol = realPos % 3;
      var realRow = Math.floor(realPos / 3);
      var col = i % 3;
      var row = Math.floor(i / 3);
      totalDistancia += (Math.abs(realCol - col) + Math.abs(realRow - row));
    }
  }
  return totalDistancia;
}

function collateSteps(state) {
    let aux = state.splice(0, 9) ;
    arreglos.push([aux]);
    pasos++;
    if (!state.prev) {
      console.log(state, pasos);
      return state;
    }
    collateSteps(state.prev);
  }

function Resolver(state) {
  state.levels = 0;
  state.prev = null;
  openList.push(state);
  while (estado !== true) {
    var currentState = openList.shift();
    consultar++;
    estadoSeconds();
    var successors = getSuccessors(currentState);
    for (var i = 0; i < successors.length; i++) {
      if (compare(estadoFinal, successors[i])) {
        estado = true;
        collateSteps(successors[i]);
        break;
      } else {
        heap(openList, successors[i]);
      }
    }
  }
}

function parent(index) {
  return Math.floor((index - 1) / 2);
}

function heap(state, successor) {
  state.push(successor);
  var node = state.length - 1;
  while (parent(node) >= 0 && node > 0) {
    var parentElement = state[parent(node)];
    var currentElement = state[node];
    var totalWeightA = parentElement.manhanttanDistance + parentElement.levels;
    var totalWeightB = currentElement.manhanttanDistance + currentElement.levels;
    if (totalWeightA >= totalWeightB) {
      swap(state, parent(node), node);
      node = parent(node);
      continue;
    }
    break;
  }
}


function Ejecutar() {
  var puzzle = generarNuevo(estadoFinal);
  tiempoInicial = new Date();
  Resolver(puzzle);
  tiempofinal = new Date();
  arreglos.reverse();
  
  for(var i = 0; i < 20 ; i++ ){
    let tabla = `Movimiento: ${i+1} <table class="default">
    <tr>
      <td>${arreglos[i][0][0]}</td>
      <td>${arreglos[i][0][1]}</td>
      <td>${arreglos[i][0][2]}</td>
    </tr>
    <tr>
      <td>${arreglos[i][0][3]}</td>
      <td>${arreglos[i][0][4]}</td>
      <td>${arreglos[i][0][5]}</td>
    </tr>
    <tr>
      <td>${arreglos[i][0][6]}</td>
      <td>${arreglos[i][0][7]}</td>
      <td>${arreglos[i][0][8]}</td>
    </tr>
    </table>`
     document.getElementById("log").innerHTML+=`${tabla} &rarr; `
     
     setTimeout( function(){

     
     },1000)    

  }
}
Ejecutar();



