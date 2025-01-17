# CodeRoom - Online Code Compiler

An online code compiler platform that supports multiple programming languages such as Java, C, C++, JavaScript, and Python. Users can create accounts, manage projects, write and compile code, and save their work for future reference.

- Live Link: https://coderoombysachin.vercel.app/

## Features

- **Multi-language Support**: Write and compile code in various programming languages.
- **User Accounts**: Create an account to manage your projects securely.
- **Project Management**: Create, edit, save, and delete projects with ease.
- **Save for Future Use**: Store your code for later reference.
- **Real-time Compilation**: See the output of your code instantly.

## Tech Stack

### Frontend

- **HTML, CSS, JavaScript**: Core web technologies.
- **Tailwind CSS**: For styling and responsive design.
- **React Router**: For seamless navigation.

### Backend

- **Node.js and Express.js**: For building the server and APIs.
- **MongoDB**: Database for storing user and project information.
- **JWT (JSON Web Token)**: For user authentication.
- **bcrypt.js**: For secure password hashing.

### Deployment

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.

## Screenshots
![Screenshot 2025-01-17 at 6 36 58 PM](https://github.com/user-attachments/assets/47475fd6-a8a1-4cbc-b13f-603cb5545431)
Login Page

![Screenshot 2025-01-17 at 6 37 51 PM](https://github.com/user-attachments/assets/270b4930-03f7-4449-8695-329cd6f5dcac)
User Dashboard

![Screenshot 2025-01-17 at 6 39 01 PM](https://github.com/user-attachments/assets/50dbc547-093c-40e0-b210-1f2b73efdc75)
Code Compiler


## API Endpoints

### Authentication

- **POST** `/signUp`: Register a new user.
- **POST** `/login`: Login for existing users.

### Project Management

- **POST** `/createProj`: Create a new project.
- **POST** `/saveProject`: Save the project for future use.
- **POST** `/getProjects`: Retrieve a list of all projects for a user.
- **POST** `/getProject`: Retrieve a specific project by ID.
- **POST** `/deleteProject`: Delete a specific project.
- **POST** `/editProject`: Edit an existing project.

### User Info

- **POST** `/getUserInfo`: Fetch user information.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/online-code-compiler.git
   cd online-code-compiler
   ```

2. **Backend Setup**:

   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:

   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Environment Variables**:
   Configure environment variables for both frontend and backend as required. Examples include MongoDB URI, JWT secret, etc.

## How to Use

1. **Sign Up**: Create a new account or log in to an existing one.
2. **Create a Project**: Choose a programming language and start writing code.
3. **Compile Code**: View the output of your code instantly.
4. **Save Projects**: Save your projects for future use.
5. **Manage Projects**: Edit or delete projects as needed.

## Screenshots

Include screenshots here (optional).

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For any queries or issues, feel free to contact me at sachinalam9998@gmail.com.

---

Thank you for checking out the Online Code Compiler project! Happy coding! 🚀
