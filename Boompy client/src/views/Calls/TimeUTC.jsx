import axios from 'axios';

export async function TimeUTC() {
    try {
        const response = await axios.get('https://www.timeapi.io/api/Time/current/zone?timeZone=UTC');
        if (response.status !== 200) {
            throw new Error('Error al obtener la hora UTC desde el servidor');
        }        
        return response.data.dateTime; 
    } catch (error) {
        console.error('Error al obtener la hora UTC:', error);
        throw error; 
    }
}
