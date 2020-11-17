import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IPangolin } from './../models/pangolin.models';
import { PangolinService } from './../services/pangolin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output() openEditForm: EventEmitter<void> = new EventEmitter();

  private _onEditForm: boolean

  public currentPangolin: IPangolin;

  get onEditForm(): boolean {
    return this._onEditForm;
  }

  constructor(private _pangolinService: PangolinService) { }

  ngOnInit(): void {
    this._pangolinService.currentPangolin.subscribe(
      (data) => this.currentPangolin = data
    )

}
  public editProfile():void {
    this.openEditForm.emit();
  }

}
