
const express = require('express');
const sequelize = require('../student-manager/config/database');
const studentRouter = require('../student-manager/routes/studentRouter');
const cors = require('cors');
const app = express();

sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api', studentRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




