import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registoptdlg',
  templateUrl: './registoptdlg.component.html',
  styleUrls: ['./registoptdlg.component.scss']
})
export class RegistoptdlgComponent implements OnInit {

  constructor(public a:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  googregister(){
    this.a.doGoogleLogin().then((res:any)=>{
      //console.log("result is "+ JSON.stringify(res));
      var googuser:User = res.user as User;
      this.router.navigate(['./register',{displayname:googuser.displayName, emailid:googuser.email, googformval:true}], { relativeTo: this.route.parent});
    })
  }//end of googregister

  
}

interface User {   
  uid: string;
  email: string; 
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
