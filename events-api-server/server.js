'use strict';

const express      = require('express');
const app          = express();
const port         = +process.env.PORT || 3000;
const path         = require('path');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const bodyParser   = require('body-parser'); // parsing middleware
const http         = require('http');

mongoose.connect('mongodb://127.0.0.1:27017/events-app');

mongoose.connection.on('connected', () => {
  console.info("Succesfully connected to MongoDB Database");
});

let User = require('./db/userSchema');
let Evnt = require('./db/eventSchema');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// configure app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});



// ROUTES TO OUR PAGES

app.get('/', function(req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// API router

var apiRouter = express.Router();


apiRouter.route('/lang/admin/en')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/admin/en.json`));
  });

apiRouter.route('/lang/room/en')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/room/en.json`));
  });

  apiRouter.route('/lang/account/en')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/account/en.json`));
  });  

apiRouter.route('/lang/register/en')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/register/en.json`));
  });  

apiRouter.route('/lang/ru')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/ru.json`));
  });

apiRouter.route('/lang/uk')
  .get(function(req, res) {
    res.sendfile(path.join(`${__dirname}/lang/uk.json`));
  });

apiRouter.route('/')
  .get(function(req, res) {
    res.send({"message": "success"});
  })

/*****************  Users Route  *************************/

apiRouter.route('user')
  .post(function(req, res) {
    User.findOne({
      'email': req.params.email,
      'password': req.params.password
    },(err, res) => {
      if(err) res.send(err);
      res.json(user);
    })
  })


/********* CREATE NEW USER *********/  

apiRouter.route('/users')
  .get(function(req, res) {
    User
      .find({})
      .exec(function(err, users) {
        if(err) res.send(err);
        res.json(users);
      });
  })
  .post(function(req, res) {
    // create a new instance of the Event model
    let user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
      if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that username already exists. '});
      else
        return res.send(err);
      }
      res.json({message: 'User created'});
    });
  });

  /***   LIKE / SUBSCRIBE     *****/

  apiRouter.route('/users/:id/subscribe')
  .post(function(req, res) {
    User.findOne({
      '_id': req.params.id
    }, function (err, user) {
      if (user) {
        Evnt.findOne({
          "_id": req.body.eventID
        }, function(err, event) {
          user.subscription = user.subscription.concat(req.body.eventID);
          user.save(function(err) {
            if (err) {
              res.send(err);
            }
  
            res.json({ message: 'User successfully subscribed' });
          });

          event.subscribed = event.subscribed ? event.subscribed + 1 : 1;
          event.save();
        })

      } else {
        res.json({message: 'Something went wrong, cannot find user'});
      }
    });
  });


  apiRouter.route('/events/like')
  .post(function(req, res) {
    Evnt.findOne({
      "_id": req.body.eventID
    }, function(err, event) {
      if (err) {
        res.send(err);
      } else {
        if (event) {
          event.likes = event.likes ? event.likes + 1 : 1;
          event.save();
          res.json({ message: 'Success' });
        } else {  
          res.send({ message: 'Unknown error' });
        }
      }
    });
  });



  /****   LOGIN      ***/

  apiRouter.route('/user/login')
  .post(function(req, res) {
    User.findOne({
      "email": req.body.email
    }, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        if (user) {
          if (req.body.password === user.password) {
            res.json({user});
          } else {
            res.json({message: 'Incorrect password'});
          }
        } else {
          res.json({ message: 'User not found' });
        }
      }
    });
  });

 /***********  Events route  ****************/

 apiRouter.route('/events')
 .get(function(req, res) {
   Evnt
     .find({})
     .exec(function(err, users) {
       if(err) res.send(err);
       res.json(users);
     });
 })
 .post(function(req, res) {
   let event = new Evnt();

   event.title = req.body.title;
   event.description = req.body.description;
   event.photo = req.body.photo;

   event.save(function(err) {
     if (err) {
     if (err.code == 11000)
       return res.json({ success: false, message: 'A user with that username already exists. '});
     else
       return res.send(err);
     }
     res.json({message: 'Event created'});
   });
 });


 /********  Single Event Route      **********/

 apiRouter.route('/events/:id')
  .get(function(req, res) {
    Evnt
      .findOne({
        "_id": req.params.id
      }, function(err, event) {
        if (event) {
          res.json({event})
        } else {
          res.send(err);
        }
      })
  })

  // TODO: Implement it later
  .put(function(req, res) {
    Evnt
      .findOne({
        "_id": req.params.id
      }, function(err, event) {

      });
  });
  // .put(function(req, res) {
  //   Ev.findOne({
  //     'email': req.params.email
  //   }, function (err, user) {
  //     if (err) res.send(err);
  //     Ev.save(function(err) {
  //       if(err) res.send(err);
  //       res.json(Ev);
  //     })
  //   });
  // })
  // .delete(function(req, res) {
  //   Ev.findOneAndDelete({
  //     'email': req.params.email
  //   }, function(err, Ev) {
  //       if(err) res.send(err)
  //       res.json({message: 'User deleted!'});
  //     });
  // });

  app.use('/api', apiRouter);


http
  .createServer(app).listen(port)
  .on('error', function(error){
     console.log("Error: \n" + error.message);
     console.log(error.stack);
  });

console.log(`Server is running on port ${port}`);