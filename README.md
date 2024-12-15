This project demonstrates how to build a fully-functional e-commerce website using React for the frontend, Node.js for the backend, and MongoDB as the database. The project is divided into three sections: **frontend**, **backend**, and **admin panel**.



## Project Structure
```bash
/ (root)
|-- backend/          # Node.js backend (API server)
|-- frontend/         # React frontend (user-facing)
|-- foradmin/         # React frontend (admin interface)



Clone the Repository
Clone the repository to your local machine:
Copy code
$ git clone https://github.com/bbaallaa1122/basic-ecommerce-website.git
$ cd basic-ecommerce-website

Prerequisites
Before you can run the project locally, you need to have Node.js and npm  installed on your system. Follow the steps below to install them:

1. Install Node.js and npm
Node.js comes with npm, so when you install Node.js, npm will be installed automatically.

Visit the official Node.js website: https://nodejs.org/.
Download the LTS (Long Term Support) version, which is the recommended version for most users.
Follow the installation instructions based on your operating system (Windows, macOS, or Linux).
Verifying the Installation
After installing Node.js and npm, open a terminal or command prompt and run the following commands to verify the installation:

bash
Copy code
# Check Node.js version
node -v

# Check npm version
npm -v
If these commands return version numbers, then Node.js and npm have been installed successfully.


Install Dependencies
Navigate to each folder and install the required dependencies:
Backend:
bash
Copy code
$ cd backend
$ npm install

Frontend:
bash
Copy code
$ cd ../frontend
$ npm install

Admin Panel:
bash
Copy code
$ cd ../foradmin
$ npm install


 MongoDB Atlas Setup
To connect your project to MongoDB Atlas, follow these essential steps:

1. Create a MongoDB Atlas Account
Sign up at MongoDB Atlas.
2. Create a Cluster
Create an M0 Sandbox (Free Tier) cluster in your desired region.
3. Configure Network Access
In the Network Access tab, add the following IP addresses:
0.0.0.0/0: Allows access from any IP address, including your own.
152.58.220.130/32: Static IP created as part of the auto-setup process.
4. Create a Database User
In the Database Access tab, create a new database user with readWrite access to your database. Note the username and password.
5. Get the Connection String
In the Clusters tab, click "Connect", choose "Connect your application", and copy the connection string.
6. Configure in .env
In your project’s .env file, add the following (replacing <username>, <password>, and <dbname> with your details):
bash
Copy code
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority



Run the Backend
Navigate to the backend folder and start the server:

bash
Copy code
$ cd backend
$ npm start


 Run the Frontend
Open a new terminal, navigate to the frontend folder, and start the frontend server:

bash
Copy code
$ cd frontend
$ npm start


Run the Admin Panel
Open another terminal, navigate to the foradmin folder, and start the admin panel server:

bash
Copy code
$ cd foradmin
$ npm start