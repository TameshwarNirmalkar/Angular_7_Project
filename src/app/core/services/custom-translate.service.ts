import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomTranslateService {

  constructor(private translateService: TranslateService) { }

  translateColumns(prop: string, columns: any[]): any[] {
    for (const col of columns) {
      const propName: any = col;
      this.translateService.get(propName).subscribe((res: string) => {
        columns[prop] = res;
      });
    }
    return columns;
  }

  translateSelectItem(selectList: any[]): any[] {
    for (const selection of selectList) {
      this.translateProperty('label', selection);
    }
    return selectList;
  }

  translateProperty(prop: string, targetObj: any) {
    if (targetObj[prop] !== null && targetObj[prop] !== undefined) {
      this.translateService.get(targetObj[prop]).subscribe((res: string) => {
        targetObj[prop] = res;
      });
    }
  }

  translateString(str: string): string {
    this.translateService.get(str).subscribe((res: string) => {
      str = res;
    });
    return str;
  }

  translateDashboardCardList(cardList: any[]): any[] {
    for (const card of cardList) {
      const selList: any = card;
      this.translateCardProperty('mainDisplayText', {}, selList);
      this.translateCardProperty('footerLeftName', selList.footerLeftParams, selList);
      this.translateCardProperty('footerRightName', selList.footerRightParams, selList);
    }
    return cardList;
  }

  translateCardProperty(prop: string, params: any, targetObj: any) {
    if (targetObj[prop] !== null && targetObj[prop] !== undefined) {
      this.translateService.get(targetObj[prop], params).subscribe((res: string) => {
        targetObj[prop] = res;
      });
    }
  }

  getUserLanguage(): string {
    return this.translateService.currentLang;
  }

}
