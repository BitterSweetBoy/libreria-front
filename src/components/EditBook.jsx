import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo: "",
    isbn: "",
    fecha_publicacion: "",
    autor_id: "",
  });
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLibro();
    fetchAutores();
  }, [id]);

  const fetchLibro = async () => {
    try {
      const response = await fetch(`https://api-libreria-production-1805.up.railway.app/api/libros/${id}`);
      const data = await response.json();

      if (response.ok) {
        // Asegurar el formato de fecha yyyy-MM-dd
        const fechaFormateada = data.message.fecha_publicacion.split(" ")[0]; // Tomar solo la parte de la fecha
        data.message.fecha_publicacion = fechaFormateada;
        setLibro(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAutores = async () => {
    try {
      const response = await fetch("https://api-libreria-production-1805.up.railway.app/api/autores");
      const data = await response.json();

      if (response.ok) {
        setAutores(data.autores);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://api-libreria-production-1805.up.railway.app/api/libros/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libro),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Libro modificado correctamente");
        navigate(`/libro/${id}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLibro({ ...libro, [name]: value });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Modificar Libro
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Título"
              name="titulo"
              value={libro.titulo}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={libro.isbn}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha de Publicación"
              name="fecha_publicacion"
              type="date"
              value={libro.fecha_publicacion}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              fullWidth
              label="Autor"
              name="autor_id"
              value={libro.autor_id}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {`${autor.nombre} ${autor.apellido}`}
                </option>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!libro.titulo || !libro.isbn || !libro.fecha_publicacion || !libro.autor_id}
            >
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditBook;


