module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        id_address: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street: {
            type: DataTypes.STRING(100),
            allowNull: false,

        },
        number: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING(8),
            allowNull: false,

        }
    }, {
        freezeTableName: true
    });
    
    return Address;
};