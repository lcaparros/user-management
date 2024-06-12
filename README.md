# user-management

This is a JS module for adding basic user management to your ExpressJS project.

## Using the module in an already existing project

1. Add `user-management` as a dependency (you can do it from npm registry or simply copy the files to your project directory)
2. Import the module and use it in your main server

```javascript
import express from 'express';
import userManagement from 'user-management';
import dotenv from 'dotenv';

dotenv.config(); // Ensure you have dotenv properly configured if necessary

const app = express();

app.use(express.json());

// Use user-management module
app.use('/api', userManagement);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

Agrega user-management como una dependencia (podrías publicarlo en un registro de npm privado o simplemente copiar los archivos al proyecto).
Importa y usa el módulo en tu servidor principal: