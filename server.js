const generate = require('nanoid/generate');
const Koa = require('koa');
const Router = require('@koa/router');

const { set } = require('./db')

const app = new Koa();
const router = new Router();

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


router.get('/generate', async ctx => {
    const id = generate(alphabet, 12);
    const response = await set({
        id: 1
    });
    if (response !== false) {
        ctx.body = id;
    } else {
        ctx.body = 'error'
    }
})

app.use(router.routes());

module.exports = {
    app
}