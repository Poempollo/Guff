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

export const validateName = (name: string) => {
    if (!name.trim()) return "El nombre es obligatorio";
    if (name.length < 2) return "El nombre debe tener al menos 2 caracteres";
    return "";
};

export const validateUsername = (username: string) => {
    if(!username.trim()) return "El nombre de usuario es obligatorio";
    if (username.length < 4) return "El nombre de usuario debe tener al menos 4 caracteres";
    return "";
}

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_/-]{8,}$/;
    password = password.trim(); //Elimina los espacios al principio y al final.
    if (!password.trim()) return "La contraseña es obligatoria";
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!passwordRegex.test(password)) return "La contraseña debe contener al menos una mayúscula, una minúcula y un número ";
    return "";
}
  
  