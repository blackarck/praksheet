import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar ,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading = false;
  errormsgtxt:any;
  errormsg=false;
  registerform =  this.fb.group({
    clientname: new FormControl(''),
    add1:new FormControl(''),
    add2:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl(''),
    country :new FormControl(''),
    contactname :new FormControl(''),
    emailid :new FormControl('',[ Validators.required, Validators.email, ]),
    phone :new FormControl(''),
    googform: new FormControl(false)
  });
   dispname=this.route.snapshot.paramMap.get('displayname')||' ';
   googemail=this.route.snapshot.paramMap.get('emailid')||' ';
   googformval:boolean = <boolean> (this.route.snapshot.paramMap.get('googformval')||false);
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
    })
  };//end of httpoptions

  constructor(private _snackBar: MatSnackBar,private http: HttpClient,private fb: FormBuilder, private router: Router,private route: ActivatedRoute) {

    if(this.googformval ){
      this.registerform?.patchValue({contactname:this.dispname, emailid:this.googemail, googform: true});
      this.registerform?.get('emailid')?.disable();
      this.registerform?.get('contactname')?.disable();
      //check whether the email already exists or not
      //this.checkEmailExists();
     }//end of if
   }//const

  ngOnInit(): void {
  }

  


   saveUserData(){
    const APIendpoint=environment.APIEndpoint;
    const posturl =APIendpoint + '/api/user/coregister';
    let formObj = this.registerform.getRawValue(); 
    let serializedForm = JSON.stringify(formObj);
    console.log("Serialize form is "+serializedForm);
   }//end of saveuserdata


   openSnackBar(msgprompt:string) {
     
    this._snackBar.open(msgprompt, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }//end of opensnackbar

  matcher = new MyErrorStateMatcher();
   }//end of class

 