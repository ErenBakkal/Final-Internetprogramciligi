import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/Myalert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Ilan } from 'src/app/models/Ilan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ilanlar: Ilan[];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public alert: AlertService,
    public matDialog: MatDialog,
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.SonEklenenler();

  }
  SonEklenenler(){
    this.apiServis.IlanListeSonEklenenler(5).subscribe((d:Ilan[])=>{
      this.ilanlar=d;
    });
  }

  AlertGoster(p: number) {

    var s = new Sonuc();
    if (p == 1) {
      s.islem = true;
    }
    else {
      s.islem = false;
    }
    s.mesaj = "Alert Test";

    this.alert.AlertUygula(s);
  }

  ConfirmUygulama() {

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      console.log(d);
      if (d) {
        // kayıt silme rutine
        console.log("Kayıt Silindi");
      }
    });

  }

}
