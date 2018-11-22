import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import * as XLSX from 'xlsx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  data: any;
  constructor(private file: File, public navCtrl: NavController) {
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
            SheetNames: ["export"],
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
}
