const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(
  session({
    secret: 'w3c_secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());


app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


app.get('/', (req, res) => {
  res.render('layout', {
    title: 'W3C Clone - Home',
    page: 'home',
    currentTopic: ''
  });
});


app.get('/login', (req, res) => {
  res.render('layout', {
    title: 'Login - W3C Clone',
    page: 'auth/login', 
    currentTopic: ''
  });
});


app.get('/register', (req, res) => {
  res.render('layout', {
    title: 'Register - W3C Clone',
    page: 'auth/register',
    currentTopic: ''
  });
});


app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registering:', username, email);
  req.flash('success', 'Registered successfully!');
  res.redirect('/register');
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Logging in:', email);
  req.flash('success', 'Logged in successfully!');
  res.redirect('/');
});


const javaTopics = [
  'intro',
  'datatypes',
  'variables',
  'object',
  'classes',
  'inheritance',
  'polymorphism',
  'abstraction',
  'encapsulation'
];

javaTopics.forEach(topic => {
  app.get(`/java/${topic}`, (req, res) => {
    res.render('layout', {
      title: `Java ${topic.charAt(0).toUpperCase() + topic.slice(1)} - W3C Clone`,
      page: `java/${topic}`, 
      currentTopic: topic
    });
  });
});


app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});


app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
