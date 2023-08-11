// Parámetros del algoritmo genético
const objetivo = "Ho";
const tamañoPoblacion = 100;
const tasaMutacion = 0.01;

// Función para generar una cadena aleatoria
function generarCadenaAleatoria(longitud) {
  let cadena = "";
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ,.!";
  for (let i = 0; i < longitud; i++) {
    cadena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  
  return cadena;
}

// Función para evaluar la aptitud (fitness) de una cadena
function evaluarAptitud(cadena) {
  let aptitud = 0;
  for (let i = 0; i < cadena.length; i++) {
      //console.log(cadena[i] + '= ' + objetivo[i]);
    if (cadena[i] === objetivo[i]) {
      aptitud++;
    }
  }
  return aptitud;
}

// Función para realizar el cruce entre dos cadenas
function cruzar(padre, madre) {
  const puntoCruce = Math.floor(Math.random() * padre.length);
  const hijo = padre.substring(0, puntoCruce) + madre.substring(puntoCruce);
  //console.log('Hijo: ' +hijo);
  return hijo;

}

// Función para aplicar mutación a una cadena
function mutar(cadena) {
  let cadenaMutada = "";
  for (let i = 0; i < cadena.length; i++) {
    if (Math.random() < tasaMutacion) {
      cadenaMutada += generarCadenaAleatoria(1);
    } else {
      cadenaMutada += cadena[i];
    }
  }
  return cadenaMutada;
}

// Función principal del algoritmo genético
function algoritmoGenetico() {
  let poblacion = [];

  // Inicializar población aleatoria
  for (let i = 0; i < tamañoPoblacion; i++) {
    poblacion.push(generarCadenaAleatoria(objetivo.length));
  }

  let generaciones = 0;
  let encontrado = false;

  while (!encontrado) {
    // Evaluar aptitud de la población actual
    const aptitudes = poblacion.map(cadena => ({ cadena, aptitud: evaluarAptitud(cadena) }));

    // Ordenar población por aptitud descendente
    aptitudes.sort((a, b) => b.aptitud - a.aptitud);

    // Si se encuentra la cadena objetivo, detener el algoritmo
    if (aptitudes[0].aptitud === objetivo.length) {
      encontrado = true;
      console.log("Generación:", generaciones);
      console.log("Cadena encontrada:", aptitudes[0].cadena);
    }

    // Seleccionar padres para cruce (torneo binario)
    const padres = [];
    for (let i = 0; i < tamañoPoblacion / 2; i++) {
      const padreIndex = Math.floor(Math.random() * tamañoPoblacion);
      const madreIndex = Math.floor(Math.random() * tamañoPoblacion);
      const padre = aptitudes[padreIndex].cadena;
      const madre = aptitudes[madreIndex].cadena;
      padres.push({ padre, madre });
    }

    // Realizar cruce y mutación para generar nueva población
    const nuevaPoblacion = [];
    for (let i = 0; i < padres.length; i++) {
      const hijo1 = cruzar(padres[i].padre, padres[i].madre);
      const hijo2 = cruzar(padres[i].madre, padres[i].padre);
      nuevaPoblacion.push(mutar(hijo1));
      nuevaPoblacion.push(mutar(hijo2));
    }

    //console.log('Generacion: ' + generaciones);
    //console.log(nuevaPoblacion);
    poblacion = nuevaPoblacion;
    generaciones++;
  }
}

// Ejecutar el algoritmo genético
algoritmoGenetico();
