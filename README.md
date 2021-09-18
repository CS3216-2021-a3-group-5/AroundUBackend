Installation Procedures

1. Install node.js, npm and postgres
2. Run npm install
3. Run the following sql script (setupRole.sql) from sql shell as a superuser using the default account created during setup
4. Rerun sql shell and enter as the user "me" with password "password"
5. Run the following sql script (setupDatabase.sql) to set up the database and populate with mock data
6. Run ts-node src/index.ts to start the server
7. Try accessing http://localhost:3080/users and http://localhost:3080/users/1
7. Use postman web to try sample queries to the following links with the following json values
    i. http://localhost:3000/users (POST) { "name"="elaine", "email"="elaine@example.com" }
   ii. http://localhost:3000/users/1 (PUT) { "name"="kramer", "email"="kramer=email@example.com" } 
   iii. http://localhost:3000/users/1 (DELETE)
        

Useful Database commands

https://www.postgresqltutorial.com/psql-commands/
