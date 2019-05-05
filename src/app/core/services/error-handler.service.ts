import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ErrorHandlerService {


  constructor(private notifyService: NotifyService) { }

  handleError(source: string, error: any) {
    let errMsg: string;
    if (error) {
      errMsg = error.message ? error.message : error.toString();
    }
    this.notifyService.notifyErrorLogger({ component: source, error: errMsg });
    return throwError(errMsg);
  }

}
