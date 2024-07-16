import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const AddBook = () => {
  const [autores, setAutores] = useState([]);
  const [autorId, setAutorId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [isbn, setIsbn] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    try {
      const response = await fetch("https://api-libreria-production-1805.up.railway.app/api/autores");
      const data = await response.json();

      if (response.ok) {
        setAutores(data.autores);
      } else {
        console.error("Error al obtener los autores:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("autor_id", autorId);
    formData.append("titulo", titulo);
    formData.append("img", imgFile);
    formData.append("isbn", isbn);
    formData.append("fecha_publicacion", fechaPublicacion);

    try {
      const response = await fetch("https://api-libreria-production-1805.up.railway.app/api/libros", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert("Libro agregado con éxito!");
        setAutorId("");
        setTitulo("");
        setImgFile(null);
        setIsbn("");
        setFechaPublicacion("");
        navigate("/");
      } else {
        console.error("Error al agregar el libro:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
    }
  };

  return (
    <Container style={{ paddingTop: "20px", maxWidth: "600px" }}>
      <Typography variant="h4" gutterBottom>
        Agregar Nuevo Libro
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="autor-label">Seleccionar Autor</InputLabel>
          <Select
            labelId="autor-label"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            required
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id}>
                {`${autor.nombre} ${autor.apellido}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              style={{ display: "none" }}
              id="img-upload"
            />
            <label htmlFor="img-upload">
              <Button
                variant="contained"
                component="span"
                color="primary"
                fullWidth
                style={{ height: "100%" }}
              >
                Adjuntar Imagen
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            {imgFile && (
              <Typography variant="body1">
                Archivo adjuntado: {imgFile.name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <TextField
          type="text"
          label="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="date"
          label="Fecha de Publicación"
          value={fechaPublicacion}
          onChange={(e) => setFechaPublicacion(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Agregar Libro
        </Button>
      </form>
    </Container>
  );
};

export default AddBook;

