import cookies from 'browser-cookies';
import { message, Modal } from 'antd';
import { PIC_PREFIX } from './config';
// import './lib/BigDecimal';

/**
 * 保存用户登录信息
 * @param userId
 * @param token
 */
export function setUser({userId, token}) {
  cookies.set('userId', userId);
  cookies.set('token', token);
}

// 删除用户登录信息
export function clearUser() {
  cookies.erase('userId');
  cookies.erase('token');
}

// 获取用户编号
export function getUserId() {
  return cookies.get('userId');
}

// 获取公司编号
export function getCompanyCode() {
  return cookies.get('companyCode');
}

// 设置用户角色信息
export function setRoleInfo({roleCode, companyCode, loginName}) {
  cookies.set('roleCode', roleCode);
  companyCode && cookies.set('companyCode', companyCode);
  cookies.set('userName', loginName);
}

// 获取用户角色编号
export function getRoleCode() {
  return cookies.get('roleCode');
}

// 获取用户username
export function getUserName() {
  return cookies.get('userName');
}

/**
 * 通过正则表达式获取URL传递参数
 * @param name
 * @returns
 */
export function getQueryString(name, search) {
  search = search || window.location.search;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = search.substr(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

/**
 * 获取正确的url，使其以'/'开头
 * @param url
 */
export function getRealUrl(url) {
  if (url && url !== '#') {
    url = /^\//.test(url) ? url : '/' + url;
  }
  return url;
}

/**
 * 日期格式转化
 * @param date
 * @param fmt
 */
export function formatDate(date, fmt = 'yyyy-MM-dd') {
  if (isUndefined(date)) {
    return '-';
  }
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 获取两位格式化数字
 * @param str
 */
export function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 日期格式转化 yyyy-MM-dd
 * @param date
 * @param format
 */
export function dateFormat(date) {
  return formatDate(date, 'yyyy-MM-dd');
}

/**
 * 日期格式转化 yymmdd
 * @param date
 * @param format
 */
export function dateListFormat(date) {
  let datestr = dateFormat(date);
  let arr = datestr.split('-');
  return arr[0].substr(2, 2) + arr[1] + arr[2];
}

/**
 * 日期格式转化 yyyy-MM
 * @param date
 * @param format
 */
export function monthFormat(date) {
  date = formatDate(date, 'yyyy-MM-dd');
  let arr = date.split('-');
  arr.length = 2;
  date = arr.join('-');
  return date;
}

/**
 * 日期格式转化 yyyy-MM-dd hh:mm:ss
 * @param date
 * @param format
 */
export function dateTimeFormat(date) {
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

/**
 * 金额格式转化
 * @param money
 * @param format
 */
export function moneyFormat(money, format, isRe = true) {
  var flag = true;
  if (isUndefined(money) || isNaN(money)) {
    return '';
  }
  if (money < 0) {
    money = -1 * money;
    flag = false;
  }
  if (isUndefined(format) || typeof format === 'object') {
    format = 2;
  }
  // 钱除以1000并保留两位小数
  money = (money / 1000).toString();
  var reg = new RegExp('(\\.\\d{' + format + '})\\d+', 'ig');
  money = money.replace(reg, '$1');
  money = parseFloat(money).toFixed(format);
  // 千分位转化
  if (isRe) {
    var re = /\d{1,3}(?=(\d{3})+$)/g;
    money = money.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => (s1.replace(re, '$&,') + s2));
  }
  if (!flag) {
    money = '-' + money;
  }
  return money;
}

/**
 * 把格式化金额转成接口需要的
 * @param money
 * @param rate
 */
export function moneyParse(money, rate = 1000) {
  let m0 = ('' + money).replace(/,/g, '');
  return m0 === '' ? '' : (+m0 * rate).toFixed(0);
}

/**
 * 把格式化金额去掉逗号
 * @param money
 */
export function moneyReplaceComma(money) {
  return ('' + money).replace(/,/g, '');
}

/**
 * 大数相乘
 * @param a
 * @param b
 */
// export function multiply(a, b) {
//   if (a && b) {
//     let _a = new BigDecimal(a);
//     var _b = new BigDecimal(b);
//     return _a.multiply(_b).toString();
//   }
//   return '';
// }

/**
 * 格式化文件地址
 * @param urls
 * @param suffix
 */
export function formatFile(urls, suffix = '') {
  if (!urls) {
    return '';
  }
  let url = urls.split(/\|\|/)[0];
  if (!/^http|^data:image/i.test(url)) {
    let index = url.indexOf('?imageMogr2');
    if (index !== -1) {
      suffix = url.substr(index);
      url = url.substr(0, index);
    }
    url = PIC_PREFIX + encodeURIComponent(url) + suffix;
  }
  return url;
}

/**
 * 格式化图片地址
 * @param imgs
 * @param suffix
 */
export function formatImg(imgs, suffix = '?imageMogr2/auto-orient/thumbnail/!300x300') {
  return formatFile(imgs, suffix);
}

export function isUndefined(value) {
  return value === undefined || value === null || value === '';
}

export function tempString(str, data) {
  return str.replace(/\{\{(\w+)\.DATA\}\}/gi, function(matchs) {
    var returns = data[matchs.replace(/\{\{(\w+)\.DATA\}\}/, '$1')];
    return isUndefined(returns) ? '' : returns;
  });
}
;

export function showMsg(msg, type = 'success', time = 2) {
  message[type](msg, time);
}

export function showWarnMsg(msg, time = 2) {
  showMsg(msg, 'warning', time);
}

export function showSucMsg(msg, time = 2) {
  showMsg(msg, 'success', time);
}

export function showErrMsg(msg, time = 2) {
  showMsg(msg, 'error', time);
}

export function showConfirm({okType = 'primary', onOk, onCancel}) {
  Modal.confirm({
    okType,
    title: '您确定要删除该条记录吗?',
    content: '删除记录后无法还原',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    }
  });
}

export function showDelConfirm({onOk, onCancel}) {
  showConfirm({
    okType: 'danger',
    onOk,
    onCancel
  });
}
export function convertCurrency(currencyDigits) {
  if (isUndefined(currencyDigits)) {
    return '';
  }
  currencyDigits = moneyReplaceComma(currencyDigits);
  if (isNaN(currencyDigits)) {
    return '';
  }
  if(currencyDigits < 0) {
    currencyDigits = -currencyDigits;
  }
  var MAXIMUM_NUMBER = 99999999999.99;
  // Predefine the radix characters and currency symbols for output:
  var CN_ZERO = '零';
  var CN_ONE = '壹';
  var CN_TWO = '贰';
  var CN_THREE = '叁';
  var CN_FOUR = '肆';
  var CN_FIVE = '伍';
  var CN_SIX = '陆';
  var CN_SEVEN = '柒';
  var CN_EIGHT = '捌';
  var CN_NINE = '玖';
  var CN_TEN = '拾';
  var CN_HUNDRED = '佰';
  var CN_THOUSAND = '仟';
  var CN_TEN_THOUSAND = '万';
  var CN_HUNDRED_MILLION = '亿';
  var CN_DOLLAR = '元';
  var CN_TEN_CENT = '角';
  var CN_CENT = '分';
  var CN_INTEGER = '整';
  var integral; // Represent integral part of digit number.
  var decimal; // Represent decimal part of digit number.
  var outputCharacters; // The output result.
  var parts;
  var digits,
    radices,
    bigRadices,
    decimals;
  var zeroCount;
  var i,
    p,
    d;
  var quotient,
    modulus;
  currencyDigits = currencyDigits.toString();
  if (currencyDigits === '') {
    alert('请输入小写金额！');
    return '';
  }
  if (currencyDigits.match(/[^,.\d]/) !== null) {
    alert('');
    return '';
  }
  if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
    alert('小写金额的格式不正确！');
    return '';
  }
  currencyDigits = currencyDigits.replace(/,/g, ''); // Remove comma delimiters.
  currencyDigits = currencyDigits.replace(/^0+/, ''); // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
    alert('金额过大，应小于1000亿元！');
    return '';
  }

  // Process the coversion from currency digits to characters:
  // Separate integral and decimal parts before processing coversion:
  parts = currencyDigits.split('.');
  if (parts.length > 1 && !/^0+$/.test(parts[1])) {
    integral = parts[0];
    decimal = parts[1];
    // Cut down redundant decimal digits that are after the second.
    decimal = decimal.substr(0, 2);
  } else {
    integral = parts[0];
    decimal = '';
  }
  // Prepare the characters corresponding to the digits:
  digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE];
  radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND];
  bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
  decimals = [CN_TEN_CENT, CN_CENT];
  // Start processing:
  outputCharacters = '';
  // Process integral part if it is larger than 0:
  if (Number(integral) > 0) {
    zeroCount = 0;
    for (i = 0; i < integral.length; i++) {
      p = integral.length - i - 1;
      d = integral.substr(i, 1);
      quotient = p / 4;
      modulus = p % 4;
      if (d === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          outputCharacters += digits[0];
        }
        zeroCount = 0;
        outputCharacters += digits[Number(d)] + radices[modulus];
      }
      if (modulus === 0 && zeroCount < 4) {
        outputCharacters += bigRadices[quotient];
        zeroCount = 0;
      }
    }
    outputCharacters += CN_DOLLAR;
  }
  // Process decimal part if there is:
  if (decimal !== '') {
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1);
      if (d !== '0') {
        outputCharacters += digits[Number(d)] + decimals[i];
      }
    }
  }
  // Confirm and return the final output string:
  if (outputCharacters === '') {
    outputCharacters = CN_ZERO + CN_DOLLAR;
  }
  if (decimal === '') {
    outputCharacters += CN_INTEGER;
  }
  return outputCharacters;
}
/**
 * 金额转换大写
 * @param money
 */
export function moneyUppercase(Num) {
  return convertCurrency(Num);
}

/**
 * 数字转换大写
 * @param number
 */
export function numUppercase(Num) {
  let newNum = convertCurrency(Num);
  newNum = newNum.replace(/元|整/gi, '');
  return newNum;
}

/**
 * 四舍五入保留2位小数（不够位数，则用0替补）
 * @param number
 */
export function keepTwoDecimalFull(num) {
  let number = Math.round(num * 100) / 100;
  return number;
}

/**
 * 金额格式转化
 * @param money
 * @param format
 */
export function moneyFormat2(money, format, isRe = true) {
  var flag = true;
  if (isUndefined(money) || isNaN(money)) {
    return '';
  }
  if (money < 0) {
    money = -1 * money;
    flag = false;
  }
  if (isUndefined(format) || typeof format === 'object') {
    format = 2;
  }
  // 钱除以1000并保留两位小数
  money = (money / 1000).toString();
  var reg = new RegExp('(\\.\\d{' + 0 + '})\\d+', 'ig');
  money = money.replace(reg, '$1');
  money = parseFloat(money).toFixed(0);
  // 千分位转化
  if (isRe) {
    var re = /\d{1,3}(?=(\d{3})+$)/g;
    money = money.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => (s1.replace(re, '$&,') + s2));
  }
  if (!flag) {
    money = '-' + money;
  }
  return money;
}
