const { promisify } = require('util');
var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


async function get(id) {
    const status = await getAsync(id);
    return status;
}

async function set(params) {
    const key = Object.keys(params)[0];
    const value = params[key]

    if (typeof key !== 'string') {
        console.error('type error, key is not a strint')
        return false;
    }

    const status = await get(key)
    if (status !== null) {
        console.error('key has already existed, key = ', key, 'result = ', status)
        return false
    }

    const res = await setAsync(key, value);
    return res;
}

async function del(key) {
    if (typeof key !== 'string') {
        console.error('type error, key is not a strint')
        return false;
    }

    client.del(key)
}

module.exports = {
    get,
    set,
    del
}