import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './PrivacyPolicy.css';

// Markdown content as a template string
const deletephone = `
### Instrucciones para Eliminar las Imágenes Descargadas de Instagram

## 1. Inicie sesión en la plataforma

Acceda a su cuenta utilizando sus credenciales habituales.

## 2. Acceda a su perfil

Dirígete a la sección de perfil y ubique el botón “Change” en la parte inferior.

## 3. Seleccione la nueva imagen de perfil

Haga clic en el botón “Change” para comenzar el proceso de actualización.

## 4. Busque y elija la imagen deseada

Navegue por sus archivos o seleccione la imagen por la que desea cambiar la imagen que se descargó de Instagram.

## 5. Confirme la selección

Haga clic en “Aceptar” para confirmar su elección.

## 6. Proceso de actualización y eliminación de la imagen descargada de Instagram

La nueva imagen se actualizará en su perfil. Tenga en cuenta que al seleccionar una nueva foto, la imagen antigua que se había almacenado desde Instagram será eliminada permanentemente de nuestra base de datos.

**Nota:** Esta funcionalidad está disponible exclusivamente para usuarios con rol de tutor.

`;

const delete_phone = () => {
  return (
    <div className="privacy-policy-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{deletephone}</ReactMarkdown>
    </div>
  );
};

export default delete_phone;
