const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * ROUTES IMPORTS
 */


const userRoutes = require('./routes/user');


/**
 * DB MANAGEMENT
 */
/*
const connectDB = ()=>{
    try {
        const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
        console.log(config.components.schemas.Authenticate.properties.email.example, 'mail')
        const mail = config.components.schemas.Authenticate.properties.email.example;
        const password = config.components.schemas.Authenticate.properties.password.example;

        
        console.log(`Username: ${username}, Password: ${password}`);
        // Utilisez les informations d'authentification ici, par exemple pour une connexion à une base de données
      } catch (e) {
        console.error(e);
      }
}

connectDB()
*/
/**
 * EXPRESS APP CREATION
 */
const app = express();

/**
 * CORS MANAGEMENT
 */
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * BODYPARSER MANAGEMENT
 */

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
/*
app.use(
    "/assets/images",
    express.static(path.join(__dirname, "assets/images"))
);
*/

module.exports = app;
