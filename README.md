# User Management Module

This module allows you to manage users (login, registration, permission groups, etc.) in an ExpressJS backend. With it, you can easily add user management functionality to your existing project.

## Installation

You can install the module from npm or copy the files to your project.

### Installation from npm

```sh
npm install @lcaparros/user-management
```

### Manual Installation

1. Clone the repository or download the files.
2. Copy the files to your project.
3. Make sure to install the necessary dependencies:

```sh
npm install express jsonwebtoken mongoose bcryptjs
```

## Usage

### Configuration

1. Create a `.env` file at the root of your project with the following variables:

```
JWT_SECRET=your_jwt_secret_key
```

2. Import and use the module in your Express application:

```js
import express from 'express';
import mongoose from 'mongoose';
import { authRoutes, userRoutes } from '@lcaparros/user-management'; // Or the relative path if you copied the files

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use authentication and user routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Role Verification Middleware

You can protect your endpoints by adding the `authorizeRoles` middleware:

```js
import { authorizeRoles, verifyToken } from '@lcaparros/user-management';

// Protect an endpoint for only admins
app.get('/api/users', verifyToken, authorizeRoles(['admin', 'user_manager']), (req, res) => {
  // Your logic here
});
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

### Testing

To run the tests, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:

```sh
npm install
```

3. Start MongoDB. You can do it with Docker using the provided docker-compose file:

```sh
docker compose up -d
```

3. Run the tests:

```sh
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

We hope this module helps you manage users in your project. If you have any questions or suggestions, feel free to open an issue on the repository.
