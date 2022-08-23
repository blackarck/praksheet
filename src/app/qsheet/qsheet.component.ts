import { Component, OnInit } from '@angular/core';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { ThisReceiver } from '@angular/compiler';
import { subject } from '../models/subject';
import { grades } from '../models/grades';
import {language} from '../models/language';
import { questiondata } from '../models/questiondata';

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
  marksctrl: new FormControl('1'),
  gradectrl: new FormControl(''),
  langctrl: new FormControl('English'),
  questcountctrl: new FormControl('10'),
   });

   gradeval!: grades;
   subjVal: subject ={subjid: 1, subject: "Maths"};
   langVal: language = {langid: 1, language: "English"};
 
   maxmarks:number=0;
   totalques:number=0;
   showresult:boolean=false;

   //table vars
   displayedColumns: string[] = ['questid', 'quest_desc'];
   questdata !:questiondata;
   datasource:any;
   //table vars end
  constructor(private fetchdropdown: FtchdrpdwnService,private fb: FormBuilder, ) {

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
   }//end of constructor

   ngOnInit(): void {
     
   }
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
    console.log("GradeOpt "+ JSON.stringify(option.value));
    this.gradeval=option.value;
  }
  onSubjSelected(option: MatOption){
    console.log("GradeOpt "+ JSON.stringify(option.value));
    this.subjVal=option.value;
  }
  onLangSelected(option: MatOption){
    console.log("GradeOpt "+ JSON.stringify(option.value));
    this.langVal=option.value;
  }

  //fetch questions from db
   genreport(){
    this.totalques=0;
    this.maxmarks=0;
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
      this.datasource=this.questdata;
      this.showresult=true;
      // console.log("Total max marks are "+this.maxmarks);
    })
  }
}








