import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"; 
import axios from 'axios';

const WompiButton = ({ amount, TRM, Factura }) => {
    const [COP, setCOP] = useState(0);
    

    const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
    
  const serverURL = useSelector(state => state.serverURL.url);
  const publickey= "pub_prod_NdBSvCs74XuJQbzhHzdO2zVoszUZBrgY";

    // Calcular COP cuando amount o TRM cambien
    useEffect(() => {
        const result = Math.round(amount * TRM * 100);
        setCOP(result);        
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
              
                const signature = await fetchSignature();
                if (!signature) return;             
              
                const script = document.createElement('script');
                script.src = 'https://checkout.wompi.co/widget.js';
                script.setAttribute('data-render', 'button');
                script.setAttribute('data-public-key', publickey);
                script.setAttribute('data-currency', 'COP');
                script.setAttribute('data-amount-in-cents', COP.toString());
                script.setAttribute('data-reference', Factura);
                script.setAttribute('data-signature:integrity', signature);
                script.setAttribute('data-signature:integrity', signature);
                script.setAttribute('data-customer-data:full-name', userData.name);
                script.setAttribute('data-customer-data:email', userData.email);              
                               
                const container = document.querySelector('.Form-Wompi');
                if (container) {
                    container.appendChild(script);
                }

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
           
        </form>
    );
};

export default WompiButton;
