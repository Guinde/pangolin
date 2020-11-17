import { Component, OnInit, Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-pangolin',
  templateUrl: './form-pangolin.component.html',
  styleUrls: ['./form-pangolin.component.scss']
})
export class FormPangolinComponent implements OnInit {

  //@ViewChild('input') input: ElementRef

  @Input() sizeForm: string;
  @Input() editForm: boolean;
  @Input() formData: FormGroup;
  @Input() nourritureItems: string[];
  @Output() submit = new EventEmitter<Object>();
  @Output() close = new EventEmitter<void>();

  public form: FormGroup;
  public arrayItems: string[] = []
  public input: string;
  public nourriture: FormArray = new FormArray([]);

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.formData){
      this.form = this.formData
      if(this.nourritureItems.length){
        for(const item of this.nourritureItems) {
          this.nourriture.push(new FormControl(item));
        }
        } else {
          this.nourriture.push(new FormControl(''))
        }
    } else {
        this.form = this._fb.group({
        login: ['', Validators.required],
        age: ['', Validators.required],
        famille: ['',Validators.required],
        race: ['', Validators.required],
        password: ['',Validators.required]
      })
    }
  }

  public addNourriture() {
    this.nourriture.push(new FormControl(''));
  }

  public removeNourriture(index: number):void {
    this.nourriture.removeAt(index)
  }

  public onSubmit(e:MouseEvent):void {
    e.preventDefault();
    if(this.form.valid){
      let nourriture = [...this.nourriture.value]
      nourriture = nourriture.filter(Boolean)
      this.submit.emit({nourriture, ...this.form.value})
    }
  }

  public onCloseForm(): void {
    this.close.emit()
  }

}
