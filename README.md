# cv-motion-tracking-kids
```markdown
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

### SQLite
- **Lightweight and Embedded**: SQLite is directly embedded into your application, simplifying database deployment and management.
- **Portability**: SQLite databases are easily portable between different operating systems and architectures.
- **Transactions and ACID Compliance**: SQLite ensures data consistency, supports transactions, and complies with ACID standards.

### Docker
- **Isolation**: Containers allow for the isolation of the application and its dependencies from the host environment, reducing conflicts and ensuring reliability.
- **Easy Deployment**: Docker containers are easily deployed on any host, ensuring environmental consistency across development and server setups.
- **Scalability**: Docker simplifies application scaling and provides flexibility in resource management.

## Application Launch
This guide will help you launch the application using Docker on Linux and Windows operating systems.

Ensure Docker is installed on your machine. If Docker is not installed, you can download it from the official Docker website.

### Step 1: Clone the Repository
If you do not already have a local copy of the repository, clone it from the Git repository:

```bash
git clone https://github.com/JokerEur/WebAccessibility.git
cd WebAccessibility
```

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

### Step 4: Stop the Containers (if you used `docker-compose up --build -d`)
To stop the containers, execute the following command:

```bash
docker-compose down
```
This will terminate all containers associated with the application.
```
