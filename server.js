const generate = require('nanoid/generate');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');

const { get, set, del } = require('./db')

const app = new Koa();
const router = new Router();
app.use(cors());

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


router.get('/generate', async ctx => {
    const id = generate(alphabet, 12);
    const response = await set({
        [id]: 1
    });
    if (response !== false) {
        ctx.body = id;
    } else {
        ctx.body = 'error'
    }
})

router.get('/check', async ctx => {
    const id = ctx.query.id;
    const status = await get(id);

    if (status === null) {
        ctx.body = {
            status: false,
            error: 'key does not exist'
        };
    } else if (status === 0) {
        ctx.body = {
            status: false,
            error: 'key has expired'
        };
    } else {
        ctx.body = {
            status: true
        }
    }
})

router.post('close', async ctx => {
    const id = ctx.body.id;
    del(id);

    const status = await get(id);
    if (status === null) {
        ctx.body = {
            status: true
        };
    } else {
        ctx.body = {
            status: false,
            error: 'key cannot be removed'
        };
    }
})

app.use(router.routes());

module.exports = {
    app
}