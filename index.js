const server = require('./app.js');
const { conn } = require('./db.js');

conn.sync({ force: false })
    .then(() => {
        server.listen(process.env.PORT, () => console.log('%s listening at ' + process.env.PORT))
    })