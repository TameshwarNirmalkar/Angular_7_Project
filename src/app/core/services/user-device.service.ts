import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationDataService } from './application-data.service';

@Injectable()
export class UserDeviceService {

  private hasLocalStorage: any;

  private device: any = {
    name: '',
    model: '',
    device_type: '',
    version: '',
    ip: '',
    country_code: ''
  };

  constructor(
    private http: HttpClient,
    private applicationDataService: ApplicationDataService,
  ) {
  }


  fetchUserIp() {
    const url = `${this.applicationDataService.getEnvironment().IpAddressAPI}/smartapp/smartapp.asmx/GetIPAddress?callback=JSONP_CALLBACK`;
    return this.http.get(url);
  }

  isDeviceSupportLocalStorage(): boolean {
    if (this.hasLocalStorage) {
      return this.hasLocalStorage;
    } else {
      try {
        this.hasLocalStorage = (window.localStorage || localStorage.getItem) ? true : false;
      } catch (err) {
        this.hasLocalStorage = false;
      }
      return this.hasLocalStorage;
    }
  }

  fetchUserDeviceDetails() {
    // if (this.device.ip === '') {
    //   this.fetchUserIp().subscribe(res => {
    //     this.device.ip = res;
    //   });
    // }

    if (this.device.device_type === '') {
      this.initDeviceBrowserContext();
      this.initDeviceTypeInfo();
    }
    return this.device;
  }


  initDeviceBrowserContext() {
    const browserDtl: any = this.getBrowserInfo();
    this.device.name = browserDtl.name;
    this.device.version = browserDtl.version;
  }

  getBrowserInfo(): any {
    const browserDtl = { name: '', version: '' };
    const ua: any = navigator.userAgent;
    let tem: any;
    let M: any = ua.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      browserDtl.name = 'IE';
      browserDtl.version = tem[1] || '';
      return browserDtl;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        browserDtl.name = 'Opera';
        browserDtl.version = tem[1] || '';
        return browserDtl;
      }
      tem = ua.match(/\bEdge\/(\d+)/);
      if (tem != null) {
        browserDtl.name = 'Edge';
        browserDtl.version = tem[1] || '';
        return browserDtl;
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    const matched = (tem = ua.match(/version\/(\d+)/i));
    if (matched != null) {
      M.splice(1, 1, tem[1]);
    }
    browserDtl.name = M[0];
    browserDtl.version = M[1];
    return browserDtl;
  }

  initDeviceTypeInfo() {
    const smallDevice = navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i) != null;
    if (smallDevice || window.screen.width < 1024) {
      this.device.device_type = 'Small Device';
    } else {
      this.device.device_type = 'Computer';
    }
  }

  getDeviceIP() {
    return this.device.ip;
  }

  getIP(url) {
    // Pass the key for your callback (in this case 'callback')
    // as the second argument to the jsonp method
    return this.http.jsonp(url, 'callback');
  }
}
