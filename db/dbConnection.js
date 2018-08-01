var mysql = require('mysql')

var dbConnection = mysql.createConnection({
	host     : process.env.DB_HOST,
  	user     : process.env.DB_USER,
  	password : process.env.DB_PASSWORD,
  	database : process.env.DB_NAME,
  	charset  : process.env.DB_CHARSET
})

dbConnection.connect(function(err) {
	if (err) {
    	console.error('error connecting: ' + err.stack);
    	return;
  	}
  	console.log('connected as id ' + dbConnection.threadId);
});

module.exports.dbConnection = dbConnection;