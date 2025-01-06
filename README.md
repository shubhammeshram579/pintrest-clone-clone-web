# Pinterest Clone Web Application 🚀
## Description
#### This is a full-stack Pinterest clone web application, built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application replicates the core functionality of Pinterest, allowing users to explore, save, and share images. It incorporates modern web technologies and tools for a seamless and visually appealing user experience.

#### The frontend is deployed on Vercel, and the backend is deployed on Render, ensuring fast, scalable, and reliable hosting for both components.

# 🌐 Live Demo
The project is live and deployed on Vercel! Check it out here: [Live Demo](https://pintrest-clone-frontend.vercel.app/)

# Features 💡
- User Authentication: Secure user login and signup using JWT and bcrypt.
- Image Upload and Management: Images are uploaded and stored using Cloudinary, ensuring efficient storage and retrieval.
- Infinite Scrolling: Smooth infinite scrolling experience using Locomotive Scrolling.
- Animations: Beautiful and responsive animations powered by GSAP.
- Real-Time Notifications: Using Socket.IO, users receive instant updates for actions like new image uploads, likes, and comments.
- State Management: Application-wide state management implemented using Redux Toolkit.
- Responsive Design: Fully responsive and styled with Tailwind CSS for modern and scalable design.
- Search and Filtering: Users can search and filter images based on tags or descriptions.
- Commenting System: Add and view comments in real-time using Socket.IO.
- Image Saving and Sharing: Save images to personal boards and share them with others.
- RESTful API: Backend built with Express.js to handle API requests efficiently.
- Data Fetching: Client-side data fetching using Axios.
- Deployed on Vercel and Render: The frontend is deployed on Vercel, while the backend is deployed on Render for reliable performance.


# Tech Stack 🛠
## Frontend 
- React.js: Component-based architecture for building the user interface.
- React Router: For navigation and routing.
- Redux Toolkit: Efficient state management for the application.
- Tailwind CSS: Utility-first CSS framework for building modern and responsive designs.
- GSAP: High-performance animations.
- Locomotive Scrolling: Smooth and elegant scrolling effects.


## Backend
- Node.js: Server-side runtime environment.
- Express.js: Backend framework for building APIs.
- Socket.IO: Real-time, bidirectional communication between client and server.

## Database
- MongoDB: NoSQL database for managing image data, user accounts, and comments



## Cloud Storage
- Cloudinary: For uploading, storing, and serving image files.

## Libraries & Tools
- Axios: Simplified HTTP requests for fetching and sending data.
- JWT: Secure user authentication and authorization.
- Bcrypt: Password hashing for secure user data.
- CSS Modules: Scoped styling for React components.
- Tailwind CSS: For consistent, customizable, and responsive designs.


## 🌐 Deployment
- Frontend: Deployed on Vercel for fast and reliable hosting. Check out the live application [here.](https://pintrest-clone-frontend.vercel.app/).

- Backend: Deployed on Render to handle API requests and real-time data communication

## Installation and Setup
### Clone the repository:

- git clone https://github.com/shubhammeshram579/pintrest-clone-clone-web
- cd pinterest-clone

### Install dependencies for both backend and frontend:

#### Install server dependencies
- cd server
- npm install

#### Install client dependencies
- cd ../client
- npm install


### Set up environment variables:
#### Create a .env file in the server directory and configure the following:

- MONGO_URI=<your-mongodb-uri>
- CLOUDINARY_URL=<your-cloudinary-url>
- JWT_SECRET=<your-jwt-secret>
- SOCKET_PORT=<your-socket-port>


### Run the development servers:

##### Start backend server
- cd server
- npm start

#### Start frontend development server
- cd ../client
- npm start

- Open the application in your browser at http://localhost:3000.

## Future Enhancements 🔮
- User Profile Pages: Add user profile sections to showcase saved boards and uploaded images.
- Social Media Integration: Allow sharing images directly to platforms like Facebook, Twitter, etc.
- Advanced Analytics: Track popular images and user engagement.
- Dark Mode: Add a dark mode toggle for better user experience.
- Drag and Drop: Enable drag-and-drop functionality for uploading images or reordering saved boards.
- AI-Powered Search: Use AI to enhance search results and image tagging.
- Email Notifications: Notify users via email about updates or activity on their boards.


# Contribution
- Contributions are welcome! If you'd like to improve the project, feel free to fork the repository and create a pull request.