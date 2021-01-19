import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AboutComponent} from '../../dialog/about/about.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private year: Date;
  private site = 'https://vsvdev.co.ua';
  private blog = 'https://vsvdev.co.ua/about';
  private siteName: 'VSVDev';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date();
  }

  private openAboutDialog(): void {
    this.dialog.open(AboutComponent, {
      autoFocus: false,
      data: {
        dialogTitle: 'About App',
        message: 'This app was created for planning task'
      },
      width: '400px'
    });
  }
}
