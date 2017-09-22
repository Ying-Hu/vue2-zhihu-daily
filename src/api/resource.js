import API_CONTEXT from './config'

const api = {
  startimage: '/4/start-image/1080*1776',
  news: '/4/news/latest',
  newsbyid: '/4/news/',
  newsbydate: '/4/news/before/',
  newsinfo: '/4/story-extra/',
  themes: '/4/themes',
  themebyid: '/4/theme/',
  sections: '/3/sections',
  sectionbyid: '/3/section'
}

const API = {
  NewsResource: API_CONTEXT + api.news,
  NewsIdResource: API_CONTEXT + api.newsbyid,
  NewsDateResource: API_CONTEXT + api.newsbydate,
  NewsInfoResource: API_CONTEXT + api.newsinfo,
  ThemesResource: API_CONTEXT + api.themes,
  ThemesIdResource: API_CONTEXT + api.themebyid,
  SectionsResource: API_CONTEXT + api.sections,
  SectionIdResource: API_CONTEXT + api.sectionbyid
}

export default API
