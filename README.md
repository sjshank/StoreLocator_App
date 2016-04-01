# StoreLocator_App

A MEAN Stack based web application to find and locate nearby stores using zipcode.



  Application consist of client and server side modules.

  It makes call to google api for finding geo-location of user entered Zip-code.

  It has dummy address data objects of US stores.
  
  It also contains logger implementation for logging error, info using 'Debug' and 'Log4js' module.
  It has 'Log4js.json' file for logging configuration.Application logs all details inside 'log' folder.

  Whenever user makes a search using zip-code, following process happens :

    1. Get geo-location from google api

    2. Send geo location to node-express based app server

    3. Make a mongodb get call to retrieve all pre-entered address objects with their geo-              location.

    4. Filter out stores based on user entered zipcode's geo-location with address object's geo-location which comes around 20km of distance and return list of stores to UI.

    5. Render store location and display marker on Google Map using jquery Map Marker plugin. 


### References :	
    
    1. Distance calculation formula using latitude and Longitude : https://www.geodatasource.com/developers/javascript
    2. Jquery Map Marker Plugin : http://aslamdoctor.com/portfolio/jquery-map-marker-plugin/

### Programming Language : ###

    1.JavaScript

### Web/Application Server : ###

    1.Nodejs

### Frameworks : ###

    1. Expressjs - server side framework
    2. Angularjs - client side framework
    
### Libraries :  ###

    1. fs - to read/write data in .json file
    2. multer - file upload at server side
    3. debug/log4js - For logging errors, information
    
### Tools : ###

    1.SublimeText2
    
Steps to follow for running app :

    1. install Nodejs from here https://nodejs.org/en/ and make node env up. 
    This will automatically install NPM package in your system.
    2. Install Python 2.7+ version from here https://www.python.org/download/releases/2.7/
    3. Run 'npm install' on 'package.json'. This will create new folder 'node_modules' 
    inside same directory where you can see all the mentioned dependencies inside
    'package.json' will gets installed.
    4. Run 'node app.js' over root directory.
    
    Hit "localhost:4000" to see running application
