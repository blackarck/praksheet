import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError }  from '../services/http-error-handler.service';
import { AuthService } from '../auth/auth.service';
import { subject } from '../models/subject';
import { grades } from '../models/grades';
import {language} from '../models/language';
import { Observer } from 'firebase/messaging';

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
 
     return this.http.get<grades[]>(posturl) 
    }//end of fetchclass

    fetchSubject(){
      const posturl = this.APIendpoint+'/api/dropdown/getsubject';
      return this.http.get<subject[]>(posturl);
      /*
      this.http.get<subject[]>(posturl).subscribe((res)=>{
      //console.log("subjects out is "+ res[0].subject + " ,total-"+res.length);      
      })*/
      }

    fetchLanguage(){
      const posturl = this.APIendpoint+'/api/dropdown/getlang';
      return this.http.get<language[]>(posturl);
    }

    fetchReport(formdata:any){
      const posturl = this.APIendpoint+'/api/practicesheet/getquest';
       //console.log("inside fetch reprot "+JSON.stringify(formdata));
       return this.http.post<any>(posturl,formdata);
    }

     postQstn(formdata:any) {
      const posturl = this.APIendpoint+'/api/practicesheet/postquest';
      return this.auths.getuserIDTokenOB().pipe(map((res)=>{
        //console.log("res is "+res);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'authorization': res
          })
        };//end of httpoptions
          return this.http.post<any>(posturl,formdata,httpOptions);
      }))     
    }//end of post question

    
    ftchKarma(){
      const posturl = this.APIendpoint+'/api/practicesheet/usrkarma';
      return this.auths.getuserIDTokenOB().pipe(map((res)=>{
        //console.log("res is "+res);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'authorization': res
          })
        };//end of httpoptions
          return this.http.get<any>(posturl,httpOptions);
      }))     
    }// end of fetch karma
 
    ftchMyQstn(pgcount:number){
      const posturl = this.APIendpoint+'/api/practicesheet/myqstn';
      return this.auths.getuserIDTokenOB().pipe(map((res)=>{
        //console.log("res is "+res);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'authorization': res
          })
        };//end of httpoptions
        let bodydt = {
          pgcnt: pgcount
        }
          return this.http.post<any>(posturl,bodydt,httpOptions);
      }))     
    }//end of fetch my questions

    /****Delete a user questions ********/
    delMyQstn(questid:string){
      const posturl = this.APIendpoint+'/api/practicesheet/delmyqstn';
      return this.auths.getuserIDTokenOB().pipe(map((res)=>{
        //console.log("res is "+res);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'authorization': res
          })
        };//end of httpoptions
        let bodydt = {
          qstid: questid
        }
          return this.http.post<any>(posturl,bodydt,httpOptions);
      }));
    }//end of fetch my questions

    doQstnlike(questid:string){
      const posturl = this.APIendpoint+'/api/practicesheet/likeqstn';
      return this.auths.getuserIDTokenOB().pipe(map((res)=>{
        //console.log("res is "+res);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'authorization': res
          })
        };//end of httpoptions
        let bodydt = {
          qstid: questid
        }
          return this.http.post<any>(posturl,bodydt,httpOptions);
      })); 
    }//end of doqstnlike

}//end of class
