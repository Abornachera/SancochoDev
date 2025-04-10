# API de SancochoDev 🍲

Esta API permite gestionar sancochos y fue creada con el propósito de practicar la lógica de un CRUD en una API REST, incluyendo el manejo de endpoints, status codes y respuestas JSON.

---

## 📌 Requisitos

### 🛠 Instalación de Node.js

1. **Usuarios de Windows**
   - Descarga e instala Node.js desde [aquí](https://nodejs.org/es).

2. **Usuarios de macOS**
   - Instala **nvm** (Node Version Manager):
     ```bash
     brew install nvm
     ```
   - Luego, instala la última versión LTS de Node.js:
     ```bash
     nvm install --lts
     ```

---

### 🚀 Instalación de Express

Para instalar **Express.js**, ejecuta el siguiente comando en la terminal:

```bash
npm install express
```

### 🔄 Instalación de Nodemon (Opcional)

Para instalar **Nodemon** debemos ejecutar en la terminal lo siguiente:

```bash
npm install -g nodemon
```

---

## ⚡ Iniciar el Servidor

1. **Usando Node** (No se actualizan los cambios automáticamente).

```bash
node sancochosAPI.js
```

2. **Usando Nodemon** (Los cambios se actualizan automáticamente).

```bash
nodemon sancochosAPI.js
```

---

## 🏠 Bienvenida de la API

Al iniciar el servidor con Node.js o Nodemon, la API estará disponible en:

🔗 [http://localhost:3000](http://localhost:3000)

Al acceder, verás el siguiente mensaje de bienvenida:

```plaintext
Bienvenido a la API de SancochoDev 🍲
```

---

## 📌 Endpoints

### 1️⃣ Obtener todos los sancochos

**GET** `/sancochos`

✅ **Respuesta exitosa (200 OK):**

```json
[
  { "id": 1, "nombre": "Sancocho de gallina", "ingredientes": ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Gallina"] },
  { "id": 2, "nombre": "Sancocho de costilla", "ingredientes": ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Costilla de res"] }
]
```

❌ **No hay datos (204 No content):**

```json
{ "error": "No hay sancochos disponibles" }
```

---

### 2️⃣ Obtener un sancocho por ID

**GET** `/sancochos/{id}`

✅ **Respuesta exitosa (200 OK):**

```json
{ "id": 1, "nombre": "Sancocho de gallina", "ingredientes": ["Yuca", "Papa", "Platano", "Cilantro", "Pimienta de Olor", "Mazorca", "Auyama", "Cebollín", "Apio", "Ají", "Caldo de gallina", "Ajo", "Gallina"] }
```

❌ **Error (404 Not Found):**

```json
{ "error": "Ese sancocho no existe." }
```

---

### 3️⃣ Agregar un sancocho

**POST** `/sancochos`

📤 **Solicitud:**

```json
{
  "nombre": "Sancocho de mondongo",
  "ingredientes": ["Yuca", "Papa", "Zanahoria", "Mazorca", "Plátano verde", "Cebollín", "Ajo", "Aji pimentón", "Comino", "Pimienta de olor", "Mondongo", "Cilantro"]
}
```

✅ **Respuesta exitosa (201 Created):**

```json
{ 
  "mensaje": "Sancocho creado con éxito", "sancocho": { "id": 5, "nombre": "Sancocho de mondongo",
  "ingredientes": ["Yuca", "Papa", "Zanahoria", "Mazorca", "Plátano verde", "Cebollín", "Ajo", "Aji pimentón", "Comino", "Pimienta de olor", "Mondongo", "Cilantro"] } 
}
```

❌ **Errores:**

- `400 Bad Request` → Datos faltantes o incorrectos.
- `409 Conflict` → Ese sancocho ya existe.

---

### 4️⃣ Modificar los ingredientes de un sancocho

**PATCH** `/sancochos/{id}`

📤 **Solicitud:**

```json
{
  "ingredientes": ["Papa", "Yuca", "Ñame", "Zanahoria", "Mazorca", "Plátano verde", "Cebollín", "Ajo", "Gallina criolla"]
}
```

✅ **Respuesta exitosa (200 OK):**

```json
{ 
  "mensaje": "Ingredientes actualizados", "sancocho": { "id": 1, "nombre": "Sancocho de gallina", "ingredientes": ["Papa", "Yuca", "Ñame", "Zanahoria", "Mazorca", "Plátano verde", "Cebollín", "Ajo", "Gallina criolla"] } 
}
```

❌ **Errores:**

- `404 Not Found` → Ese sancocho no lo tenemos.
- `400 Bad Request` → Ingredientes mal escritos.

---

### 5️⃣ Modificar un sancocho completo

**PUT** `/sancochos/{id}`

📤 **Solicitud:**
```json
{
  "nombre": "Sancocho de Andrés",
  "ingredientes": ["Yuca", "Papa", "Bocadillo", "Aguacate", "Malteada de Aguacate", "Arepa Asada", "Banano", "Queso", "Chin de picante"]
}
```

✅ **Respuesta exitosa (200 OK):**

```json
{ "mensaje": "Sancocho modificado con éxito" }
```

❌ **Errores:**

- `404 Not Found` → Ese sancocho no lo tenemos.
- `400 Bad Request` → Datos mal ingresados.

---

### 6️⃣ Comer (eliminar) un sancocho

**DELETE** `/sancochos/{id}`

✅ **Respuesta exitosa (200 OK):**

```json
{ "mensaje": "Que sancocho tan poderoso..." }
```

❌ **Error (404 Not Found):**

```json
{ "error": "Ese sancocho no existe." }
```

## 📌 Autor Anderson Bornachera Balaguera

Creado por **SancochoDev** 🍲
