
import axios from 'axios';

export async function TimeUTC() {
    try {
        const response = await axios.get('https://worldtimeapi.org/api/ip');
        if (response.status !== 200) {
            throw new Error('Error al obtener la hora UTC desde el servidor');
        }
        const horaUTC = response.data.utc_datetime;
        return horaUTC;
    } catch (error) {
        console.error('Error al obtener la hora UTC:', error);
        throw error; 
    }
}
