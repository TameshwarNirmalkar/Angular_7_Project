import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

  constructor() { }

  handleError(source: string, error: any) {
    const errMsg: string = error.message ? `${source} :::: ${error.message}` : error.toString();
    // this.notifyService.notifyErrorLogger({ component: source, error: errMsg });
    return Observable.throw(errMsg);
  }

}
