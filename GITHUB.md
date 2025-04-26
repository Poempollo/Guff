# 📘 Guía de Git & GitHub

Una guía práctica para mantener el flujo de trabajo limpio, claro y eficiente en nuestros proyectos.

---

## 📌 Recomendaciones Generales

- Usa `git status` para saber en qué estado te encuentras.
- Haz commits pequeños y claros, enfocados en una única cosa, para que sea más fácil encontrar errores.
- Usa nombres de ramas descriptivos: `feature/login-form`, `fix/navbar`, etc.
- Recomendación: **haz commit → luego pull origin main → luego push**.
- Antes de hacer push, asegúrate de tener tu rama actualizada.

---

## 🔁 Flujo de Trabajo con Ramas

- Iniciar git en tu proyecto:
git init

- Para añadir todos los archivos al repositorio:
git add .

- Comprobar en que rama estás:
git checkout

- Crear nueva rama:
git checkout -b feature/nombre-claro

- Guardar un commit:
git commit -m "login: "añade validación de usuario"

- Revisar la rama main en busca de nuevos cambios:
git pull origin master

- Subir la rama a GitHub:
git push origin feature/nombre-claro

- Crear un pull request desde GitHub para que lo revisemos.
- Cuando se aprueba, hacer merge para actualizar el master

## Conflictos

- Al hacer un merge o pull origin, es posible que Git nos avise que hay algún problema de versiones, un conflicto. Esto nos avisa que algún archivo que nosotros hemos cambiado en nuestra rama, ha cambiado también en main. Git nos mostrará los cambios que hay, editaremos si es necesario nuestro código hasta dejarlo correcto, y continuaremos con el merge o push sin problema.
- ⚠ IMPORTANTE PREGUNTAR ANTES.

## Buenas Prácticas

- Nunca hacer un push directamente a master.
- Usar Pull Request para comprobar todos los cambios y asegurarnos de evitar problemas.
- Usar `git pull origin master --rebase` en caso de que nuestra rama se haya quedado muy atrás.
- Evitar archivos innecesarios con .gitignore.
- Eliminar las ramas que ya hemos mergeado y se han quedado atrás, no van a ser necesarias.

## Comandos útiles

- Iniciar repo
git init

- Añadir archivo
git add archivo

- Hacer commit
git commit -m "mensaje"

- Ver cambios
git status

- Ver ramas
git branch

- Ver historial
git log --oneline --graph

- Cambiar ramas
git checkout nombre-rama

- Crear rama y cambiar
git checkout -b nombre-rama

- Subir cambios
git push origin nombre-rama

- Traer cambios
git pull origin main

- Resolver conflicto
Editar archivo + git add + git commit

- Ver ramas
git branch

- Borrar rama (SOLO CUANDO SE ESTÁ SEGURO DE QUE ESTÁ MERGEADA Y EL DESARROLLO HA CONTINUADO)
git branch -d nombre-de-la-rama

- Para forzarla ya que a veces Git puede creer que no ha mergeado aunque si lo haya hecho, o queramos deshacernos de ella.
git branch -D nombre-de-la-rama

- Para eliminar el registro de una rama remota eliminada que aún aparece en nuestro repositorio local
git fetch -p
