const session = require('express-session')
const MongoDbStore = require('connect-mongo')

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: false,
        httpOnly: true,
        maxAge: 60000000
      },
      store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_URI
      })
    })
  )
}