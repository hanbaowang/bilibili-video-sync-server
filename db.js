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
        return false;
    }

    const status = await get(key)
    if (status !== null) {
        return false
    }

    return await setAsync(key, value);
}

module.exports = {
    get,
    set
}