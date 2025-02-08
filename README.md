# YouTube Clone

A functional YouTube clone built with React, Redux, Node.js, Express, MongoDB, and JWT authentication. Users can watch videos, manage channels, and securely log in.

## Tech Stack

**Frontend**  
- React (UI)  
- Redux (State Management)  
- Vite (Bundler)  
- React Router (Navigation)

**Backend**  
- Node.js & Express (Server)  
- MongoDB & Mongoose (Database)  
- JWT Authentication  

## Features
- **Home Page**: List of videos  
- **Search**: Find videos and channels  
- **Video Player**: Watch videos with details like views, genre, and uploader info  
- **Channel Pages**: View all videos from a specific channel  
- **Authentication**: Secure login and registration

## Setup

1. Clone the repo:  
   ```bash
   git clone https://github.com/akanshamore/youtube-clone
   cd youtube-clone

2. cd frontend  
npm install  

cd backend  
npm install

3. env

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  


4. cd backend  
npm run dev  

cd frontend  
yarn dev  

