import Sequelize from 'sequelize';
import pg from 'pg'
pg.defaults.ssl = true;

const DB_URL = process.env.DB_URL

const connection = new Sequelize(DB_URL, {
    dialect: 'postgres',
    logging: false,
})

var conString = DB_URL //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });




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