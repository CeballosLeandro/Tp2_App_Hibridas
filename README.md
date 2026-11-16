# Vivi Show
## Integrantes
- Ceballos Leandro
- Mijael Ayala
## Tecnologías utilizadas

- React
- JavaScript
- Vite
- React Router
- CSS
- Lucide React
- LocalStorage
- Archivos JSON para los datos iniciales

## Funcionalidades

### Usuarios

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Persistencia de sesión al recargar la página.
- Validación de campos obligatorios y control de datos.

### Catálogo

- Visualización de películas y series.
- Búsqueda por título y director.
- Filtrado por tipo, categoría y año.
- Paginación de resultados.
- Detalle de cada contenido.

### Favoritos

- Agregar y quitar contenidos de favoritos.
- Listado de contenidos favoritos.
- Favoritos independientes para cada usuario.

### Panel administrativo

- Acceso exclusivo para administradores.
- CRUD de películas, categorias y series.

## Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@vivi.com | admin123 |
| Usuario común | usuario@vivi.com | usuario123 |

## Instalación y ejecución

### Requisitos

- Node.js instalado.
- npm instalado.

### Pasos

1. Clonar repositorio:

   ```bash
   git clone URL_DEL_REPOSITORIO
   ```

2. Ingresar a la carpeta del proyecto:

   ```bash
   cd vivi-show
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el proyecto:

   ```bash
   npm run dev
   ```

## Capturas de pantalla

### Inicio y catálogo

![Página de inicio](public/capturas/inicio.png)

### Detalle de contenido

![Detalle de película o serie](public/capturas/detalle.png)

### Mis favoritos

![Página de favoritos](public/capturas/favoritos.png)

### Inicio de sesión

![Página de inicio de sesión](public/capturas/login.png)

### Panel administrativo

![Panel administrativo](public/capturas/admin.png)