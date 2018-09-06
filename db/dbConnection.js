var mysql = require('mysql')

var dbConnection = mysql.createConnection({
	host     : process.env.DB_HOST || process.env.MYSQL_SERVICE_HOST,
  	user     : process.env.DB_USER || process.env.databaseusername,
  	password : process.env.DB_PASSWORD || process.env.databasepassword,
  	database : process.env.DB_NAME || process.env.databasename,
  	charset  : process.env.DB_CHARSET
})

console.log(dbConnection)

dbConnection.connect(function(err) {
	if (err) {
    	console.error('error connecting: ' + err.stack)
    	return
  	}
  	console.log('connected as id ' + dbConnection.threadId)
})

module.exports = dbConnection
