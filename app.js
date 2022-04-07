const express = require("express");
const path = require("path"); 
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');

const port = 80;

const connection = mongoose.connect("mongodb://localhost:27017/contact", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,   
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for surving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the view directory

// ENDPOINTS
app.get('/', (req, res) => {
    // const con = "This is the best content in the internet"
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    // const con = "This is the best content in the internet"
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        desc: req.body.desc
    });
    myData.save()
        .then(()=>{
            res.render(alerts.pug);
        })
        .catch(()=>{
            res.render('alerts', { alerts: 'Item was not saved to the databse'});
        });
})

app.get('/about', (req, res) => {
    // const con = "This is the best content in the internet"
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
    // const con = "This is the best content in the internet"
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/classInfo', (req, res) => {
    // const con = "This is the best content in the internet"
    const params = { }
    res.status(200).render('classInfo.pug', params);
})

app.get('/test', bodyparser, (req, res) => {
    res.send("ok");
    console.log(req.body);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})