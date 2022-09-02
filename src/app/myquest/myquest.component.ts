import { Component, OnInit } from '@angular/core';
import {usercl} from '../models/userclass';
import {AuthService} from '../auth/auth.service';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
import { questiondata } from '../models/questiondata';
import {MatDialog} from '@angular/material/dialog';
import { PromptdialogComponent } from '../services/promptdialog/promptdialog.component';
import {MatSnackBar ,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';

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
  
  displayedColumns: string[] = [ 'sno', 'quest_desc', 'marks','time','tags','del'];
  questdata !:questiondata[];
  datasource:MatTableDataSource<questiondata>;
  
  messagetxt="";
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(public a:AuthService, private fetchdropdown: FtchdrpdwnService ,public dialog: MatDialog ,private _snackBar: MatSnackBar ) {    
    //fetch karma points
    this.fetchdropdown.ftchKarma().subscribe((subsc)=>{
      subsc.subscribe((data)=>{
        //console.log("Data is "+JSON.stringify(data));
        this.karmapts = data[0].karmacnt;
      })
    });
    var arbtdata:questiondata={sno:1,questid:"1", quest_desc:' ', 'marks':1, subjid:1,qtype:1,classid:1,langid:1};
    this.datasource=new MatTableDataSource([ arbtdata]);
   }

  ngOnInit(): void {
    
    this.userhere=this.a.getLocalStorageUser();
    if(this.userhere){
      this.ifUserLogin=false;
    }else{
      this.ifUserLogin=true;
    }
    
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
 

  applyFilter(filterValue:string) {
    //   let filterValue = filterVal.value;
    //console.log("val is "+filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }

  fetchMyQstn(){

    this.fetchdropdown.ftchMyQstn(this.npgFetchcnt).subscribe((res)=>{
      res.subscribe((data)=>{
        //data contains our data to populate able
        //console.log("Data are "+JSON.stringify(data));
        this.totalques=data.length;
        this.questdata=data;
        
         //this.questdata=data<questiondata[]>;
        this.datasource=new MatTableDataSource(this.questdata);
        this.showresult=true;
      })
    })
  } //fetchmyqstn

  delQstnRow(questid:string){
     const dialogRef = this.dialog.open(PromptdialogComponent);
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.fetchdropdown.delMyQstn(questid).subscribe((data)=>{
          data.subscribe((res)=>{
            //show prompt to user that data was deleted
            if(res.success) {
              this.openSnackBar("Question deleted successfully");
              //reload data again
              this.fetchMyQstn();
            }
          })
        })
       }//end of ifresult
      }); //end of subscribe
  }//end of delete questions

  edQstnRow(questid:string){
    //show prompt to edit questions

  }

  
  openSnackBar(msgprompt:string) {
    
    this._snackBar.open(msgprompt, '', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }//end of opensnackbar

  dopdfdown(){
    //do download
       const doc = new jsPDF();
       autoTable(doc,{ html: '#questlist' })
       doc.save('table.pdf');
   }
}
