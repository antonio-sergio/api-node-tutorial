module.exports = (sequelize, DataTypes, Address) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            field: 'id_user', // aqui renomeamos o campo id para id_user
            primaryKey: true,
            autoIncrement: true
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Address,
                key: 'id_address'
            }
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'), //aqui definimos que o campo role só aceitará 'user' ou 'admin'
            defaultValue: 'user' 
        },
    }, {
        freezeTableName: true
    }, {});
    return User;
};