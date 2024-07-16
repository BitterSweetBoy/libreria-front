# React + Vite
# Prueba Tecnica

Este proyecto es el componente web de un pequeño aplicativo de manejo de entidades libros y autores utilizando React y una API en Laravel.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- Node.js y npm
- Git
- Editor de código (como Visual Studio Code)

## Configuración del Proyecto

1. **Clonar el Repositorio**
   git clone https://github.com/BitterSweetBoy/libreria-front.git
2. **Instalar dependencias**
   npm install
3. **Ejecutar el app**
   npm run dev
   
## Estructura del Proyecto
  
- **`/src`**: Contiene el código fuente del proyecto.
  
  - **`/src/components`**: Componentes React de la aplicación.
  - Aquí encontraras los componentes
  
  - **`/src/App.jsx`**: Contiene el ejecutable del aplicativo

# Descripción de Componentes

## Componente `BookDetail`

El componente `BookDetail` muestra los detalles de un libro específico, incluyendo el título, autor, ISBN, fecha de publicación y una opción para eliminar el libro.

## Componente `BooksList`

El componente `BooksList` muestra una lista de libros disponibles. Cada libro en la lista puede ser seleccionado para ver detalles completos.

## Componente `AddBook`

El componente `AddBook` proporciona un formulario para añadir nuevos libros a la base de datos. Incluye campos para el título del libro, ISBN, fecha de publicación y selección de autor.

## Componente `EditBook`

El componente `EditBook` permite modificar los detalles de un libro existente, como el título, ISBN, fecha de publicación y el autor asociado.
