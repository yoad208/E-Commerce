import Server from 'json-server'

const server = Server.create()
const router = Server.router('public/database.json')
const middlewares = Server.defaults()

server.use(middlewares)

server.use(Server.bodyParser)
server.put('/shoppingCart/all', async (req, res) => {
    const data = req.body;
    await res.json(router.db.set('shoppingCart', data).value());
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})