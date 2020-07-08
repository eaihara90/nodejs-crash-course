const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
//const dbConnection = require('./dbConnection');
const mongoose = require('mongoose');

// express app
const app = express();

//Calling the connection with DB

const dbURI = 'mongodb+srv://eaihara:1ed8a890@the-net-ninja.osufh.gcp.mongodb.net/the-net-ninja?retryWrites=true&w=majority';
(async () => { 
    try {
        const res = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to DB: ${res.connections[0].host}`);
        app.listen(3000);
    } catch(err) {
        console.log(err);
    }
})();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});