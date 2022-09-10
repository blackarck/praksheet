import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincmpComponent } from './logincmp/logincmp.component';
 import { QsheetComponent } from './qsheet/qsheet.component';
import { MyquestComponent } from './myquest/myquest.component';
import { AddquestComponent } from './addquest/addquest.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'loginscr', component: LogincmpComponent ,
   children: [
    {path: '', component: QsheetComponent},
    { path: 'qsheet', component: QsheetComponent },
    {path: 'addquest',component:AddquestComponent},
    {path: 'myquest', component:MyquestComponent},
    {path: 'about', component: AboutComponent},
   ]},
   { path: '', redirectTo: '/loginscr', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
