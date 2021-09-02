require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});