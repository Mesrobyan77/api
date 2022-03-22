const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/router');
const port = 7777   
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
  swaggerDefinition: {
      info: {
          version: "1.0.0",
          title: "Customer API",
          description: "Customer API Information",
          contact: {
              name: "Mesrobyan77"
          },
          servers: ["http://localhost:7777"]
      }
  },
  apis: ['router/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());




app.use('/', router);


app.listen(port, () => console.log(`see project => http://localhost:${port}`))
