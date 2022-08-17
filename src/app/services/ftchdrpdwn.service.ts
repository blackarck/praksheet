import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError }  from '../services/http-error-handler.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FtchdrpdwnService {

  APIendpoint=environment.APIEndpoint;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
    })
  };//end of httpoptions

  constructor(  private http: HttpClient ,httpErrorHandler: HttpErrorHandler , private auths: AuthService ) { }

  fetchClasses(){
    const posturl = this.APIendpoint+'/api/dropdown/getclass';
    this.http.get<grades[]>(posturl).subscribe((res)=>{
    console.log("class out is "+ res[0].classlong);      
    })
    }

    fetchSubject(){
      const posturl = this.APIendpoint+'/api/dropdown/getsubject';
      this.http.get<subject[]>(posturl).subscribe((res)=>{
      console.log("subjects out is "+ res[0].subject + " ,total-"+res.length);      
      })
      }

    fetchLanguage(){
      const posturl = this.APIendpoint+'/api/dropdown/getlang';
      this.http.get<language[]>(posturl).subscribe((res)=>{
      console.log("lang out is "+ res[0].language + " ,total-"+res.length);      
      })
    }

}//end of class

export class grades {
  classid: string ='';
  classshort : string ='';
  classlong: string='';
}

export class subject {
  subjid : number=0;
  subject: string='';
}

export class language {
  langid : number=0;
  language: string='';
}