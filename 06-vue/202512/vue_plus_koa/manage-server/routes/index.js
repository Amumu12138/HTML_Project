const router = require('koa-router')()
const log4js = require('../utils/log4j')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })

  log4js.info('index ouput Hello Koa 2')
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
  log4js.error('string error called')
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
