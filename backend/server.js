const app = require('./app');
const DB = require('./data-source');
const colors = require('colors')

const PORT = process.env.PORT || 3000;


(
    async () => {
        try {
            await DB.connectToDatabase();
            console.log('Database connection open'.cyan.bold.underline.italic);

            app.listen(PORT, () => {
                console.log(`Express server started at PORT : ${PORT}`.yellow.bold.italic.underline)
            })

        } catch (error) {
            console.log(`Cannot start the server at the moment, ${error.message}`.red.bold);
        }
    }
)()