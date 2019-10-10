const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

/*
    Esta URL tiene caracteres especiales por el password, para que no tenga problemas,
    codificamos los caracteres del password y de paso del user 
*/
const USERNAME = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${config.dbHost}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        //  Creo un nuevo cliente de la libreria de mongo
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if (error) {
                    reject(error);
                }

                console.log(`Successfully connected to mongo`);
                resolve(this.client.db(this.dbName));
            })
        })
    }

    getAll(collection, query) {
        return this.connect()
            .then(db => db.collection(collection).find(query).toArray());
    }

    get(collection, id) {
        return this.connect()
            .then(db => db.collection(collection).findOne({ _id: ObjectId(id) }));
    }

    create(collection, data) {
        return this.connect()
            .then(db => db.collection(collection).insertOne(data))
            .then(result => result.insertedId);
    }

    update(collection, id, data) {
        return this.connect()
            .then(db => db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }))
            .then(result => result.upsertId || id);
    }

    delete(collection, id) {
        return this.connect()
            .then(db => db.collection(collection).deleteOne({ _id: ObjectId(id) }))
            .then(() => id);
    }
}

module.exports = MongoLib;