# Proyecto Ingeniería de Software III: Habla Barrio

![image](https://github.com/MrsblR/HablaBarrio/blob/main/resources/logo_hablabarrio.jpg)

## Introducción

Bienvenido a la documentación del proyecto Habla Barrrio. Este proyecto tiene como objetivo desarrollar una aplicación que permita a los usuarios reportar y gestionar incidentes relacionados con problemas en calles y vecindarios, mejorando así la comunicación entre los ciudadanos y las autoridades responsables de solucionar estos problemas.

## Características Principales

- Registro de Usuarios: Los usuarios pueden crear una cuenta para acceder a la aplicación y reportar incidentes.
- Reporte de Incidentes: Los usuarios pueden reportar incidentes, proporcionando detalles como título, descripción, ubicación y categoría.
- Seguimiento de Incidentes: Los usuarios pueden ver el estado actual de los incidentes reportados y recibir actualizaciones sobre su resolución.
- Comentarios y Fotos: Los usuarios pueden realizar comentarios en los incidentes reportados y adjuntar fotos para brindar más información.
- Prioridades y Categorías: Se implementa un sistema de prioridades y categorías para clasificar y gestionar los incidentes de manera eficiente.

## Tecnologías Utilizadas

- Lenguaje de Programación: Javascript
- Base de Datos: Postgresql
- Frameworks y Librerías: Node
- Herramientas de Desarrollo: Visual Studio Code

## Instalación

1. Clona el repositorio: `git clone https://github.com/MrsblR/HablaBarrio.git`
2. Instala las dependencias: `npm install`
3. Configura la base de datos: 
4. Inicia la aplicación: `npm start`


## Trello 
https://trello.com/b/Y4vAd4em/isproyecto

## Diapositivas
https://docs.google.com/presentation/d/1rDKBu72RHyMCvHiXea6aNmPAnlZRbmF0z_12ZkhtUks/edit#slide=id.g16ad101df4b_0_89

## Diagrama de Casos de Uso
![image](https://github.com/MrsblR/HablaBarrio/blob/main/resources/cun.jpg)

## Diagrama de Arquitectura

## Base de Datos

### Tablas

La base de datos consta de las siguientes tablas:

1. **Usuarios**: Almacena la información de los usuarios registrados, incluyendo su nombre, correo electrónico y contraseña.

2. **Incidentes**: Almacena la información de los incidentes reportados por los usuarios. Esta tabla incluye campos como el ID del usuario que reporta el incidente, categoría del incidente, prioridad, título, descripción, ubicación, fecha de reporte y estado actual del incidente.

3. **Comentarios**: Almacena los comentarios realizados en relación a los incidentes reportados. Esta tabla registra el ID del incidente, el ID del usuario que realiza el comentario, el contenido del comentario y la fecha en que se realiza.

4. **Categorias**: Almacena las categorías de incidentes disponibles. Cada categoría tiene un ID y un nombre descriptivo.

5. **Prioridades**: Almacena las prioridades asignadas a los incidentes. Cada prioridad tiene un ID y un nombre descriptivo.

6. **Fotos**: Almacena la información de las fotos adjuntas a los incidentes. Esta tabla registra el ID del incidente al que pertenece la foto, el nombre del archivo y la ruta de almacenamiento.

### Relaciones

Las tablas están relacionadas entre sí mediante claves foráneas para mantener la integridad de los datos. A continuación se presentan las relaciones establecidas:

- La tabla "Incidentes" tiene claves foráneas que se refieren a la tabla "Usuarios" para el ID del usuario que reporta el incidente, a la tabla "Categorias" para la categoría del incidente y a la tabla "Prioridades" para la prioridad del incidente.

- La tabla "Comentarios" tiene claves foráneas que se refieren a la tabla "Incidentes" para el ID del incidente al que se refiere el comentario y a la tabla "Usuarios" para el ID del usuario que realiza el comentario.

- La tabla "Fotos" tiene una clave foránea que se refiere a la tabla "Incidentes" para el ID del incidente al que pertenece la foto.

### Diagrama de Base de Datos

![image](https://github.com/MrsblR/HablaBarrio/blob/main/resources/bd_diagram.png)


## Funcionalidades

 - [X] Iniciar sesión.
 - [X] Cerrar sesión.
 - [X] Ver reportes
 - [X] Hacer reportes
 - [X] Eliminar reportes
 - [X] Editar reportes
 - [X] Crear Usuario
 - [x] Eliminar usuario
 - [X] Ver reportes por estado
 - [x] Ver reportes por fecha
  


## Wireframes



![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/home_f.png)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp1.PNG)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp2.PNG)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp3.PNG)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp4.PNG)


![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp5.PNG)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/rp6.PNG)


![image](https://github.com/MrsblR/HablaBarrio/assets/79772873/865dc2ae-922e-4762-85a3-08114d1a322f)


![image](https://github.com/MrsblR/HablaBarrio/assets/79772873/12440e26-056b-45dd-b355-1581aefcea37)

![image](https://github.com/MrsblR/HablaBarrio/blob/main/wireframes/iniciar.PNG)

