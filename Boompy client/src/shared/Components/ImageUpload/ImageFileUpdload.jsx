import React, { useState } from 'react';
import axios from 'axios'; // Importa axios
import LoaderIcon from '../../../assets/ajax-loader.gif';

const ImageFileUpload = ({ id, text, onChange, description, url, accept, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(url || '');

  const fileInputRef = React.createRef();

  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      if (!files.length) return;

      // Crear vista previa local de la imagen seleccionada
      const fileUrl = URL.createObjectURL(files[0]);
      setImageUrl(fileUrl);

      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'ih5terca');

      setIsLoading(true);

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/danielcruz/image/upload',
        data
      );

      if (res.status !== 200) {
        throw new Error('Failed to upload image');
      }

      const cloudinaryFileUrl = res.data.secure_url;

      setImageUrl(cloudinaryFileUrl); // Actualizar la URL de la imagen con la de Cloudinary
      onChange(cloudinaryFileUrl); // Llamar a onChange con la nueva URL

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-picture" onClick={handleImageClick}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Foto de perfil"
              className="rounded-circle"
              style={{ marginBottom: '10px', cursor: 'pointer' }}
            />
          ) : (
            <div className="profile-image">
              <img src="/Capa_1.png" alt="Imagen de perfil" />
            </div>
          )}
        </div>

        <div className="inner-container">
          <input
            type="file"
            id={id}
            ref={fileInputRef}
            accept={accept}
            {...props}
            onChange={uploadImage}
            style={{ display: 'none' }}
          />
          <label>
            {!isLoading && text}
          </label>

          {isLoading && (
            <div>
              <img src={LoaderIcon} alt="Loading" />
            </div>
          )}
        </div>

        {/*description && <p>{description}</p>*/}
      </div>
    </div>
  );
};

export default ImageFileUpload;
