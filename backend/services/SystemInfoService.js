// systemInfoService.js

export default class SystemInfoService {
  constructor(req) {
    this.userAgent = req.headers['user-agent'] || '';
  }

  getOS() {
    let osPlatform = 'Unknown OS Platform';
    const osArray = {
      'windows nt 10': 'Windows 10',
      'windows nt 6.3': 'Windows 8.1',
      'windows nt 6.2': 'Windows 8',
      'windows nt 6.1': 'Windows 7',
      'windows nt 6.0': 'Windows Vista',
      'windows nt 5.2': 'Windows Server 2003/XP x64',
      'windows nt 5.1': 'Windows XP',
      'windows xp': 'Windows XP',
      'windows nt 5.0': 'Windows 2000',
      'windows me': 'Windows ME',
      'win98': 'Windows 98',
      'win95': 'Windows 95',
      'win16': 'Windows 3.11',
      'macintosh|mac os x': 'Mac OS X',
      'mac_powerpc': 'Mac OS 9',
      'linux': 'Linux',
      'ubuntu': 'Ubuntu',
      'iphone': 'iPhone',
      'ipod': 'iPod',
      'ipad': 'iPad',
      'android': 'Android',
      'blackberry': 'BlackBerry',
      'webos': 'Mobile'
    };

    for (const pattern in osArray) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(this.userAgent)) {
        osPlatform = osArray[pattern];
        break;
      }
    }

    return osPlatform;
  }

  getBrowser() {
    let browser = 'Unknown Browser';
    const browserArray = {
      'msie': 'Internet Explorer',
      'firefox': 'Firefox',
      'safari': 'Safari',
      'chrome': 'Chrome',
      'edge': 'Edge',
      'opera': 'Opera',
      'netscape': 'Netscape',
      'maxthon': 'Maxthon',
      'konqueror': 'Konqueror',
      'mobile': 'Handheld Browser'
    };

    for (const pattern in browserArray) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(this.userAgent)) {
        browser = browserArray[pattern];
        break;
      }
    }

    return browser;
  }
}

