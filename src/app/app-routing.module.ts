import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincmpComponent } from './logincmp/logincmp.component';
import { UserdtlcmpComponent } from './userdtlcmp/userdtlcmp.component';
import { QsheetComponent } from './qsheet/qsheet.component';
import { MyquestComponent } from './myquest/myquest.component';
import { AddquestComponent } from './addquest/addquest.component';

const routes: Routes = [
  { path: 'loginscr', component: LogincmpComponent ,
   children: [
    {path: '', component: QsheetComponent},
    { path: 'qsheet', component: QsheetComponent },
    {path: 'addquest',component:AddquestComponent},
    {path: 'myquest', component:MyquestComponent},
   ]},
   { path: 'userdtl', component: UserdtlcmpComponent },
  { path: '', redirectTo: '/loginscr', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
