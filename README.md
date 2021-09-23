Installation Procedures (Local Setup)

1. Install node.js, npm and postgres
2. Run 'npm install'
3. Run the following sql script (setupRole.sql) from sql shell as a superuser using the default account created during setup
4. Rerun sql shell and enter as the user "me" with password "password"
5. Run the following sql script (setupDatabase.sql) to set up the database and populate with mock data
6. Run 'npm start' to start the server
7. Update the values in config.ts and database.ts
8. Refer to requests.http for some sample requests

Useful Database commands

https://www.postgresqltutorial.com/psql-commands/
