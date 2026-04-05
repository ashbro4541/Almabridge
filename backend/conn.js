var mysql=require('mysql2')
var util=require('util')

// Use environment variables for production
const conn=mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'collage_project',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
})

conn.connect((err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("DB Connected...")
    }
})

var exe=util.promisify(conn.query).bind(conn);

module.exports=exe;