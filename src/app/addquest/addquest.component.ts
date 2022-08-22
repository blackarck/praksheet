import { Component, OnInit } from '@angular/core';
import { subject } from '../models/subject';
import { grades } from '../models/grades';
import {language} from '../models/language';
import { questiondata } from '../models/questiondata';
import { Observable } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';


@Component({
  selector: 'app-addquest',
  templateUrl: './addquest.component.html',
  styleUrls: ['./addquest.component.scss']
})
export class AddquestComponent implements OnInit {

  subjects!:subject[];
  allsubjects!:subject[];
  filteredsubjects !: Observable<any[]>;

  gradeval!: grades;
   subjVal: subject ={subjid: 1, subject: "Maths"};
   langVal: language = {langid: 1, language: "English"};

  constructor() { }

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

}
