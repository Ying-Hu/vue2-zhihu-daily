import axios from 'axios'

import API from './resource'

const Axios = {
  getNews: () => axios.get(API.NewsResource),
  getNewsById: (id) => axios.get(API.NewsIdResource + id),
  getNewsByDate: (date) => axios.get(API.NewsDateResource + date),
  getNewsInfoById: (id) => axios.get(API.NewsInfoResource + id),
  getNewsLongCommentsById: (id) => axios.get(API.NewsCommentsResource + id + '/long-comments'),
  getNewsShortCommentsById: (id) => axios.get(API.NewsCommentsResource + id + '/short-comments'),
  getThemes: () => axios.get(API.ThemesResource),
  getThemesById: (themeId) => axios.get(API.ThemesIdResource + themeId),
  getThemeNewsBeforeById: (themeId, newsId) => axios.get(API.ThemesIdResource + themeId + '/before/' + newsId),
  getSections: () => axios.get(API.SectionsResource),
  getSectionsById: (sectionId) => {
    return axios.get(API.SectionIdResource, {
      params: {
        sectionId: sectionId
      }
    })
  }
}

export default Axios
