export const validateEmail = (email: string) => {
    console.log('Email a validar:', email);  // Ver qué estamos recibiendo como entrada
  
    if (!email.trim()) {
      console.log('Error: Correo vacío');  // Validación para correo vacío
      return "El correo electrónico es obligatorio.";
    }
  
    // Validación de la estructura del correo electrónico:
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log('Error: Correo no válido, no pasa la expresión regular');
      return "El correo electrónico no es válido.";
    }
  
    // Comprobación adicional para asegurarnos que el dominio tenga un punto:
    const parts = email.split('@');
    if (parts.length !== 2 || !parts[1].includes('.')) {
      console.log('Error: Dominio no válido');
      return "El correo electrónico no es válido.";
    }
  
    console.log('Validación exitosa');
    return "";  // Si pasa todas las validaciones, devolvemos una cadena vacía.
  };
  
  