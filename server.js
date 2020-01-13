const generate = require('nanoid/generate');
const Koa = require('koa');
const Router = require('@koa/router');

const { get, set } = require('./db')

const app = new Koa();
const router = new Router();

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

app.use(router.routes());

module.exports = {
    app
}