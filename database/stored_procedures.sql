CREATE OR REPLACE PROCEDURE RegistrarIncidente(
  p_usuario_id INTEGER,
  p_titulo VARCHAR(100),
  p_descripcion TEXT,
  p_ubicacion VARCHAR(100),
  p_estado VARCHAR(20)
)
AS $$
BEGIN
  INSERT INTO Incidentes (usuario_id, titulo, descripcion, ubicacion, estado)
  VALUES (p_usuario_id, p_titulo, p_descripcion, p_ubicacion, p_estado);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE AgregarComentario(
  p_incidente_id INTEGER,
  p_usuario_id INTEGER,
  p_contenido TEXT
)
AS $$
BEGIN
  INSERT INTO Comentarios (incidente_id, usuario_id, contenido)
  VALUES (p_incidente_id, p_usuario_id, p_contenido);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ObtenerIncidentesPorEstado(
  p_estado VARCHAR(20)
)
AS $$
BEGIN
  SELECT * FROM Incidentes WHERE estado = p_estado;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ActualizarEstadoIncidente(
  p_incidente_id INTEGER,
  p_estado VARCHAR(20)
)
AS $$
BEGIN
  UPDATE Incidentes SET estado = p_estado WHERE id = p_incidente_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE EliminarIncidente(
  p_incidente_id INTEGER
)
AS $$
BEGIN
  DELETE FROM Comentarios WHERE incidente_id = p_incidente_id;
  DELETE FROM Incidentes WHERE id = p_incidente_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ObtenerCantidadIncidentesPorCategoria()
AS $$
BEGIN
  SELECT c.nombre, COUNT(*) AS cantidad
  FROM Incidentes i
  INNER JOIN Categorias c ON i.categoria_id = c.id
  GROUP BY c.nombre;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE ObtenerComentariosPorIncidente(
  IN p_incidente_id INTEGER
)
AS
$$
BEGIN
  SELECT * FROM Comentarios WHERE incidente_id = p_incidente_id;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ActualizarEstadoIncidente(
  IN p_incidente_id INTEGER,
  IN p_estado VARCHAR(20)
)
AS
$$
BEGIN
  UPDATE Incidentes SET estado = p_estado WHERE id = p_incidente_id;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ObtenerIncidentesPorCategoria(
  IN p_categoria_id INTEGER
)
AS
$$
BEGIN
  SELECT * FROM Incidentes WHERE categoria_id = p_categoria_id;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ObtenerIncidentes()
AS
$$
BEGIN
  SELECT * FROM Incidentes;
END;
$$
LANGUAGE plpgsql;


