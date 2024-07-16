import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLibro();
  }, [id]);

  const fetchLibro = async () => {
    try {
      const response = await fetch(`https://api-libreria-production-1805.up.railway.app/api/libros/${id}`);
      const data = await response.json();

      if (response.ok) {
        setLibro(data.message);
        fetchAutor(data.message.autor_id);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAutor = async (autorId) => {
    try {
      const response = await fetch(`https://api-libreria-production-1805.up.railway.app/api/autores/${autorId}`);
      const data = await response.json();

      if (response.ok) {
        setAutor(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api-libreria-production-1805.up.railway.app/api/libros/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        alert("Libro eliminado correctamente");
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!libro || !autor) {
    return <CircularProgress />;
  }

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <CardMedia
              component="img"
              height="550px"
              image={libro.img}
              alt={libro.titulo}
              style={{ objectFit: "contain", maxWidth: "100%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "left", height: "100%" }}>
            <CardContent style={{ flex: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                {libro.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${autor.nombre} ${autor.apellido}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ISBN: {libro.isbn}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de Publicación: {libro.fecha_publicacion}
              </Typography>
              <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/libro/${id}/editar`}
                    style={{ marginRight: "10px" }}
                  >
                    Modificar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;

