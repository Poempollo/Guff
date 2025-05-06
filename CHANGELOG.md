# Changelog

### [v0.2.5.4] - 2025-05-06 - Javier
#### Improved
- Añadida funcionalidad al botón de cerrar sesión em los ajustes.

### [v0.2.5.3] - 2025-05-06 - Javier
#### Improved
- Mejorada la interfaz para los ajustes, y sus vistas legales, ya no aparece la barra fea en la parte superior.

### [v0.2.5.2] - 2025-05-06 - Javier
#### Added
- Añadida la vista de Ajustes, con otras vistas legales. Simplemente front, aún no conecta con la api.

### [v0.2.5.1] - 2025-05-06 - Javier
#### Added
- Preparado el funcionamiento de la splash screen personalizada.

### [v0.2.5] - 2025-05-06 - Javier
#### Added
- Spinners en los botones de inicio de sesión, que deshabilitan al botón, y que terminan de cargar cuanfo finaliza el proceso. Sin problemas de rendimiento, discretos.
#### Improved
- Ahora, al abrir la aplicación, no se abre directamente el teclado, he eliminado los autofocus en todas las vistas.

### [v0.2.4.1] - 2025-05-05 - Javier
#### Added
- Integrado otro campo en el signup, para que compruebe la contraseña que hemos puesto, el campo de repetir. Errores añadidos, sin fallos.

### [v0.2.4] - 2025-05-05 - Javier
#### Deleted
- Cambios en el SignUp para evitar que guarde el campo nombre, ya que este no va a ser necesario. 

### [v0.2.3] - 2025-05-02 - Javier
#### Added
- Añadida una función que hace que la vista de cambiar contraseña, envíe un correo electrónico. Falta la parte del cambio, un front que lo gestione y un back que modifique la BD.
- Manejo de errores para la vista de forgotpassword screen.

### [v0.2.2] - 2025-05-02 - Javier
#### Improved
- Mejoras en la experiencia de usuario, ahora hay diferenciación de errores en las vistas de entrada a la aplicación. Tenemos un error para credenciales incorrectas, y otro para cuando el servidor no está disponible.
- Mejoras en la experiencia de usuario en las vistas de registro y contraseña olvidada, faltaban atributos para esas vistas que hacían que se fuese pasando de un campo al siguiente con un 'enter'.
- Ahora aparecen más claramente los mensajes de error.

### [v0.2.1] - 2025-05-01 - Javier
#### Improved
- Ahora tanto la vista de registro, como la de contraseña olvidada detectan toques fuera del teclado o un input, y cierran el teclado del dispositivo.
- La vista de contraseña olvidada, ahora muestra también el logo de la app.

## Minor Update
### [v.0.2.0] - 2025-04-30 - Raul & Javier
#### Added
- Conexión del Login y SignUp con la API.
- Añadido para crear logo de la app.
- Insertado en carpeta "assets" logo.
- Sustituido Text y lo que tenia, por una imagen.
- Inicio de sesión desde la api hacia el backend desplegado en Railway correcto.
- Errores de credenciales más visibles desde la vista de inicio de sesión
#### Improved
- Mejorado el funcionamiento interno de la vista de Login y SignUp.
- Mejoras en la UX y la experiencia de usuario en Login y SignUp. Ahora al pulsar fuera de un input o el teclado, este se cierra. Al volver a escribir tras un error en las credenciales, el borde rojo del input, se va, así como el mensaje de error.

### [v0.1.2] - 2025-04-29 - Javier
#### Added
- Manejo de la API desde el front hacia el back. 
- Carpeta /src/api/ con un authApi.ts.
- Mejoras en la licencia y el readme.

## [v0.1.1] - 2025-04-28 - Raul
#### Added
- Añadido menú principal de Guff, también se ha creado dos archivos más dentro de la carpeta /home, que son ProfileSettings y SettingsScreen.
- Se ha creado un archivo BottomTabsNavigator, que su funcionalidad es crear botones, en este caso se ha creado los botones de Home, Perfil y Configuración, se ha seguido la misma estructura que LoginForm y LoginScreen manteniendo los mismos colores.
- En la carpeta /styles se han creado 3 archivos .ts (HomeScreenStyles, ProfileStyles y SettingsStyles), básicamente se ha creado para poder añadir sombras, colores y la misma fuente que se ha usado en los logins.
- Hemos tenido que instalar previamente librerias, para poder personalizar el menú principal y que sea animado, esto es (- npm install @react-navigation/native @react-navigation/native-stack - npm install react-native-reanimated).
- Para poder agregar react-native-reanimated, se ha tenido que crear un nuevo archivo .js llamado babel.config.js en la raiz del proyecto.
- En el archivo App.tsx se ha añadido lo siguiente:
  - import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
  - Profile: undefined;
    Settings: undefined;
  - <Stack.Screen name="Home" component={BottomTabsNavigator} /> 

## Minor Update
### [v0.1.0] - 2025-04-25 - Javier
#### Added
- Interfaz, navegación, y vistas para toda la entrada a la aplicación, vista de inicio de sesión, registro, y recuperación de contraseña.
- Añadido un fichero de validación de credenciales.
- Estilos de la aplicación.
- Estructura general del proyecto.
- Archivos de ayuda sobre git, github y react con información útil sobre el proyecto.

### [v0.0.4.1] - 2025-04-25 - Javier
#### Added
- useFormValidations.ts ahora incluye validaciones para contraseña, nombre y nombre de usuario, para ser reutilizables por todas las vistas que trabajan con credenciales.
### Improved
- Las validaciones para los archivos SignUp ahora son mejores, se comprueba más, de manera más encapsulada y mejor.

### [v0.0.4] - 2025-04-25 - Javier
#### Added
- useFormValidations.ts en "src/utils", esta clase se encargará de comprobar que el inicio de sesión está bien formado, mandado errores al usuario en el caso de que su correo electrónico no sea correcto.
### Improved
- Clases ForgotPassword, ahora estas manejan mejor los errores, y tienen más comprobaciones en el input por el usuario de su correo electrónico.

### [v0.0.3.5] - 2025-04-25 - Javier
#### Added
- REACT.md con información útil sobre la construcción del proyecto, y una pequeña guía sobre como trabajar con React Native.
### Improved
- GITHUB.md con más información útil.

### [v0.0.3.4] - 2025-04-24 - Raul
#### Added
- Añadido vista de contraseña olvidada, ForgotPasswordScreen, siguiendo la misma estructura que los dos Logins.
- Añadido también el componente reutilizable FogotPasswordForm que muestra formulario para recuperar contraseña.
### [v0.0.3.3] - 2025-04-24 - Javier
#### Added
- Añadido un archivo GITHUB.md como pequeña guía para el uso de GIT y GITHUB con comandos útiles, flujo de trabajo y recomendaciones.

### [v0.0.3.2] - 2025-04-23 - Javier
#### Added
- Añadida la vista de Registro, SignUpScreen.tsx, siguiendo la misma estructura que el Login.
- Añadidad el componente de formulario de registro, para mejorar rendimiento.

### [v0.0.3.1] - 2025-04-23 - Javier
#### Added
- Añadida la carpeta "styles/" que incluye los estilos propios de las vistas, y theme.ts.
- theme.ts añade estilos generales para la aplicación como color de background o primario.

### [v0.0.3] - 2025-04-23 - Javier
#### Added
- Añadida la dependencia React Navigation para el manejo de la navegación: npx expo install @react-navigation/native @react-navigation native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler.
- Creada la carpeta "home/" en "screens/" y un archivo HomeScreen.tsx genérico.
- App.tsx ahora gestiona la navegación entre vistas, primero aparece el Login, y luego el Home.
#### Fixed
- Había un hook (renderizado) que sólo funcionaba a partir del primer renderizado, por tanto el orden y cantidad de renderizados es distinto y falla. Es muy importante esto ya que es lo que más suele fallar, y lo que si entendemos correctamente, más mejorará el rendimiento.


### [v0.0.2.1] - 2025-04-23 - Javier
#### Added
- Añadida la carpeta "login/" dentro de "screens/" para la gestión de la vista de inicio de sesión.
- LoginForm.tsx que reparte el trabajo y divide los componentes para mejorar el rendimiento y evitar tantos rerenderizados.
- LoginStyles.ts que engloba todos los estilos del inicio de sesión, para dejar más limpios los .tsx.
- TODO.md para apuntar mejoras, revisiones y errores que deban ser revisados y solucionados.
#### Improved
- LoginScreen.tsx, mejorado el rendimiento interno.

### [v0.0.2] - 2025-04-22 - Raul
#### Added
- Añadido ventana inicio sesión.
- Añadido import fuente montserrat.
- Añadida funcionalidad para que se ejecute en la web.

# Initial Configuration
### [v0.0.1] - 2025-04-21 - Javier
#### Added
- Organización de carpetas básica con "src/" y sus subcarpetas "components/", "navigation/", "screens/", "services/" y "utils/".
- CHANGELOG.md para la documentación de versiones.
- README.md con información relevante sobre la app Guff.
- LICENSE con la licencia y derechos de autor de nuestra aplicación.
  