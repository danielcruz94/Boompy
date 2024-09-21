import { useState, useEffect } from 'react';
import { MiniImage } from "../Cards.style";

const SmallImage = ({ photos }) => {
  const [loadedPhotos, setLoadedPhotos] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const promises = photos.map(photo =>
        new Promise(resolve => {
          const img = new Image();
          img.src = photo;
          img.onload = () => resolve(photo);
          img.onerror = () => resolve(null); // En caso de error, sigue cargando las demás
        })
      );

      const results = await Promise.all(promises);
      setLoadedPhotos(results.filter(photo => photo !== null));
    };

    loadImages();
  }, [photos]);

  return (
    <MiniImage>
      {loadedPhotos[0] && (
        <img
          src={loadedPhotos[0]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(-20px, 15px)",
            border: "2px solid #161439",
            filter: 'grayscale(1)'
          }}
          alt="imgPeque"
        />
      )}
      {loadedPhotos[1] && (
        <img
          src={loadedPhotos[1]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(20px, -70px)",
            border: "2px solid #161439",
          }}
          alt="imgPeque"
        />
      )}
      {loadedPhotos[2] && (
        <img
          src={loadedPhotos[2]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(75px, -130px)",
            border: "2px solid #161439",
          }}
          alt="imgPeque"
        />
      )}
    </MiniImage>
  );
};

export default SmallImage;
