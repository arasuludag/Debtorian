require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const app = express()
const cors = require('cors')
const port = 5000

//Public folder usage and bodyParser.
app.use(express.static(__dirname + '/public')); // This was more relevant with EJS. I just left it as it is.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors())

// For the cookies, user and password salt & hash.
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB stuff.
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

const transactionSchema = new mongoose.Schema({
  who: String,
  amount: Number,
  info: String,
  budget: String,
  crossedOut: Boolean
})

const budgetSchema = new mongoose.Schema({
  name: String,
  users: Array
});

//Create User Model
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  budgets: Array
});

// Bind userSchema to passport for login.
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
const Budget = mongoose.model("Budget", budgetSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

// More boilerplate for passport. (User login)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// When requested, send user info.
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
})

// When requested, send user spesific select page data.
app.get('/api/select_page_info', (req, res) => {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) console.log(err);
      else {
        Budget.find({
          _id: {
            $in: foundUser.budgets
          }
        }, function(err, foundBudget) {
          if (err) console.log(err);
          else {
            res.send(foundBudget);
          }
        });
      }
    });

  }
});

// Has three purposes. adds new budget to the user, adds existing budget that belongs to another user
// or assigns global variable budgetId with the proper budgetId for the next, upcoming requests.
var budgetId; // This will be needed below. Best keep it as a global variable.
app.post('/api/select', (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (!err && foundUser) {

      var actionName = req.body.taskData.name;
      budgetId = req.body.taskData.value;

      if (actionName === "addNewBudget") {

        Budget.create({
          name: req.body.taskData.value
        }, function(err, budget) {
          if (err) console.log(err);
          else {
            budget.users.push(req.user.id);
            foundUser.budgets.push(budget._id);
            foundUser.save();
            budget.save();
            res.status(200).send('OK');
          }
        });

      } else if (actionName === "addExistingBudget") {

        Budget.findById(budgetId, function(err, foundBudget) {
          if (err) {
            console.log(err);
            res.status(406).send("Doesn't exist!");
          } else {
            foundBudget.users.push(req.user.id);
            foundUser.budgets.push(foundBudget._id);
            foundUser.save();
            foundBudget.save();
            res.status(200).send('OK');
          }

        });

      } else if (actionName === "budgetButton") {
        budgetId = req.body.taskData.value;
        res.status(200).send('OK');
      }
    } else console.log(err);
  })

});

// Gets and sends everything that will show up on the money page.
app.get('/api/money_page_info', (req, res) => {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (!err && foundUser && budgetId !== undefined) {

        Budget.findById(budgetId, function(err, foundBudget) {
          if (err) console.log(err);
          else {

            Transaction.find({
              budget: foundBudget._id
            }, function(err, foundTrans) {
              if (err) console.log(err);
              else {

                var uniqueUsers = foundTrans.map(user => user.who).filter((value, index, self) => self.indexOf(value) === index)

                Transaction.find({
                  budget: foundBudget.id,
                  who: {
                    $in: uniqueUsers
                  }
                }, function(err, amountsInTrans) {
                  if (err) console.log(err);

                  var userSpendingsTotal = [];
                  var usersTotalSpending;
                  var highestSummedAmount = 0;
                  var higestSummedPerson;

                  uniqueUsers.forEach((users, i) => {
                    userSpendingsTotal[i] = 0;

                    // Finds every user's total spendings and sums them.
                    amountsInTrans.forEach(function(amount, j) {
                      if (amount.who === users && amount.crossedOut == false) {
                        userSpendingsTotal[i] += amount.amount;
                      }

                    });

                    // Finds total spending of the user that is currently logged in.
                    if (foundUser.name === users) {
                      usersTotalSpending = userSpendingsTotal[i];
                    }

                    // Finds highest summed person and amount in this budget.
                    if (highestSummedAmount < userSpendingsTotal[i]) {
                      highestSummedAmount = userSpendingsTotal[i];
                      higestSummedPerson = users;
                    }

                  });

                  // Finds how much money left to reach the highest paid person.
                  for (var i = 0; i < uniqueUsers.length; i++) {

                    if (uniqueUsers[i] === foundUser.name) {
                      var userDebt = highestSummedAmount - userSpendingsTotal[i];

                      if (userDebt == 0) var isHighestPerson = true;
                      else isHighestPerson = false;
                    }
                  }

                  var payload = {
                    transes: foundTrans,
                    userName: foundUser.name,
                    house: foundBudget,
                    usersTotalSpending: usersTotalSpending,
                    isHighestPerson: isHighestPerson,
                    userDebt: userDebt,
                    higestSummedPerson: higestSummedPerson,
                    budgetId: budgetId
                  }

                  res.send(payload);

                });

              }
            });
          }
        });
      } else console.log(err);
    });

  }
});

// Add new spending, cross out a transition or logout.
app.post('/api/money_page_info', (req, res) => {
  User.findById(req.user.id, function(err, foundUser) {
    if (!err && foundUser) {

      var actionName = req.body.trans.name;

      if (actionName === "SubmitSpending") {

        Transaction.create({
            who: foundUser.name,
            amount: req.body.trans.amount,
            info: req.body.trans.info,
            budget: budgetId,
            crossedOut: false
          },
          function(err, trans) {
            if (err) console.log(err);
            else {
              res.status(200).send('OK');
            }

          });

      } else if (actionName === "Logout") {

        req.logout();
        res.status(200).send('OK');


      } else if (actionName === "CrossOut") {

        Transaction.findOne({
          _id: req.body.trans.transId
        }, (err, foundTrans) => {
          if (err) console.log(err);

          foundTrans.crossedOut = !foundTrans.crossedOut;
          foundTrans.save();

          res.status(200).send('OK');
        });

      } else if (actionName === "Leave") {

        const index = foundUser.budgets.indexOf(budgetId);
        if (index > -1) {
          foundUser.budgets.splice(index, 1);
        }
        foundUser.save();
        res.status(200).send('OK');

      }
    } else console.log(err);
  })
});

app.post('/api/register', (req, res) => {

  User.register({
    name: req.body.user.name,
    username: req.body.user.username
  }, req.body.user.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send('OK');
    }

  });
});

app.post('/api/login', (req, res) => {

  const user = new User({
    username: req.body.user.username,
    password: req.body.user.password
  });

  req.logIn(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send('OK');
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  // If we're on production, not developement.
  app.use(express.static('client/build')); // Look for a path inside this.

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
