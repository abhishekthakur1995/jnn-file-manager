var mysql = require('mysql')

var dbConnection = mysql.createConnection({
	host     : process.env.OPENSHIFT_MYSQL_DB_HOST || process.env.DB_HOST,
  	user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || process.env.DB_USER,
  	password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || process.env.DB_PASSWORD,
  	database : process.env.OPENSHIFT_APP_NAME || process.env.DB_NAME,
  	charset  : process.env.DB_CHARSET || 'utf8mb4'
})

dbConnection.connect(function(err) {
	if (err) {
    	console.error('error connecting: ' + err.stack);
    	return;
  	}
  	console.log('connected as id ' + dbConnection.threadId);
});

module.exports = dbConnection;