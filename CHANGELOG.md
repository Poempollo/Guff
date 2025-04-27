# Changelog

## [v0.1.1] - 2025-04-28 - Raul
#### Added
- Añadido menú principal de Guff, también se ha creado dos archivos más dentro de la carpeta /home, que son ProfileSettings y SettingsScreen.
- Se ha creado un archivo BottomTabsNavigator, que su funcionalidad es crear botones, en este caso se ha creado los botones de Home, Perfil y Configuración, se ha seguido la misma estructura que LoginForm y LoginScreen manteniendo los mismos colores.
- En la carpeta /styles se han creado 3 archivos .ts (HomeScreenStyles, ProfileStyles y SettingsStyles), básicamente se ha creado para poder añadir sombras, colores y la misma fuente que se ha usado en los logins.
- Hemos tenido que instalar previamente librerias, para poder personalizar el menú principal y que sea animado, esto es (- npm install @react-navigation/native @react-navigation/native-stack
         - npm install react-native-reanimated).
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
  