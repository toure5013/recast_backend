'use strict';
//Parameters

//===========================Modules exports==========================
var     
http = require("http"),
express = require("express"),
app = express(),
server = http.createServer(app),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
logger = require("morgan"),
errorHandler = require("errorhandler"),

//My libraries
routes = require('./server/routes')
;

const nodePort = 8088 || process.env.PORT;

//============================Configuration our server==================
app.use(bodyParser.json());
app.use(methodOverride());

switch (app.get('env')){
    case 'development':
        app.use(logger('combined'));
        app.use(errorHandler(
            {
                dumExceptions : true,
                showStack : true
            }
        ));//We can put production case
}

routes.configRoutes(app, server);



//=============================Start server=========================
server.listen(nodePort);
console.log(
    'express server listening on port %d in %s mode',
    nodePort,
    app.settings.env
);