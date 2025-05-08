# GUÍA DE DESARROLLO - GUFF CON REACT

## Estructura del proyecto

El proyecto está organizado para mantener el código limpio y modular. Cada carpeta dentro de `src/` tiene una responsabilidad clara:

### `/components`
Contiene componentes reutilizables que pueden ser usados en varias pantallas. Estos componentes deben ser lo más independientes posible y recibir datos por props.

### `/navigation`
Aquí va todo lo relacionado con la navegación de la app (usando React Navigation). Se definen los stacks, tabs o cualquier estructura de navegación.

### `/screens`
Contiene las vistas principales de la app. Cada vista tiene su propia carpeta (por ejemplo, `login`, `signup`, `home`, etc.) donde se agrupa:
- El archivo principal de la vista (`*Screen.tsx`)
- Los formularios o subcomponentes específicos de esa vista (`*Form.tsx`, etc.)
- Un archivo opcional de info para documentar esa vista (`infoScreens.txt`)

### `/services`
Aquí se colocan las funciones o clases que se encargan de la lógica externa, como llamadas a APIs, manejo de datos, etc.

### `/styles`
Contiene los archivos de estilos centralizados (`*.ts`) para mantener separados los estilos del código de lógica y vistas.

### `/utils`
Utilidades o funciones auxiliares que ayudan a resolver tareas comunes, como formatear fechas, validar campos, etc.

---

Otras carpetas importantes:

- `assets/`: imágenes y recursos estáticos.
- `.expo/`: configuraciones internas de Expo.
- `App.tsx`: punto de entrada de la app, donde se monta la navegación principal.
- `index.ts`: entrada raíz que llama a `registerRootComponent`.
- `/constants`: Agrupa y centraliza todos aquellos valores estáticos que luego se consumen en distintos componentes o pantallas de la aplicación.
- `/hooks`: Agrupa la lógica de estado y de efectos que se quieren reutilizar entre componentes.

Archivos importantes:
- `package.json`: dependencias del proyecto.
- `tsconfig.json`: configuración de TypeScript.
- `README.md`, `TODO.md`, `CHANGELOG.md`: documentación y seguimiento del proyecto.

---

## Fundamentos básicos de React y React Native

### ¿Qué es React?
React es una librería de JavaScript creada por Meta (Facebook) para construir interfaces de usuario. Está basada en componentes reutilizables, que pueden tener su propio estado y lógica.

### ¿Y React Native?
React Native es un framework basado en React que permite crear **aplicaciones móviles nativas** para Android y iOS usando JavaScript/TypeScript. No genera una web embebida: los componentes se traducen a elementos nativos reales (como `<View>`, `<Text>`, etc.).

### ¿Y qué es Expo?
Expo es una herramienta que simplifica mucho el desarrollo con React Native:
- Te permite probar la app en el móvil con un QR.
- Evita tener que instalar Android Studio o Xcode al principio.
- Viene con muchas utilidades listas para usar (permisos, cámara, notificaciones...).

- Se inicia con:
npx create-expo-app guff

- Para arrancar el proyecto
npx expo start -- o -- npm start

## ¿Como programar en React Native?
### Componentes
Todo en React son componentes, se crean como funciones
    const MiComponente = () => {
        return (
            <View>
            <Text>¡Hola!</Text>
            </View>
        );
    };

Se escriben en JSX (similar a HTML pero en JS/TS), tienen componentes nativos como:
- <View> como un div
- <Text> para textos
- <TextInput>, <Button> etc.

Variables y lógica
    const nombre = "Javi";
    const edad = 20;

Condicionales
- No existe en React un if como tal usamos:
    {edad >= 18 ? <Text>Adulto</Text> : <Text>Menor</Text>}
- El operador ternario -> (condicion ? siEsVerdadero : SiEsFalso); Puede usarse && en lugar de ? si queremos mostrar algo cuando sólo se cumple una condición:
    {loggedIn && <Text>Bienvenido</Text>}
 

Bucles y Listas
- Para renderizar esa lista de elementos, usamos .map():
    {mascotas.map((mascota) => (
        <Text key={mascota.id}>{mascota.nombre}</Text>
    ))}
- Cada elemento debe tener una key única.

Estados (useState)
- Se usan para guardar valores que cambian y hacen que el componente se actualice:
    const [contador, setContador] = useState(0);
- contador es la variable, setContador es la función que la cambia. Al cambiar el estado, React re renderiza el componente.

- Nunca cambiamos el estado directamente (contador ++).
- Si cambias de estado dentro de un bucle o por dependencia, cuidado con los renderizados infinitos:
    <Button title="Sumar" onPress={() => setContador(contador +1)}/>
    <Text>{contador}</Text>

## Sintaxis útil en JSX
- {} Para meter código JS/TS dentro de JSX, para mostrar una variable o una condición.
- () Para envolver JSX si lo devuelves desde una función en el return.
- [] Para arrays, por ejemplo al hacer .map().
- ? Para condicionales ternarios.
- && Para condicionales simples.

## ¿Que necesitamos para empezar?
- Tener instalado node.js.
- Instalar Expo CLI:
    `npm install -g expo-cli`

