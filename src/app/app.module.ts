import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { File } from '@ionic-native/file';
import { Firebase } from '@ionic-native/firebase';
import { DataProvider } from '../providers/data/data';
 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
 
import { InAppBrowser } from '@ionic-native/in-app-browser';

var firebaseConfig = {
  apiKey: "AIzaSyBkzt8RBRf8m7JbvMp1FHKsw2hCfdVKdWo",
  authDomain: "",
  databaseURL: "https://sheetgenionic.firebaseio.com/",
  projectId: "1:287326432530:android:764d2cb7da3280eb",
  storageBucket: "gs://sheetgenionic.appspot.com",
  messagingSenderId: "287326432530"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Firebase,
    DataProvider,
    InAppBrowser
  ]
})
export class AppModule {}
