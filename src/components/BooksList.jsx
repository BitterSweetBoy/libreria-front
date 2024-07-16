import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState({});

  useEffect(() => {
    fetchLibros();
    fetchAutores();
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await fetch("https://api-libreria-production-1805.up.railway.app/api/libros");
      const data = await response.json();

      if (response.ok) {
        setLibros(data.libros);
      } else {
        console.error("Error al obtener los libros:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchAutores = async () => {
    try {
      const response = await fetch("https://api-libreria-production-1805.up.railway.app/api/autores");
      const data = await response.json();

      if (response.ok) {
        const autoresMap = {};
        data.autores.forEach((autor) => {
          autoresMap[autor.id] = `${autor.nombre} ${autor.apellido}`;
        });
        setAutores(autoresMap);
      } else {
        console.error("Error al obtener los autores:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {libros.map((libro) => (
          <Grid item key={libro.id} xs={12} sm={6} md={4}>
            <Link to={`/libro/${libro.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ marginTop: "20px" }}>
                <CardMedia
                  component="img"
                  height="300" // Ajusta la altura de la imagen según sea necesario
                  image={libro.img}
                  alt={libro.titulo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {libro.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {autores[libro.autor_id]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ISBN: {libro.isbn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Publicación: {libro.fecha_publicacion}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksList;
