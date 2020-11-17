import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { IPangolin } from './../models/pangolin.models';
import { PangolinService } from './../services/pangolin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  @Output() closeEditForm: EventEmitter<void> = new EventEmitter();
  
  public form: FormGroup;
  public currentPangolin: IPangolin; 
  public nourriture: FormArray = new FormArray([]);


  private _sub: Subscription;

  constructor(private _fb: FormBuilder, private _pangolinService: PangolinService) { }

  ngOnInit(): void {
    this._pangolinService.currentPangolin.subscribe(
      (data) => {
        this.currentPangolin = data;
        this._initaDataForm();
      }
    )
  }

  private _initaDataForm():void {
    this.form = this._fb.group({
      age: [this.currentPangolin.age, Validators.required],
      famille: [this.currentPangolin.famille, Validators.required],
      race: [this.currentPangolin.race, Validators.required],
    })

  }

  public onSubmit(formData): void {
    this._sub = this._pangolinService.editCurrentPangolin(formData).subscribe(() => {
      this.closeEditForm.emit()
    })
  }

  public closeForm():void {
    this.closeEditForm.emit()
  }

  ngOnDestroy():void {
    if(this._sub) {
      this._sub.unsubscribe();
    }
  }

}
