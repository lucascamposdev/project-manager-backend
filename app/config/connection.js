import Sequelize from 'sequelize';

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = process.env.DB_URL

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_URL,
    dialect: 'postgres',
    logging: false,
    port: 5432
})

connection.authenticate()
    .then(()=> console.log('Conectado ao PostgreSQL'))
    .catch((err)=> console.log(err))

const syncDatabase = async () => {
    try {
        await connection.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
    };
    
//   syncDatabase();

export default connection