const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let sancochos = [
    { id: 1, nombre: 'Sancocho de gallina', ingredientes: ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Gallina"] },
    { id: 2, nombre: 'Sancocho de costilla', ingredientes: ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Costilla de res"] },
    { id: 3, nombre: 'Sancocho trifásico', ingredientes: ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Costilla de res", "Pollo", "Carne de cerdo"] },
    { id: 4, nombre: 'Sancocho de pescado', ingredientes: ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Pezcado sierra"] }
];

/*
BIENVENIDA DE LA API
*/
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de SancochoDev 🍲');
});

/*
OBTENER TODOS LOS SANCOCHOS - GET
*/
app.get('/sancochos', (req, res) => {
    //Error interno del servidor (simulación)
    try {
        //No hay sancochos disponibles
        if (sancochos.length === 0) {
            return res.status(204).json({ error: "No hay sancochos disponibles" });
        }

        //Lista de sancochos obtenida correctamente
        return res.status(200).json(sancochos);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

/*
OBTENER UN SANCOCHO POR ID - GET
*/
app.get('/sancochos/:id', (req, res) => {
    const id = Number(req.params.id); //Aquí convertimos el ID en número.
    const sancocho = sancochos.find(s => s.id === id);

    if(!sancocho){
        return res.status(404).json({error: 'Ese sancocho no existe.'});
    }else{
        res.status(202).json(sancocho)
    }
});

/*
AGREGAR/CREAR UN SANCOCHO - POST
*/
app.post('/sancochos', (req, res) => {
    const { nombre, ingredientes } = req.body;

    //Error si faltan datos
    if (!nombre || !ingredientes || !Array.isArray(ingredientes)) {
        return res.status(400).json({ error: "Nombre e ingredientes son obligatorios y los ingredientes deben ser un array." });
    }

    //Error si el sancocho ya existe (por nombre)
    const sancochoExistente = sancochos.find(sancochos => sancochos.nombre.toLowerCase() === nombre.toLowerCase());
    if (sancochoExistente) {
        return res.status(409).json({ error: "El sancocho ya existe." });
    }

    //Crear un nuevo sancocho
    const nuevoSancocho = { id: sancochos.length + 1, ...req.body };
    sancochos.push(nuevoSancocho);
    return res.status(201).json({mensaje: 'Sancocho creado con éxito', sancocho: nuevoSancocho});
});

/*
COMER UN SANCOCHO - DELETE
*/
app.delete('/sancochos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const sancocho = sancochos.find(s => s.id === id);
    //sancochos = sancochos.filter(s => s.id != req.params.id);
    if(!sancocho){
        return res.status(404).json({error: 'Ese sancocho no existe.'})
    }else{
        sancochos = sancochos.filter(s => s.id !== id);
        res.status(200).json({ mensaje: 'Que sancocho tan poderoso...'});
    }
});

//Esto es para mostrar el mensaje de prueba.
app.listen(port, () => {
    console.log(`El servidor de prueba está corriendo en http://localhost:${port}`);
});

/*
MODIFICAR LOS INGREDIENTES DE UN SANCOCHO - PATCH
*/
app.patch('/sancochos/:id', (req, res) => {
    const id = Number(req.params.id); //Aquí convertimos el ID en número.
    const { ingredientes } = req.body;

    const sancocho = sancochos.find(s => s.id === id); //Buscamos por ID

    if(!sancocho){ //Por si no existe el sancocho.
        return res.status(404).json( {error: 'Ese sancocho no lo tenemos.' });
    }

    if(!ingredientes || !Array.isArray(ingredientes)){ //Validación de ingredientes
        return res.status(400).json( { error: 'Los ingredientes deben ser un array.' });
    }

    sancocho.ingredientes = ingredientes;
    res.status(200).json({ mensaje: `Ingredientes actualizados`, sancocho});
});

/*
MODIFICAR TODO UN SANCOCHO - PUT
*/
app.put('/sancochos/:id', (req, res) => {
    const id = Number(req.params.id); //Convertimos la ID en Número.
    const { nombre, ingredientes } = req.body;

    const index = sancochos.findIndex(s => s.id === id); //Buscamos el índice.

    if(index === -1){ //Por si el sancocho no Existe.
        return res.status(404).json( { error: 'Ese sancocho no lo tenemos.' });
    }

    if(!nombre || !Array.isArray(ingredientes)){
        return res.status(400).json( { error: 'Escribe bien el nombre y los ingredientes. Los ingredientes deben ser un array.'})
    }

    sancochos[index] = {nombre, ingredientes};
    res.status(200).json( {mensaje: 'Sancocho modificado con Éxito!'});
});