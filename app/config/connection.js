import Sequelize from 'sequelize';

const DB_URL = process.env.DB_URL

const connection = new Sequelize(DB_URL, {
    logging: false,
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