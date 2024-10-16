Project Setup

This guide will walk you through setting up and running the project locally.

\*\*Prerequisites

-Docker installed and running


\*\*Database Setup

The project uses PostgreSQL for the database. You can launch a PostgreSQL instance using Docker:

-Pull and run the Docker image.

-After the instance is running, configure the database connection string in the backend by editing back/config/db.ts.



\*\*App Setup

To install and start the  application:

-Install the dependencies:

npm install

- If you like to set up a database with preset  data:
 uncomment  line 37 on file db located at 'src/lib/db/db.ts'
"// await seedDb(); // Uncomment to seed the database"

-Start the frontend server:

npm run dev 

===>The application will open in your browser at http://localhost:5173.
