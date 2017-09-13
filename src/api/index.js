import axios from 'axios'

import API from './resource'

const Axios = {
  getNews: () => axios.get(API.NewsResource),
  getNewsById: (id) => axios.get(API.NewsIdResource + id),
  getNewsByDate: (date) => axios.get(API.NewsDateResource + date),
  getNewsInfoById: (id) => {
    axios.get(API.NewsInfoResource, {
      params: {
        id: id
      }
    })
  },
  getThemes: () => axios.get(API.ThemesResource),
  getThemesById: (themeId) => axios.get(API.ThemesIdResource + themeId),
  getSections: () => axios.get(API.SectionsResource),
  getSectionsById: (sectionId) => {
    axios.get(API.SectionIdResource, {
      params: {
        sectionId: sectionId
      }
    })
  }
}

export default Axios
