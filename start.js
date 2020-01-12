const { wsServer } = require('./sync')
const { app } = require('./server')

wsServer.start()
app.listen("6021")