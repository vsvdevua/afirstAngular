import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {IntroService} from '../../service/intro.service';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  categoryName: string;
  @Input()
  showStat: boolean;
  @Output()
  toggleStat = new EventEmitter<boolean>();
  @Output()
  toggleMenu = new EventEmitter();
  private isMobile: boolean;

  constructor(private dialog: MatDialog,
              private introService: IntroService,
              private deviceDetector: DeviceDetectorService) {
    this.isMobile = deviceDetector.isMobile();
  }

  ngOnInit(): void {
  }

  private onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  // tslint:disable-next-line:typedef
  private showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    });
  }

  private showIntroHelp(): void {
    this.introService.startIntroJS(false);
  }

  private onToggleMenu(): void {
    this.toggleMenu.emit();
  }
}
