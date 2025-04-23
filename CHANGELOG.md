# Changelog

## [v0.0.3.1] - 2025-04-23 - Javier
## Added
- Añadida la carpeta "styles/" que incluye los estilos propios de las vistas, y theme.ts.
- theme.ts añade estilos generales para la aplicación como color de background o primario.

## [v0.0.3] - 2025-04-23 - Javier
## Added
- Añadida la dependencia React Navigation para el manejo de la navegación: npx expo install @react-navigation/native @react-navigation native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler.
- Creada la carpeta "home/" en "screens/" y un archivo HomeScreen.tsx genérico.
- App.tsx ahora gestiona la navegación entre vistas, primero aparece el Login, y luego el Home.
## Fixed
- Había un hook (renderizado) que sólo funcionaba a partir del primer renderizado, por tanto el orden y cantidad de renderizados es distinto y falla. Es muy importante esto ya que es lo que más suele fallar, y lo que si entendemos correctamente, más mejorará el rendimiento.


## [v0.0.2.1] - 2025-04-23 - Javier
## Added
- Añadida la carpeta "login/" dentro de "screens/" para la gestión de la vista de inicio de sesión.
- LoginForm.tsx que reparte el trabajo y divide los componentes para mejorar el rendimiento y evitar tantos rerenderizados.
- LoginStyles.ts que engloba todos los estilos del inicio de sesión, para dejar más limpios los .tsx.
- TODO.md para apuntar mejoras, revisiones y errores que deban ser revisados y solucionados.
## Improved
- LoginScreen.tsx, mejorado el rendimiento interno.

## [v0.0.2] - 2025-04-22 - Raul
## Added
- Añadido ventana inicio sesión.
- Añadido import fuente montserrat.
- Añadida funcionalidad para que se ejecute en la web.

# Initial Configuration
## [v0.0.1] - 2025-04-21 - Javier
## Added
- Organización de carpetas básica con "src/" y sus subcarpetas "components/", "navigation/", "screens/", "services/" y "utils/".
- CHANGELOG.md para la documentación de versiones.
- README.md con información relevante sobre la app Guff.
- LICENSE con la licencia y derechos de autor de nuestra aplicación.
  