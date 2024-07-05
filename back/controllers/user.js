const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const yaml = require('js-yaml');

exports.login = (req, res, next) => {
    try{
        const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
        console.log(config.components.schemas.Authenticate.properties.email.example, 'mail')
        const yamlMail = config.components.schemas.Authenticate.properties.email.example;
        const yamlPassword = config.components.schemas.Authenticate.properties.password.example;
        
        const parameters = config.paths['/authenticate'].post.parameters;
        console.log(parameters)
        
        let yamlBankinVersion, yamlBankinDevice
        
        parameters.forEach(param => {
            if (param.name === 'Bankin-Version') {
                yamlBankinVersion = param.schema.example;
            } else if (param.name === 'Bankin-Device') {
                yamlBankinDevice = param.schema.example;
            }
        });

        const stringBankinVersion = JSON.stringify(yamlBankinVersion)
        const modifiedStringBankinVersion = stringBankinVersion.slice(1, -1);
        
        const { email, password, bankinVersion, bankinDevice } = req.body;
        console.log(typeof bankinVersion, typeof stringBankinVersion);
        console.log(bankinVersion, stringBankinVersion);
        console.log("email :" ,email , "password:", password, "bankinVersion :", bankinVersion, "bankinDevice :", bankinDevice)
    
        if (email !== yamlMail) {
            return res.status(401).json({ message: 'email / mot de passe / bankin version ou bankin device incorrect : c"est le mail' });
        }
        if(bankinVersion !== modifiedStringBankinVersion){
            return res.status(401).json({ message: 'email / mot de passe / bankin version ou bankin device incorrect : c"est la version' });
        }
        if(bankinDevice !== yamlBankinDevice){
            return res.status(401).json({ message: 'email / mot de passe / bankin version ou bankin device incorrect : c"est le device' });
        }

        if (password !== yamlPassword) {
            return res.status(401).json({ message: 'email / mot de passe / bankin version ou bankin device incorrect : c"est le password' });
        }

        const token = jwt.sign(
            { email: yamlMail },
            'secret_token',
            { expiresIn: '1h' }
        );

        // Retourner le jeton et un message de succès
        res.status(200).json({ message: 'Authentification réussie', token });

    } catch(err) {
        console.log(err)
    }
}