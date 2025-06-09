# Setting Up BidSetu from Scratch

This guide explains how to create a fresh instance of the project using the existing source code.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BidSetu_2.0
   ```
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```
4. **Configure environment variables**
   Copy `dummyEnvFile.txt` to `.env` in the `backend` folder and fill in the values for MongoDB, JWT secrets and email credentials.

5. **Run database seeding (optional)**
   ```bash
   cd ../backend
   npm run seed
   ```
6. **Start the development servers**
   ```bash
   # Start backend
   npm start

   # In a new terminal, start frontend
   cd ../frontend
   npm run dev
   ```

The application will be accessible at `http://localhost:5173` by default.
