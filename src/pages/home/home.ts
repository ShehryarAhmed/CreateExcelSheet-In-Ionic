import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { File } from '@ionic-native/file';
import * as XLSX from 'xlsx';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DataProvider } from './../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  files: Observable<any[]>;
  
  data: any;
  constructor(private db: AngularFireDatabase , private afStorage: AngularFireStorage, private file: File,public navCtrl: NavController, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController, private iab: InAppBrowser) {
    
    this.files = this.dataProvider.getFiles();

    this.data = [{
      Tower: "A",
      Flat: "101",
      Month: "November",
      Year: "2017"
  }, {
      Tower: "A",
      Flat: "201",
      Month: "November",
      Year: "2017"
  }, {
      Tower: "B",
      Flat: "301",
      Month: "November",
      Year: "2017"
  }, {
      Tower: "C",
      Flat: "101",
      Month: "November",
      Year: "2017"
  }, {
      Tower: "D",
      Flat: "401",
      Month: "November",
      Year: "2017"
  }];


    let sheet = XLSX.utils.json_to_sheet(this.data);
    let book = {
      SheetNames: ["export"],
      Sheets: {
          "export": sheet
      }
  };
  }
    getStoragePath()
    {
        let file = this.file;
        return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then(function (directoryEntry) {
            return file.getDirectory(directoryEntry, "Ionic2ExportToXLSX", {
                create: true,
                exclusive: false
            }).then(function () {
                return directoryEntry.nativeURL + "Ionic2ExportToXLSX/";
            });
        });
    }
  
    OnExport = function ()
    {
        let sheet = XLSX.utils.json_to_sheet(this.data);
        let wb = {
            SheetNames: ["l"],
            Sheets: {
                "export": sheet
            }
        };

        let wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });

        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        let blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});
        let self = this;
        this.getStoragePath().then(function (url) {
            self.file.writeFile(url, "export.xlsx", blob, true).then(() => {
                alert("file created at: " + url);
            }).catch(() => {
                alert("error creating file at :" + url);
            });
        });
    }


    addFile() {
      let inputAlert = this.alertCtrl.create({
        title: 'Store new information',
        inputs: [
          {
            name: 'info',
            placeholder: 'Lorem ipsum dolor...'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Store',
            handler: data => {
              this.uploadInformation(data.info);
            }
          }
        ]
      });
      inputAlert.present();
    }
   
    uploadInformation(text) {
      let upload = this.dataProvider.uploadToStorage(text);
   
      // Perhaps this syntax might change, it's no error here!
      upload.then().then(res => {
        this.dataProvider.storeInfoToDatabase(res.metadata).then(() => {
          let toast = this.toastCtrl.create({
            message: 'New File added!',
            duration: 3000
          });
          toast.present();
        });
      });
    }
   
    deleteFile(file) {
      this.dataProvider.deleteFile(file).subscribe(() => {
        let toast = this.toastCtrl.create({
          message: 'File removed!',
          duration: 3000
        });
        toast.present();
      });
    }
   
    viewFile(url) {
      this.iab.create(url);
    }
  }


