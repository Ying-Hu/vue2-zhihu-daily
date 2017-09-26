/**
 * @description 转换日期字符串为合法格式(/)
 * @author FerdYing
 * @param {String}  timeString
 */
const changeDateFormat = (timeString) => {
  return timeString.substr(0, 4) + '/' + timeString.substr(4, 2) + '/' + timeString.substr(6, 2);
}

/**
 * @description 解析日期字符串并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，
 * @author FerdYing
 * @param {String} timeString ["20170903"]
 */
const parseDate = timeString => {
  return new Date(Date.parse(changeDateFormat(timeString)));
}

/**
 * @description 格式weekday
 * @author FerdYing
 * @param {Int}  day
 */
const weekDayFormat = (day) => {
  switch (day) {
    case 0:
      return '日'
      break;
    case 1:
      return '一'
      break;
    case 2:
      return '二'
      break;
    case 3:
      return '三'
      break;
    case 4:
      return '四'
      break;
    case 5:
      return '五'
      break;
    case 6:
      return '六'
      break;
    default:
      break;
  }
}

/**
 * @description 按照知乎日报日期格式格式化日期
 * @author FerdYing
 * @param {String}  dateString
 */
export const dateFormat = (dateString) => {
  let date = parseDate(dateString);
  let mounth = date.getMonth() + 1;
  let day = date.getDate();
  let weekday = weekDayFormat(date.getDay());
  return mounth + '月' + day + '日 ' + '星期' + weekday;
}

/**
 * @description 评论页日期格式化
 * @author FerdYing
 * @param {number} date {1506395861}
 */

export const commentDateFormat = (date) => {
  let d = new Date(date * 1000)
  return d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
}
