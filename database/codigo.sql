CREATE DATABASE db_hablabarrio
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Crear la tabla "Usuarios" para almacenar la información de los usuarios registrados
CREATE TABLE Usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  contrasena VARCHAR(100)
);

-- Crear la tabla "Categorias" para almacenar las categorías de incidentes
CREATE TABLE Categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

-- Crear la tabla "Prioridades" para almacenar las prioridades de los incidentes
CREATE TABLE Prioridades (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

-- Crear la tabla "Incidentes" para almacenar la información de los incidentes reportados
CREATE TABLE Incidentes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES Usuarios(id),
  categoria_id INTEGER REFERENCES Categorias(id),
  prioridad_id INTEGER REFERENCES Prioridades(id),
  titulo VARCHAR(100),
  descripcion TEXT,
  ubicacion VARCHAR(100),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20),
  FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
  FOREIGN KEY (categoria_id) REFERENCES Categorias(id),
  FOREIGN KEY (prioridad_id) REFERENCES Prioridades(id)
);

-- Crear la tabla "Comentarios" para almacenar los comentarios realizados en los incidentes
CREATE TABLE Comentarios (
  id SERIAL PRIMARY KEY,
  incidente_id INTEGER REFERENCES Incidentes(id),
  usuario_id INTEGER REFERENCES Usuarios(id),
  contenido TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (incidente_id) REFERENCES Incidentes(id),
  FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Crear la tabla "Fotos" para almacenar las fotos adjuntas a los incidentes
CREATE TABLE Fotos (
  id SERIAL PRIMARY KEY,
  incidente_id INTEGER REFERENCES Incidentes(id),
  nombre_archivo VARCHAR(100),
  ruta_archivo VARCHAR(200),
  FOREIGN KEY (incidente_id) REFERENCES Incidentes(id)
);
