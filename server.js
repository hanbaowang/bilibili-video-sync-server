const nanoid = require('nanoid')
const Koa = require('koa');

const { set } = require('./db')

const app = new Koa();

app.use(async ctx => {
    const id = nanoid();
    const response = await set();
    if (response !== false) {
        ctx.body = id;
    }
});

module.exports = {
    app
}