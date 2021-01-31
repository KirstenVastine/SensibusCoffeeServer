require('dotenv').config();
const Express = require('express')
const app = Express();
app.use(Express.json());
app.listen(process.env.PORT,() => console.log(`App is listening on ${process.env.PORT}`))
app.use(Express.static(__dirname+'/public'));

const {database} = require('./db')
database.sync()
// database.sync({force:true})

app.use(require('./middleware/headers'));

app.get('/', (req,res) => res.render('index'));

const user = require('./controllers/usercontroller');
app.use('/user', user)

const admin = require('./controllers/admincontroller');
app.use('/admin', admin)

const review = require('./controllers/reviewcontroller');
app.use('/review', review)


// const database = require('./db')
// database.sync()
//add "{force:true} with the sync function"
// app.use(Express.json());

// const user = require('./controllers/usercontroller');
// app.use('/user', user)

// const admin = require('./controllers/admincontroller');
// app.use('/admin', admin)

app.listen(process.env.PORT,() => console.log(`App is listening on ${process.env.PORT}`))