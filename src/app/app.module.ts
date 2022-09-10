import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogincmpComponent } from './logincmp/logincmp.component';
import { initializeApp,provideFirebaseApp,getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { initializeAuth,provideAuth,getAuth , browserPopupRedirectResolver,
  indexedDBLocalPersistence,
  connectAuthEmulator,} from '@angular/fire/auth';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngmatModule } from './material/angmat.module';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegistoptdlgComponent } from './logincmp/registoptdlg/registoptdlg.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { QsheetComponent } from './qsheet/qsheet.component';
import { MyquestComponent } from './myquest/myquest.component';
import { AddquestComponent } from './addquest/addquest.component';
import { PromptdialogComponent } from './services/promptdialog/promptdialog.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LogincmpComponent,
    RegistoptdlgComponent,
    QsheetComponent,
    MyquestComponent,
    AddquestComponent,
    PromptdialogComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideMessaging(() => getMessaging()),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngmatModule, 
    HttpClientModule,
    AngularFireModule,
    AngularFireAuthModule
   ],
  exports: [
    AngmatModule
  ],
  providers: [
    HttpErrorHandler,
    PromptdialogComponent,
    MessageService,
    { provide: AUTH_SETTINGS, useValue: {appVerificationDisabledForTesting: true} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
