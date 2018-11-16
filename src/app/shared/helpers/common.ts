import * as moment from 'moment';
export function Guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}
export function ConvertToAscii(str) {
  if (!str) return '';
  return (str = str
    .toLowerCase()
    .replace('[', '')
    .replace(']', '')
    .replace(/[áàãạảâầấậẫẩăằắẵặẳ]/g, 'a')
    .replace(/[èéẹẽẻêếềễểệ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'e')
    .replace(/[òóõọỏôỗộồốổơỡờớợỡở]/g, 'o')
    .replace(/[ùúụũủưừứựữử]/g, 'u')
    .replace(/[ýỳỹỷỵ]/g, 'y')
    .replace(/[đ]/g, 'd')
    .replace(/[~\`!@#$%^&*()-_+={}\\|;:\'\"<,>.?/”“‘’„‰‾–—]/g, ''));
}
export function RemoveChars(str) {
  if (!str) return '';
  return (str = str
    .toLowerCase()
    .replace(/[~`!@#$%^&*()\[{}\]\\|;:\'\",<>./?]/g, ''));
}
export function ConvertObject(data, ignore = 'id', removeNull = true) {
  const obj = {};
  if (ignore) {
    Object.keys(data).forEach(function(key, index) {
      if (key !== ignore) {
        if (data[key]) {
          obj[key] = data[key];
        } else {
          if (!removeNull) obj[key] = null;
        }
      }
    });
  } else {
    Object.keys(data).forEach(function(key, index) {
      if (data[key]) {
        obj[key] = data[key];
      } else {
        if (!removeNull) obj[key] = null;
      }
    });
  }
  return obj;
}
export function NewDate(format = 'DD/MM/YYYY hh:mm:ss') {
  if (format === 'full') return moment().format();
  if (format === 'datetime') return moment().format('DD/MM/YYYY hh:mm:ss');
  if (format === 'date') return moment().format('DD/MM/YYYY');
  if (format === 'time') return moment().format('hh:mm:ss');
  else return moment().format(format);
}

export function ObjectToQuery(obj) {
  let rs = '?';
  if (!obj) return rs;
  Object.keys(obj).forEach(function(key, index) {
    if (typeof obj[key] === 'object') {
      if (obj[key].name) rs += `${obj[key].name}=${obj[key].value}&`;
    } else {
      if (obj[key].toString().length > 0) rs += `${key}=${obj[key]}&`;
    }
  });
  return rs.substr(0, rs.length - 1);
}
export function FilesToString(files, chars = ',') {
  let rs = '';
  if (!files) return rs;
  if (files.length < 1) return rs;
  rs = chars;
  files.forEach(x => {
    rs += x.url + chars;
  });
  return rs;
}
export function StringToFiles(str, chars = ',') {
  const rs = [];
  if (!str) return rs;
  this.trim(str, chars)
    .split(',')
    .forEach(x => {
      rs.push({
        url: x,
        name: this.StringToName(x),
        extension: this.getExtension(x)
      });
    });
  return rs;
}
export function StringToName(str) {
  let x = str.split('/');
  x = x[x.length - 1].split('.')[0];
  return x;
}
export function FilesToHtml(files, str = '') {
  files.forEach(x => {
    if (this.isImage(x.url))
      str += `<p><img src='${x.url}' class='img-fluid' title='${x.name}'></p>`;
    else str += `<p><a href='${x.url}'>${x.name}</a></p>`;
  });
  return str;
}
export function GetImage(file) {
  return new Promise((resolve, reject) => {
    const fReader = new FileReader();
    const img: any = document.createElement('img');

    fReader.onload = () => {
      img.src = fReader.result;
      resolve(GetBase64Image(img));
    };

    fReader.readAsDataURL(file);
  });
}
export function GetBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const dataURL = img.src;
  return dataURL;
}
export function CheckExtension(str, ext) {
  if (!str) return false;
  let condition = '';
  ext.forEach(i => {
    condition += i + '|';
  });
  const reg = new RegExp(
    '.(' + condition.substring(0, condition.length - 1) + ')$'
  );
  return reg.test(str.toLowerCase());
}
export function isImage(str) {
  if (!str) return false;
  return /\.(gif|jpg|jpeg|tiff|png)$/i.test(str.toLowerCase());
}
export function isAudio(str) {
  if (!str) return false;
  return /\.(mp3|wav|wave|ogg|m4a|3ga|4mp|aa3)$/i.test(str.toLowerCase());
}
export function isVideo(str) {
  if (!str) return false;
  return /\.(3g2|3gp|3gp2|3gpp|3gpp2|amv|flv|gom|mp4|mov|mpe|mpeg|mpg||kmv|mkv|wvm|wmv)$/i.test(
    str.toLowerCase()
  );
}
export function isPdf(str) {
  if (!str) return false;
  return /\.(pdf)$/i.test(str.toLowerCase());
}
export function getExtension(str, dot = true) {
  if (!str) return '';
  const re = /(?:\.([^.]+))?$/;
  return (dot ? '.' : '') + re.exec(str)[1].toLowerCase();
}
