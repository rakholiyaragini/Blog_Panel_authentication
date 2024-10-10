const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = require('./routers/router');
const path = require('path');
const port = process.env.PORT || 3004;
const Path= path.join(__dirname , "/views");
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const passport = require('./config/passportConfig');
const express_session = require('express-session');
const flash = require('connect-flash');

app.set("view engine" , "ejs");
app.set("views",Path);

app.use(cookieParser());
app.use(express.static(Path))
app.use(flash());

app.use(express_session({ secret: 'mySecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads',express.static(path.join(__dirname , "/uploads")))
app.use('/assets',express.static(path.join(__dirname , "/assets")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',router)
app.listen(port , (err) =>{
    if(!err){   
        console.log(`server is running on http://localhost:${port}`);
    }
})
