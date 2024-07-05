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

        const expectedBankinVersion = config.paths['/accounts'].get.parameters.find(param => param.name === 'Bankin-Version').schema.example;
        const expectedBankinDevice = config.paths['/accounts'].get.parameters.find(param => param.name === 'Bankin-Device').schema.example;
/*
        if (req.headers['bankin-version'] !== expectedBankinVersion || req.headers['bankin-device'] !== expectedBankinDevice) {
            return res.status(401).json({ message: 'Non autorisé' });
        }
*/
        const accounts = [
            {
                id: 1,
                name: 'First Account',
                balance: 50,
                status: 0,
                status_code_info: 'OK',
                updated_at: '2023-06-02T07:16:37.691Z',
                type: 'checking',
                is_paused: false,
                currency_code: 'EUR',
                item_id: 7961182,
                bank_id: 488,
                loan_details: {},
                savings_details: {},
                is_pro: false,
                iban: '',
                custom_name: '',
                custom_type: '',
                custom_is_pro: false,
                hide: false,
                used_for_analysis: true,
                auto_sca_enabled: true
            },
            {
                id: 2,
                name: 'Second Account',
                balance: 200,
                status: 0,
                status_code_info: 'OK',
                updated_at: '2023-06-02T07:16:37.691Z',
                type: 'checking',
                is_paused: false,
                currency_code: 'EUR',
                item_id: 7961182,
                bank_id: 488,
                loan_details: {},
                savings_details: {},
                is_pro: false,
                iban: '',
                custom_name: '',
                custom_type: '',
                custom_is_pro: false,
                hide: false,
                used_for_analysis: true,
                auto_sca_enabled: true
            },
            {
                id: 3,
                name: 'Third Account',
                balance: 50,
                status: 0,
                status_code_info: 'OK',
                updated_at: '2023-06-02T07:16:37.691Z',
                type: 'checking',
                is_paused: false,
                currency_code: 'EUR',
                item_id: 7961182,
                bank_id: 488,
                loan_details: {},
                savings_details: {},
                is_pro: false,
                iban: '',
                custom_name: '',
                custom_type: '',
                custom_is_pro: false,
                hide: false,
                used_for_analysis: true,
                auto_sca_enabled: true
            },
        ];
        let generalBalance = 0
        accounts.forEach(account => {
            generalBalance += account.balance
        })
        res.status(200).json({ totalBalance: generalBalance });

    } catch (err) {
        console.error('Erreur lors de la récupération des comptes :', err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
