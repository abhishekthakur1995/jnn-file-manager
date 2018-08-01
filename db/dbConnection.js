var mysql = require('mysql')

var dbConnection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'root',
  	password : '',
  	database : 'jnn_file_record',
  	charset  : 'utf8mb4'
})

dbConnection.connect(function(err) {
	if (err) {
    	console.error('error connecting: ' + err.stack);
    	return;
  	}
  	console.log('connected as id ' + dbConnection.threadId);
});

module.exports.dbConnection = dbConnection;