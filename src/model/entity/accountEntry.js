import { DataTypes, Model, Sequelize } from "sequelize";
import db from '../../config/db.js'

export default () => {
    class AccountEntry extends Model {}

    AccountEntry.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cpf: {
                type: DataTypes.STRING(11),
                allowNull: false,
                validate: {
                    len: [11, 11],
                    isNumeric: true
                }
            },
            agency: {
                type: DataTypes.STRING(4),
                allowNull: false,
                validate: {
                    len: [4, 4],
                    isNumeric: true
                }
            },
            account: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    len: [1, 10],
                    isNumeric: true
                }
            },
            entryName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    len: [1, 20]
                }
            },
            value: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            entryType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['DEBIT', 'CREDIT']]
                }
            },
            entryTs: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            is_classified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            category: {
                type: DataTypes.STRING(50),
                allowNull: true,
                validate: {
                    len: [1, 50]
                }
            }
        },
        {
            sequelize: db.connection,
            modelName: 'accountEntry',
            tableName: 'account_entries'
        }
    )

    return AccountEntry;
}