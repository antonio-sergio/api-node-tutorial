const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, Address } = require("../models");
//instanciando um modelo User

exports.createUser = async (req, res) => {
    try {
        const { email, cpf, address_id, password } = req.body;
        const requiredFields = ['name', 'email', 'password', 'cpf', 'phone', 'address_id'];
        const missingFields = [];
        requiredFields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Por favor informe os campos: ${missingFields.join(', ')}` });
        }
        const oldUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { cpf }]
            }
        });
        if (oldUser) {
            return res.status(409).json({ message: "Já existe um usuário cadastrado com esse email ou cpf." });
        }
        const addressUser = await Address.findByPk(address_id);
        if (!addressUser) {
            return res.status(409).json({ message: "Não existe endereço para o address_id informado" });
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...req.body,
            email: email.toLowerCase(),
            password: encryptedPassword,
            Address: { // adiciona o endereço como um objeto aninhado
                id: address_id
            }
        }, {
            include: {
                model: Address,
                as: 'address',
              },
        });
        
        await addressUser.update({ user_id: user.id });
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({ message: "Por favor informe os campos 'email' e 'password'" });
        }
        // Validate if user exist in our database
        const user = await User.findOne({ where: { email: email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json(user);
        }
        return res.status(400).json({ message: "Credenciais inválidas" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }

}

exports.findOneUser = async (req, res) => {
    const id = req.params.id;
    console.log('id ', id);
    try {
        let user = await User.findOne({
            where: { id_user: id },
            include: [
                {
                    model: Address,
                    as: 'address',
                    attributes: ['id_address','street','number','complement','city','state','zip_code']
                }
            ],
            attributes: ['id_user', 'name', 'email', 'role']
        });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado para o id informado" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}

exports.findAllUsers = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role','address_id']
        });
        if (users) {
            return res.status(200).json({ users: users });
        }
        return res.status(404).json({ message: 'Nenhum usuário encontrado' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;
    try {
        let user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado para o id informado" });
        }
        await user.update(updatedFields);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado para o id informado" });
        }
        await user.destroy();
        return res.status(200).json({message: "Usuário deletado com sucesso"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}