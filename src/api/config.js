const config = {
  site: 'https://news-at.zhihu.com',
  context: '/api'
}

let API_CONTEXT = config.context

if (process.env.NODE_ENV === 'production') {
  API_CONTEXT = config.site + config.context
}

export default API_CONTEXT
