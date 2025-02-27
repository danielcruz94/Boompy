import axios from 'axios';

/**
 * Obtiene la hora UTC actual desde la API externa
 * @returns {Promise<string>} Fecha y hora UTC en formato ISO
 * @throws {Error} Si ocurre un error en la solicitud o en la respuesta
 */
export async function TimeUTC() {
    try {
        const response = await axios.get('https://www.timeapi.io/api/Time/current/zone?timeZone=UTC');

        // Verificar si la respuesta HTTP es correcta
        if (response.status !== 200) {
            throw new Error(`Error HTTP ${response.status}: No se pudo obtener la hora UTC`);
        }

        // Verificar si los datos están correctamente definidos
        if (!response.data || !response.data.dateTime) {
            throw new Error('La respuesta de la API no contiene la propiedad dateTime');
        }

        return response.data.dateTime;
    } catch (error) {
        // Diferenciar errores de red, HTTP y estructura de datos
        if (error.response) {
            console.error(`Error en la solicitud HTTP: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            console.error('Error de conexión: No se recibió respuesta del servidor');
        } else {
            console.error('Error desconocido en TimeUTC:', error.message);
        }
        throw error; // Relanzar el error para que pueda manejarse en otro nivel
    }
}
