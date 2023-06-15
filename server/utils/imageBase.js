function esImagenBase64(variable) {
    // Expresión regular para validar el formato base64 de una imagen
    const regex = /^data:image\/(jpeg|jpg|png|gif);base64,/i;
  
    return regex.test(variable);
  }
  module.exports = {esImagenBase64};