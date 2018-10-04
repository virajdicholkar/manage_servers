const config={
    host:"localhost",
    port:1234,
    mongo:{
        port:27017,
        host:"localhost",
        db:'ServersDatabase'
    },
}
config.mongo.url='mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db;

module.exports=config