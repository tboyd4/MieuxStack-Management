# MieuxStack-Management
A Content Management System CLA, for any Manager that wants to Manage Better. 

# Documentation
## Overview of Functionality
 - Application allows connection to a SQL Database
 - Application allows user to create, review, update, and remove data from Database
 - Application allows user to interact with the command line to interact with data

## How to Set Up Application
 - Upon Forking Repository, installing dependencies is neccessary for application usage
    -- run 'npm install' in the command line, while in the root directory of application
 - You will need to set up a keys.js file in the config directory. This will allow connection to your SQL Database
    -- put the following code in your keys.js file

        module.exports = {
            mysqlpass: "<your password goes here>"
        }
    -- remember to ensure this keys.js file is in your .gitignore
 - Finally, you must set up a database that will work with this application. 
    -- The database Schema can be copied from the schema.sql file in the root directory
 - You are ready to run this application, but running the following command in your command line
    -- npm run start

## How to Use This Application
 - After you start the application, you will be shown a menu
 - Upon choosing an option, you will either be shown some amount of specified data, or be asked to give details if you chose an create or update option
 - After you have finished with a task, you will be asked if you wish to return to menu. 
    -- If you say no, the application will close, and your data will all be safely updated in your database.
    -- If you say yes, you will return to the main menu, and you can navigate as you wish

### Regarding Data
- Please feel free to insert your own data
- Keep in mind, your data must conform to the database structure I have provided