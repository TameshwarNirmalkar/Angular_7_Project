import { NgModule } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const CreateTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

const ANGULAR_MODULE = [
  FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, HttpClientJsonpModule
];

@NgModule({
  imports: [
    ...ANGULAR_MODULE,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService, LowerCasePipe],
  exports: [
    ...ANGULAR_MODULE
  ]
})
export class AngularModule { }
