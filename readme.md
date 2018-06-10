Dossier: Secure Uploading Application Demo
==========================================
Simple file management application built using Laravel, React, Material-UI and MobX.


Running the Demo Without Docker
-------------------------------

1. You'll need PHP (with SQLite extension enabled) and NodeJS
2. Create the `database.sqlite` file under `/database`
3. Clone the repository
4. `composer install` to download all PHP dependencies
5. `yarn` to download all JS dependencies
6. Copy `.env,example` to `.env`. Leave the database `DB_CONNECTION` on `sqlite`
7. `php artisan passport:install` to setup Laravel Passport. This command will generate 2 client credentials. Select one of these for your client_id + client_secret combination. Go back to your `.env` and locate the `MIX_API_CLIENT_ID` and `MIX_API_CLIENT_ID` settings and change them.
8.  `yarn production` to build the JS source files. 
9. Host the application on the web server of your choice and set `MIX_API_BASE_URL` to the address of your hosted application. 
10. Start playing around!


Using Docker
------------
*TODO*


Notes
-------
*Later*
