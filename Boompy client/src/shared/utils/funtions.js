export function convertirMonedaANumero(cadenaMoneda) {
    // Eliminar cualquier espacio en blanco y convertir a minúsculas
    const cadenaLimpia = cadenaMoneda.trim().toLowerCase();
  
    // Utilizar una expresión regular para extraer el número
    const numero = cadenaLimpia.match(/\d+/)[0];
  
    // Convertir el número a un decimal con dos cifras decimales
    const numeroDecimal = parseFloat(numero).toFixed(2);
  
    return numeroDecimal;
  }
  


  export  function formatDateToSpanish(isoDate) {
    const date = new Date(isoDate);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  }

  