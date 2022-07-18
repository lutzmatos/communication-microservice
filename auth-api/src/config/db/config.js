import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "auth-db", 
    "postgres", 
    "postgres",
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 40101,
        quoteIdentifiers: false,
        define: 
        {
            syncOnAssociation: true,
            timestamps: false,
            unserscored: true,
            underscoredAll: true,
            freezeTableName: true
        }
    }
);

sequelize
.authenticate()
.then(
    () =>
    {
        console.log('Conectado...');
    }
)
.catch(
    (_error) =>
    {
        console.error(_error);
    }
);

export default sequelize;
