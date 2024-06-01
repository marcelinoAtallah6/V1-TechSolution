import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {

  public static headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  public static loginHeader = new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded');

  public static sessionTimeOutCounter: any = 1000 * 60 * 60;

}