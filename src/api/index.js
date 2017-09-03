import axios from 'axios'

import API from './resource'

const Axios = {
  getNews: () => axios.get(API.NewsResource),
  getNewsById: (id) => axios.get(API.NewsIdResource + id),
  getNewsByData: (data) => axios.get(API.NewsDateResource + data),
  getNewsInfoById: (id) => {
    axios.get(API.NewsInfoResource, {
      params: {
        id: id
      }
    })
  },
  getTopics: () => axios.get(API.TopicsIdResource),
  getTopicsById: (topicId) => axios.get(API.TopicsIdResource + topicId),
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
