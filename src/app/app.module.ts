import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuggmaincmpComponent } from './suggmaincmp/suggmaincmp.component';
import { LogincmpComponent } from './logincmp/logincmp.component';
import { RegisterComponent } from './register/register.component';
import { RegpasscmpComponent } from './regpasscmp/regpasscmp.component';
import { UserdtlcmpComponent } from './userdtlcmp/userdtlcmp.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SuggmaincmpComponent,
    LogincmpComponent,
    RegisterComponent,
    RegpasscmpComponent,
    UserdtlcmpComponent,
    RegistoptdlgComponent,
    QsheetComponent
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
    MessageService,
    { provide: AUTH_SETTINGS, useValue: {appVerificationDisabledForTesting: true} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
