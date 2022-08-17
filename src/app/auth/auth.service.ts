import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { idToken, OAuthProvider, User, user } from '@angular/fire/auth';
import firebase from 'firebase/compat/app'; 
import {Users} from '../models/users';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError }  from '../services/http-error-handler.service';
import {MatSnackBar ,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {usercl} from '../models/userclass';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  APIendpoint=environment.APIEndpoint;
  handleError: HandleError;
  mainuser:usercl=new usercl();


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
    })
  };//end of httpoptions
  
  constructor(
  public router: Router,public afAuth: AngularFireAuth ,private http: HttpClient ,httpErrorHandler: HttpErrorHandler ,private _snackBar: MatSnackBar) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
   
   }

   doGoogleLogin(){
  
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('profile');
    provider.addScope('email'); 
  
    return   this.afAuth
    .signInWithPopup(provider).then((res)=>{
      //console.log("Res is goog login "+ JSON.stringify(res.user));
      //send a request to server for creation of user id at backend 
      this.setuser(res.user );
      var googuser:Users=res.user as Users;
      this.startLogin(googuser).then((result)=>{
        result.subscribe((data:any)=>{
          console.log("Data return is "+ JSON.stringify(data));
          if(data.usrexist|| data.usrcreated){
            //show the correct username in place of login

          }//end of if userexists
        });
      })


      //once login is done lets set user details at browser level
      //and update the username on the application

      //enable other options at navigation end 
     
    });
 }//end of doGoogleLogin

 
 startLogin(googuser:Users): Promise<any> {
  return new Promise((resolve,reject)=>{
    let usridtoken:any;
    const posturl = this.APIendpoint+'/api/user/login';

    this.getUserIDToken()?.then((res:any)=>{
      usridtoken=res;
       //console.log("Id token recieved " + usridtoken);
       let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'authorization': usridtoken
        })
      };//end of httpoptions
      //console.log(" calling http option ");
      resolve (this.http.post<any>(posturl,googuser,httpOptions));
    });
  });//end of promise
 }//end of start login

 

   getUserIDToken(): any{
  return  firebase.auth().currentUser?.getIdToken(true);
  }

  logout() {
   this.afAuth.signOut();
   localStorage.clear();
  }
  

  openSnackBar(msgprmpt:string) {
    this._snackBar.open(msgprmpt, '', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }//end of opensnackbar

  getLocalStorageUser():usercl{
    let retuser:usercl=new usercl();
    retuser.userid = <string>localStorage.getItem('userid');
    retuser.displayname = <string>localStorage.getItem('displayname');
    retuser.photourl = <string>localStorage.getItem('photourl');
    
    return retuser;
  }

  setuser(takeuser:any ){
    this.getUserIDToken().then((res:any)=>{
      localStorage.setItem('userid', takeuser.email);
      localStorage.setItem('token', res);
      localStorage.setItem('photourl',takeuser.photoURL);
      localStorage.setItem('displayname',takeuser.displayName);
    });
    //console.log("This.auth in userservice "+this.auth.currentUser + " coming from "+authsrvc.currentUser);
    this.mainuser.displayname=takeuser.displayName;
    this.mainuser.emailid=takeuser.email;
    this.mainuser.photourl= takeuser.photoURL;
    this.mainuser.userid='';
  }//end of setuser

}//end of class
