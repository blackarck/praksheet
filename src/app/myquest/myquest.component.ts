import { Component, OnInit } from '@angular/core';
import {usercl} from '../models/userclass';
import {AuthService} from '../auth/auth.service';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
import { questiondata } from '../models/questiondata';

@Component({
  selector: 'app-myquest',
  templateUrl: './myquest.component.html',
  styleUrls: ['./myquest.component.scss']
})
export class MyquestComponent implements OnInit {

  ifUserLogin:boolean=false;
  userhere:usercl=new usercl();
  karmapts:number=0;
  npgFetchcnt:number=0;
  totalques:number=0;
  showresult:boolean=false;
  
  displayedColumns: string[] = [ 'sno', 'quest_desc', 'marks','time','tags','upddttm'];
  questdata !:questiondata;
  datasource:any;

  constructor(public a:AuthService, private fetchdropdown: FtchdrpdwnService) {

    
    //fetch karma points
    this.fetchdropdown.ftchKarma().subscribe((subsc)=>{
      subsc.subscribe((data)=>{
        //console.log("Data is "+JSON.stringify(data));
        this.karmapts = data[0].karmacnt;
      })
    });
    
   
   }

  ngOnInit(): void {
    
    this.a.afAuth.onAuthStateChanged((user)=>{
      if(user){
        //user is there enable the button
        this.userhere=this.a.getLocalStorageUser();
         //console.log("Current user is "+JSON.stringify(this.userhere));
        this.ifUserLogin=false;
      }else{
        this.ifUserLogin=true;
      }
    });

  }//end of ngoninit
 
  fetchMyQstn(){
    this.fetchdropdown.ftchMyQstn(this.npgFetchcnt).subscribe((res)=>{
      res.subscribe((data)=>{
        //data contains our data to populate able
        console.log("Data are "+JSON.stringify(data));
        this.totalques=data.length;

        this.questdata=data;
        this.datasource=this.questdata;
        this.showresult=true;
      })
    })
  } //fetchmyqstn

}
