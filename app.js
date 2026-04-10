const express = require('express');
const path = require('path');
const session = require('express-session');
const { engine } = require('express-handlebars');
const vhost = require('vhost');

const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');
const logger = require('./middleware/logger');

const app = express();

app.disable('x-powered-by');

// view engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'bookmark-manager-secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

const publicApp = express.Router();
publicApp.use(publicRoutes);

const adminApp = express.Router();
adminApp.use(adminRoutes);

// vhost
app.use(vhost('admin.localhost', adminApp));
app.use(vhost('localhost', publicApp));

app.use(publicRoutes);

// routes
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Public site: http://localhost:${PORT}`);
  console.log(`Admin site:  http://admin.localhost:${PORT}`);
});