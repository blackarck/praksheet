import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {usercl} from '../models/userclass';

@Component({
  selector: 'app-logincmp',
  templateUrl: './logincmp.component.html',
  styleUrls: ['./logincmp.component.scss']
})
export class LogincmpComponent implements OnInit {

  submitted=false;
  errormsg=false;
  errormsgtxt="";
  loginform =  this.fb.group({
  userid : new FormControl('', [Validators.required, Validators.min(5)]),
  password : new FormControl('',Validators.required)
  });
  bIsUsrLog:Boolean=false;
  mainuser:usercl=new usercl();


  constructor(public a:AuthService,private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog) { 
    this.mainuser=this.a.getLocalStorageUser();
    if(this.mainuser.userid){
      console.log("Main user is not null "+ this.mainuser.displayname);
      this.bIsUsrLog=false;
      //
     }else{
      this.bIsUsrLog=true;
     }
  }

  ngOnInit(): void {
  }

  onSubmit(googForm:any){
  }

  googlogin(){
    this.a.doGoogleLogin();
  }//end of googlogin

  register(){
    //show a prompt window for register with email or google
  }
}//end of class

interface User {   
  uid: string;
  email: string; 
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

interface Userprop{
  email: string;
  phone: string;
  last_name: string;
  first_name: string;
  companyid: string;
  company_name: string;
}  
