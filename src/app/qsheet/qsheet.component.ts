import { Component, OnInit } from '@angular/core';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
import { subject } from '../models/subject';
import { grades } from '../models/grades';
import {language} from '../models/language';
import { questiondata } from '../models/questiondata';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';
import {usercl} from '../models/userclass';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-qsheet',
  templateUrl: './qsheet.component.html',
  styleUrls: ['./qsheet.component.scss']
})
export class QsheetComponent implements OnInit {

  subjects!:subject[];
  allsubjects!:subject[];
  filteredsubjects !: Observable<any[]>;

  languages!:language[];
  alllanguages!:language[];
  filteredlanguages !: Observable<any[]>;

  filteredgrades !: Observable<any[]>;
  allgrades!: grades[];

  selectable = true;
  removable=true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  markoptions: string[] = [' ','1', '2', '3','5','10','15','20'];

  editform =  this.fb.group({
  subjectctrl: new FormControl({value:'Maths', disabled:false}),
  marksctrl: new FormControl(''),
  gradectrl: new FormControl(''),
  langctrl: new FormControl('English'),
  questcountctrl: new FormControl('10'),
  qtagctrl: new FormControl(''),
   });

   myqstnchck:boolean=false;
   gradeval!: grades;
   subjVal: subject ={subjid: 1, subject: "Maths"};
   langVal: language = {langid: 1, language: "English"};
 
   maxmarks:number=0;
   totalques:number=0;
   showresult:boolean=false;

   //table vars
   displayedColumns: string[] = [ 'sno', 'quest_desc','marks','time','del'];
   questdata !:questiondata[];
   datasource:MatTableDataSource<questiondata>;
  
   //table vars end

   openPanel:boolean=true;
   ifUserLogin:boolean=false;
   userhere:usercl=new usercl();


  constructor(private fetchdropdown: FtchdrpdwnService,private fb: FormBuilder, public a:AuthService) {

    fetchdropdown.fetchClasses().subscribe((res)=>{
      
      this.allgrades=res;
       
     this.filteredgrades = this.editform.controls.gradectrl.valueChanges.pipe(
       startWith(''),
       map(value => this._filterGrade(value || this.allgrades.slice())),
     );
   }); //returning aray

    fetchdropdown.fetchSubject().subscribe((res)=>{
       //for(var key in res) {this.allsubjects.push(res[key].subject) }
       this.allsubjects=res;
        
      this.filteredsubjects = this.editform.controls.subjectctrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSubject(value || this.allsubjects.slice())),
      );
    });   //end of fetch for subject

    fetchdropdown.fetchLanguage().subscribe((res)=>{
         //console.log("All langs are "+ JSON.stringify(res));
        this.alllanguages=res;
        
      this.filteredlanguages = this.editform.controls.langctrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterLanguage(value || this.alllanguages.slice())),
      );
    });//end of fetch for lang

    var arbtdata:questiondata={sno:1,questid:"1", quest_desc:' ', 'marks':1, subjid:1,qtype:1,classid:1,langid:1};
    this.datasource=new MatTableDataSource([ arbtdata]);
    
   }//end of constructor

   ngOnInit(): void {
     
     
    this.userhere=this.a.getLocalStorageUser();
    if(this.userhere){
      this.ifUserLogin=true;
    }else{
      this.ifUserLogin=false;
    }

    this.a.afAuth.onAuthStateChanged((user)=>{
      if(user){
        //user is there enable the button
        this.userhere=this.a.getLocalStorageUser();
         //console.log("Current user is "+JSON.stringify(this.userhere));
        this.ifUserLogin=true;
      }else{
        this.ifUserLogin=false;
      }
    });

   }//end of ngoninit

  displaySubj(subject1: subject): string {
    return subject1 && subject1.subject ? subject1.subject : 'Maths';
  }

  displayGrade(grade1: grades): string {
    return grade1 && grade1.classlong ? grade1.classlong : '';
  }

  displayLang(lang1: language): string {
    return lang1 && lang1.language ? lang1.language : 'English';
  }
 

  private _filterSubject(value: any): any[] { 
    return this.allsubjects.filter(subject => subject.subject.toLowerCase().includes(value.toString().toLowerCase()));;
  }//end of _filter


  private _filterGrade(value: any): any[] { 
    return this.allgrades.filter(grades => grades.classlong.toLowerCase().includes(value.toString().toLowerCase()));;
  }//end of _filter

  private _filterLanguage(value: any): any[] { 
    return this.alllanguages.filter(language => language.language.toLowerCase().includes(value.toString().toLowerCase()));;
  }//end of _filter

  onGradeSelected(option: MatOption){
    //console.log("GradeOpt "+ JSON.stringify(option.value));
    this.gradeval=option.value;
  }
  onSubjSelected(option: MatOption){
    //console.log("GradeOpt "+ JSON.stringify(option.value));
    this.subjVal=option.value;
  }
  onLangSelected(option: MatOption){
   //console.log("GradeOpt "+ JSON.stringify(option.value));
    this.langVal=option.value;
  }

  delQstnRow(qstid:string){
    //remove element from the array list
    
    var indexfound= this.questdata.map(function (element) {return element.questid}).indexOf(qstid);
    this.questdata.splice(indexfound,1);
    this.reorderSNo(this.questdata);
    this.datasource = new MatTableDataSource(this.questdata);  
    
  }


  //reorder serial number
  reorderSNo(questarr:questiondata[]){
    for (let i in questarr){
     questarr[i].sno = parseInt(i)+1;
    }
  }
  //fetch questions from db
   genreport(){
    this.totalques=0;
    this.maxmarks=0;
    this.openPanel=false;
    
    if(this.editform.getRawValue().gradectrl){
      //do nothing
    }else{
      this.gradeval=new grades;
    }
   
    let formtosend = {
      gradeval: this.gradeval,
      subjval: this.subjVal,
      langval: this.langVal,
      marks: this.editform.getRawValue().marksctrl,
      questcount: this.editform.getRawValue().questcountctrl,
      qtags: this.editform.getRawValue().qtagctrl,
       
    }
     //let formObj = this.editform.getRawValue(); 
      //console.log("Vals are "+JSON.stringify(formtosend));
      this.fetchdropdown.fetchReport(formtosend).subscribe((res)=>{
      //console.log("output is "+ JSON.stringify(res));
      this.totalques=res.length;
       //console.log("Total questions are "+this.totalques);
      for(var k in res){
         this.maxmarks= this.maxmarks+res[k].marks;
      }
      this.questdata=res;

      this.datasource= new MatTableDataSource(this.questdata);  
      this.showresult=true;
      // console.log("Total max marks are "+this.maxmarks);
    })
  }

  dopdfdown(){
   //do download
      const doc = new jsPDF();
      autoTable(doc,{ html: '#questlist' })
      doc.save('table.pdf');
  }

  likebtn(questid:string){
    //console.log (send one more log to backend);
    this.fetchdropdown.doQstnlike(questid).subscribe((res)=>{
      res.subscribe((data)=>{
        //nothing is required;
      })
    })
  }

}








