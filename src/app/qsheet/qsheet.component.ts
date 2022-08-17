import { Component, OnInit } from '@angular/core';
import { FtchdrpdwnService } from '../services/ftchdrpdwn.service';
@Component({
  selector: 'app-qsheet',
  templateUrl: './qsheet.component.html',
  styleUrls: ['./qsheet.component.scss']
})
export class QsheetComponent implements OnInit {

  constructor(private fetchdropdown: FtchdrpdwnService) {
    fetchdropdown.fetchClasses();
    fetchdropdown.fetchSubject();
    fetchdropdown.fetchLanguage();
   }

  ngOnInit(): void {
  }

}
