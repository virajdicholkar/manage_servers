/** imports */
var http = require('http')
var httpDispatcher = require('httpdispatcher')

var serverModel = require('./model/server-model')

var servers = {}

const getServers = function () {
    let servers = serverModel.find()
    return servers;
}

const runServer = (_id, port, apiArray) => {
    const newHttpDispatcher = new httpDispatcher()
    /** adding routes */

    apiArray.forEach(a => {
        const { method, api, response } = a
        eval(`var cb=${response}`)
        if (method == "GET")
            newHttpDispatcher.onGet(api, cb)
        if (method == "POST")
            newHttpDispatcher.onPost(api, cb)
        if (method == "PUT")
            newHttpDispatcher.onPut(api, cb)
        if (method == "DELETE")
            newHttpDispatcher.onDelete(api, cb)
    }
    )


    servers[_id] = http.createServer((req, res) => {
        newHttpDispatcher.dispatch(req, res)
    })

    servers[_id].on('error', (e) => {
        console.log(e)
    });

    servers[_id].listen(port)

}



/**run server at start*/
const runServerAtStart = () => {
    getServers().then(data => {
        data.forEach(s => {
            const { _id, port, running, api } = s
            if (running) {
                runServer(_id, port, api)
            }
        })
    })
}

runServerAtStart()

const serverMethods = {
    /** create server */
    createServer: function (req, res) {
        const { host, port } = req.body
        const api = [{ api: "/", method: "GET", response: "(req, res) => {res.writeHead(200, { 'Content-Type': 'text/plain' });res.write('Hii hello hello World from new api!');res.end();}" }], running = false
        var newServer = { host, port, running, api }
        serverModel.create(newServer, (err, doc) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong" })
            } else {
                res.status(200).json({ message: "Server created", data: doc })
            }
        })

    },

    /** start server */
    startServer: function (req, res) {
        const { _id } = req.params
        serverModel.findById(_id, (err, doc) => {
            if (err) {
                res.status(404).json({ error: "Server not found" })
            }
            else {
                const { _id, port, host } = doc
                servers[_id] = http.createServer((req, res) => {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('Hello World!');
                    res.end();
                })

                servers[_id].on('error', (e) => {
                    if (e.code === 'EADDRINUSE') {
                        res.status(500).json({ error: "Port is busy" })
                    }
                });

                servers[_id].listen(port, () => {
                    doc.running = true
                    doc.save()
                    res.status(200).json({ message: `Server is started on port ${port}` })
                })
            }
        })
    },

    /**stop server */
    stopServer: function (req, res) {
        const { _id } = req.params
        if (servers[_id]) {
            servers[_id].close()
            serverModel.findById(_id, function (err, doc) {

                if (err)
                    res.status(400).json({ message: "Something went wrong" })
                else {
                    doc.running = false
                    doc.save();
                    delete servers[_id]
                    res.status(200).json({ message: "server stopped" })
                }
            });
        } else {
            res.status(404).json({ error: "Server not runnning" })
        }
    },

    /** get all servers */
    getAllServers: function (req, res) {
        getServers().then(data => {
            res.status(200).json({ data: data })
        }).catch(() => {
            res.status(500).json({ error: "Something went wrong" })
        })
    },

    /** retrieve one server */
    getOneServer: function (req, res) {
        const { _id } = req.params
        serverModel.findById(_id, (err, doc) => {
            if (err) {
                res.status(404).json({ error: "Server not found" })
            }
            else {
                res.status(200).json({ data: doc })
            }
        })
    },
    /** add api to server */
    addApi(req, res) {
        const { _id } = req.params
        const { api, response, method } = req.body
        serverModel.findById(_id, (err, doc) => {
            if (err) {
                res.status(404).json({ error: "Server not found" })
            } else {
                doc.api.push({ api, response, method })
                doc.save()
                if (servers[_id]) {
                    servers[_id].close()
                    delete servers[_id]
                    runServer(_id, doc.port, doc.api)
                }
                res.status(200).json({ message: "Api added" })

            }
        })
    }
}
module.exports = serverMethods
