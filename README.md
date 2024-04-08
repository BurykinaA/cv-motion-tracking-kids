# cv-motion-tracking-kids

[Presentation of the solution](https://docs.google.com/presentation/d/1mYm_YkRkEYTxL8M3HuowlKWzEIyvznc6/edit?usp=sharing&ouid=111610996679687620587&rtpof=true&sd=true)

-----------------

![image](https://github.com/BurykinaA/cv-motion-tracking-kids/assets/92402616/6cc532ee-b502-4834-8e98-79790698a6cb)


## What we have used

-Body detection
-Scaling
-Projection onto spherical space
-Cosine proximity metric
-Dynamic time warping

## Application Launch
This guide will help you launch the application using Docker on Linux and Windows operating systems.

Ensure Docker is installed on your machine. If Docker is not installed, you can download it from the official Docker website.

### Step 1: Clone the Repository
If you do not already have a local copy of the repository, clone it from the Git repository:

```bash
git clone https://github.com/BurykinaA/cv-motion-tracking-kids.git
cd cv-motion-tracking-kids
```

WITHOUT DOCKER
In the main folder:
1) `python -m venv venv`
2) For Command Prompt: `venv\Scripts\activate.bat`  
   For Bash: `source venv/bin/activate`
3) `pip install -r requirements.txt`

To start the backend:  
1) `cd backend`
2) `flask run`

To start the frontend:
1) `cd frontend`
2) `npm i`
3) `npm run dev`

WITH DOCKER

### Step 2: Launch Docker Compose
Now, use Docker Compose to build and launch the application's containers.

On Linux:
```bash
docker-compose up --build
```
or  
```bash
docker-compose up --build -d
```
On Windows:
```bash
docker-compose up --build 
```
or  
```bash
docker-compose up --build -d
```

### Step 3: Verify the Application is Running
The application should now be accessible and ready for use at:

Linux and Windows: http://localhost:5173

## Technologies
This project leverages a suite of modern technologies to create a powerful and flexible web application. Below are the key components that help us achieve our goals:

### Flask
- **Lightweight and Fast**: Flask is a micro-framework that offers high performance and fast page loading, making it an ideal choice for web applications.
- **Modularity and Flexibility**: Flask allows for the development of applications by choosing only the necessary components, making the code lighter and more understandable.
- **Integration**: Flask easily integrates with other libraries and tools, making it a versatile solution for developing various web projects.

### React
- **Component Architecture**: React is based on components, simplifying the creation of reusable interface elements and enhancing project maintainability.
- **Performance**: React uses a virtual DOM for efficient updates to the user interface and fast rendering of components.
- **Debugging**: React provides developer tools for convenient debugging of components and the application as a whole.

### Docker
- **Isolation**: Containers allow for the isolation of the application and its dependencies from the host environment, reducing conflicts and ensuring reliability.
- **Easy Deployment**: Docker containers are easily deployed on any host, ensuring environmental consistency across development and server setups.
- **Scalability**: Docker simplifies application scaling and provides flexibility in resource management.

