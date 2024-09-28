
# Vue 3 + Vite - Aplicación de Vista Previa de Libros

Este proyecto es una aplicación sencilla para subir y previsualizar libros en formato PDF. Está construida utilizando Vue 3 y Vite para el frontend, y Express para el backend, que maneja los datos de los libros y genera vistas previas.

## Funcionalidades

- **Vue 3 con Vite**: El frontend utiliza Componentes de Archivo Único (SFC) de Vue 3 y Vite, lo que ofrece un desarrollo rápido y un flujo de trabajo eficiente.
- **Backend con Express.js**: El backend sirve archivos PDF estáticos y proporciona una API para generar una vista previa del contenido del libro.
- **Análisis de PDFs**: La aplicación utiliza `pdf-parse` para extraer y mostrar una vista previa de los primeros 1000 caracteres de cada archivo PDF.
- **CORS Activado**: CORS está habilitado para una comunicación fluida entre el frontend y el backend.
- **Soporte para PDFs Locales y Remotos**: El backend puede obtener PDFs de enlaces remotos o archivos locales ubicados en el directorio `/public/pdfs/`.

## Cómo Funciona

1. Los libros se añaden a un archivo JSON (`public/tech-resources-database.json`) que contiene metadatos (título, autor, enlace, etc.).
2. El backend recupera los detalles del libro y genera vistas previas al analizar las primeras páginas de cada PDF.
3. La vista previa se sirve al frontend, donde puede verse junto con los metadatos del libro (por ejemplo, título, autor).

## Cómo Añadir Libros

Los libros se almacenan en la carpeta `public/pdfs/` o se enlazan de forma remota desde URLs. Para agregar un libro, actualiza el archivo `tech-resources-database.json` de la siguiente manera:

```json
{
  "educationalResources": [
    {
      "slug": "guia-estructura-datos-algoritmos",
      "title": "Guía de Estructura de Datos y Algoritmos",
      "link": "/pdfs/libro.pdf",
      "tags": ["Estructura de Datos", "Algoritmos"],
      "type": "Guía",
      "language": "Español"
    }
  ]
}
```

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/CamiloEscar/app-libros.git
   cd book-preview-app
   ```

2. **Instalar dependencias** para el frontend y el backend:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor backend**:
   ```bash
   node server.js
   ```

4. **Ejecutar el frontend Vue 3**:
   ```bash
   npm run dev
   ```

5. Accede a la aplicación en [http://localhost:5173](http://localhost:5173) para ver las vistas previas de los libros.

## Dependencias

- **Frontend**:
  - Vue 3
  - Vite

- **Backend**:
  - Express
  - CORS
  - pdf-parse
  - node-fetch

## Libros de Ejemplo

Aquí tienes algunos libros de ejemplo incluidos en la aplicación:

- [Guía de Estructura de Datos y Algoritmos](https://media.licdn.com/dms/document/media/D561FAQFoCQWvMEsEUg/feedshare-document-pdf-analyzed/0/1726905349236)
- [The Road to React 2023](https://media.licdn.com/dms/document/media/D561FAQHZcRAo262EgQ/feedshare-document-pdf-analyzed/0/1726890961338)
- [Guía de programación Python](https://media.licdn.com/dms/document/media/D561FAQF2dKnhddFtSQ/feedshare-document-pdf-analyzed/0/1726885704109)
- [Libro blanco de Inteligencia Artificial Generativa](https://media.licdn.com/dms/document/media/D4E1FAQFknmhXHZNJ_Q/feedshare-document-pdf-analyzed/0/1726877196683)
- [El Gran Ajedrez para Pequeños Ajedrecistas](https://media.licdn.com/dms/document/media/D4E1FAQEtT_jthjYkKA/feedshare-document-pdf-analyzed/0/1726806784385)

## Funcionalidades Futuras

- Autenticación de usuarios y gestión de roles
- Búsqueda y filtrado mejorado de libros por etiquetas, idioma y tipo
- Soporte ampliado para otros formatos de documentos como `.epub`

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
