const { Address } = require("../models");
//instanciando um modelo User

exports.createAddress = async (req, res) => {
    try {
        
        const requiredFields = ['street', 'number', 'city', 'state', 'zip_code'];
        const missingFields = [];

        requiredFields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Campos obrigatórios: ${missingFields.join(', ')}` });
        }

        const address = await Address.create({
            ...req.body
        });

        return res.status(201).json(address);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};