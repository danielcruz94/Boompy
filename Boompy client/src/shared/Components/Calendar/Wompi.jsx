import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"; 
import axios from 'axios';

const WompiButton = ({ amount, TRM }) => {
    const [COP, setCOP] = useState(0);
    const [Factura, setFactur] = useState("0");
    
  const serverURL = useSelector(state => state.serverURL.url);
  const publickey= "pub_test_Jpqg96o9auaU9EVzfMVBS1FTI8bTvnhv";


  function generarFactura(longitud = 6) {
    // Conjunto de caracteres que incluye letras (mayúsculas y minúsculas) y números
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    // Variable para almacenar la combinación generada
    let combinacion = '';
    
    // Genera la combinación aleatoria
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        combinacion += caracteres[indiceAleatorio];
    }
    
    return combinacion;
}

    // Calcular COP cuando amount o TRM cambien
    useEffect(() => {
        const result = Math.round(amount * TRM * 100);
        setCOP(result);
        setFactur(generarFactura(6))
    }, [amount, TRM]);



    // Función para enviar datos al servidor y obtener la firma
    const fetchSignature = async () => {
        // Datos a enviar
        const data = {
            publicKey: publickey,
            currency: 'COP',
            amountInCents: COP,
            reference: Factura
        };

        try {
            const response = await axios.post(`${serverURL}/generate-signature`, data);
            console.log(response.data.signature)
            return response.data.signature;
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            return null;
        }
    };

  


    // Manejar la carga del script de Wompi
    useEffect(() => {
        const loadWompiScript = async () => {
            if (COP > 0) {
                // Obtener la firma de integridad
                const signature = await fetchSignature();
                if (!signature) return;

                // Crear un nuevo script
                const script = document.createElement('script');
                script.src = 'https://checkout.wompi.co/widget.js';
                script.setAttribute('data-render', 'button');
                script.setAttribute('data-public-key', publickey);
                script.setAttribute('data-currency', 'COP');
                script.setAttribute('data-amount-in-cents', COP.toString());
                script.setAttribute('data-reference', Factura);
                script.setAttribute('data-signature:integrity', signature);
               // script.setAttribute('data-redirect-url', "https://192.168.1.51:5173/home");
                

                // Encontrar el div con la clase 'Form-Wompi'
                const container = document.querySelector('.Form-Wompi');
                if (container) {
                    container.appendChild(script);
                }

                // Limpiar el script cuando el componente se desmonte
                return () => {
                    if (container) {
                        container.removeChild(script);
                    }
                };
            }
        };

        loadWompiScript();
   }, [COP]);

    return (
        <form className="Form-Wompi">
            {/* El botón Wompi se agregará dinámicamente aquí */}
        </form>
    );
};

export default WompiButton;
