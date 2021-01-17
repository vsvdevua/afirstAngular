import {Component, OnInit} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  private priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>,
              private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  private onClose(): void {
    this.dialogRef.close(false);
  }

  private onAddPriority(priority: Priority): void {
    this.dataHandler.addPriority(priority).subscribe();
  }

  private onDeletePriority(priority: Priority): void {
    this.dataHandler.deletePriority(priority.id).subscribe();
  }

  private onUpdatePriority(priority: Priority): void {
    this.dataHandler.updatePriority(priority).subscribe();
  }
}
