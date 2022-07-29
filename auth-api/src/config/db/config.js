import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "auth-db", 
    "postgres", 
    "postgres",
    {
        host: 'auth-db',
        // host: 'localhost',
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
        }, 
        pool: 
        {
            acquire: 180000
        }
    }
);

sequelize
.authenticate()
.then(
    () =>
    {
        console.log('Banco de dados online e conectado!');
    }
)
.catch(
    (_error) =>
    {
        console.error(_error);
    }
);

export default sequelize;
