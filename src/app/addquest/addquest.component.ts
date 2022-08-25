import { Component, OnInit } from '@angular/core';
import { subject } from '../models/subject';
import { grades } from '../models/grades';
import {language} from '../models/language';
import { questiondata } from '../models/questiondata';
import { Observable } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
import {FormBuilder, FormControl,Validators,ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar ,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {usercl} from '../models/userclass';
import {AuthService} from '../auth/auth.service';
 

@Component({
  selector: 'app-addquest',
  templateUrl: './addquest.component.html',
  styleUrls: ['./addquest.component.scss']
})
export class AddquestComponent implements OnInit {

  subjects!:subject[];
  allsubjects!:subject[];
  filteredsubjects !: Observable<any[]>;

  
  languages!:language[];
  alllanguages!:language[];
  filteredlanguages !: Observable<any[]>;

  
   gradeval!: grades;
   subjVal: subject ={subjid: 1, subject: "Maths"};
   langVal: language = {langid: 1, language: "English"};

   
  filteredgrades !: Observable<any[]>;
  allgrades!: grades[];

   markoptions: string[] = [' ','1', '2', '3','5','10','15','20'];

   ifUserLogin:boolean=false;

   editform =  this.fb.group({
    subjectctrl: new FormControl('',[Validators.required,this.listofobj()]),
    marksctrl: new FormControl('1'),
    gradectrl: new FormControl(''),
    langctrl: new FormControl('English'),
    questtxtctrl: new FormControl('',[Validators.required]),
    questtmctrl: new FormControl(''),
    questtagctrl:new FormControl(''),
     });

     messagetxt="";
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    mainuser:usercl=new usercl();
  constructor(private fetchdropdown: FtchdrpdwnService,private fb: FormBuilder, 
    private _snackBar: MatSnackBar ,public a:AuthService) {
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
    //check whether a user is logged in or not
    this.mainuser=this.a.getLocalStorageUser();
    if(this.mainuser.userid){
      // console.log("Main user is not null "+ this.mainuser.displayname);
      this.ifUserLogin=false;
      //
     }else{
      this.ifUserLogin=true;
      this.openSnackBar("You must be logged in to submit questions");
     }
    //if not show a message that to post question you should be logged in
    //enable submit button only if logged in 
    this.a.afAuth.onAuthStateChanged((user)=>{
      //console.log("Current user is "+JSON.stringify(user));
      if(user){
        //user is there enable the button
        this.ifUserLogin=false;
      }else{
        this.ifUserLogin=true;
      }
    })
  }

  
  
  displaySubj(subject1: subject): string {
    return subject1 && subject1.subject ? subject1.subject : '';
  }

  displayGrade(grade1: grades): string {
    return grade1 && grade1.classlong ? grade1.classlong : '';
  }

  displayLang(lang1: language): string {
    return lang1 && lang1.language ? lang1.language : 'English';
  }

  
  onGradeSelected(option: MatOption){
     //console.log("GradeOpt "+ JSON.stringify(option.value));
    this.gradeval=option.value;
  }
  onSubjSelected(option: MatOption){
    //console.log("subjval "+ JSON.stringify(option.value));
    this.subjVal=option.value;
  }
  onLangSelected(option: MatOption){
    //console.log("langval "+ JSON.stringify(option.value));
    this.langVal=option.value;
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


  addQstn(){
    let formtosend = {
      gradeval: this.gradeval,
      subjval: this.subjVal,
      langval: this.langVal,
      marks: this.editform.getRawValue().marksctrl,
      qtime : this.editform.getRawValue().questtmctrl,
      qtext: this.editform.getRawValue().questtxtctrl,
      qtags: this.editform.getRawValue().questtagctrl,
     }
     this.fetchdropdown.postQstn(formtosend).subscribe((res)=>{
      //console.log("res is "+JSON.stringify(res));
      res.subscribe((dataa)=>{
        console.log("Data is "+JSON.stringify(dataa));
        if(dataa.success){
          this.openSnackBar("Question saved successfully");
        }else{
          if(dataa.profane){
            this.openSnackBar("Can't save contains profanity/bad words");
          }
        }
         this.editform.controls.questtxtctrl.setValue(null);
      })
     });
  }//end of addqstn

  openSnackBar(msgprompt:string) {
    
    this._snackBar.open(msgprompt, '', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }//end of opensnackbar

  listofobj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.allsubjects?.filter(subj=> subj.subject.includes(control.value.subject?.toString())).length){
        return null;
      }else{
        return {loverror:"Value not present"}
      }
    }
  }//end of listofobj
}
