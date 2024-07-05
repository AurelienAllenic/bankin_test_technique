const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const yaml = require('js-yaml');

exports.login = (req, res, next) => {
    try {
        const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

        const yamlMail = config.components.schemas.Authenticate.properties.email.example;
        const yamlPassword = config.components.schemas.Authenticate.properties.password.example;
        const yamlAccessToken = config.components.schemas.Access.properties.access_token.example;
        const parameters = config.paths['/authenticate'].post.parameters;

        let yamlBankinVersion, yamlBankinDevice;

        parameters.forEach(param => {
            if (param.name === 'Bankin-Version') {
                yamlBankinVersion = param.schema.example;
            } else if (param.name === 'Bankin-Device') {
                yamlBankinDevice = param.schema.example;
            }
        });

        const stringBankinVersion = JSON.stringify(yamlBankinVersion);
        const modifiedStringBankinVersion = stringBankinVersion.slice(1, -1);

        const { email, password, bankinVersion, bankinDevice } = req.body;
        console.log("email :", email, "password:", password, "bankinVersion :", bankinVersion, "bankinDevice :", bankinDevice);

        if (email !== yamlMail || password !== yamlPassword || bankinVersion !== modifiedStringBankinVersion || bankinDevice !== yamlBankinDevice) {
            return res.status(401).json({ message: 'Email, mot de passe, version Bankin ou appareil Bankin incorrect' });
        }

        // Exemple de génération de token JWT
        const token = jwt.sign(
            { email: yamlMail },
            'secret_token',
            { expiresIn: '1h' }
        );

        // Retourne le token et un message de succès
        res.status(200).json({ message: 'Authentification réussie', token });

    } catch (err) {
        console.error('Erreur lors de l\'authentification :', err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.getAccounts = (req, res, next) => {
    try {
        const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

        const parameters = config.paths['/accounts'].get.parameters;
        let yamlBankinVersion, yamlBankinDevice;
        const yamlAccessToken = config.components.schemas.Access.properties.access_token.example;
        parameters.forEach(param => {
            if (param.name === 'Bankin-Version') {
                yamlBankinVersion = param.schema.example;
            } else if (param.name === 'Bankin-Device') {
                yamlBankinDevice = param.schema.example;
            }
        });
        const token = req.headers.authorization;

        if (token !== yamlAccessToken ) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const accounts = [
            { id: 1, name: 'Compte courant' },
            { id: 2, name: 'Livret A' },
            { id: 3, name: 'PEA' }
        ];

        // Retourner la liste des comptes
        res.status(200).json({ accounts });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};