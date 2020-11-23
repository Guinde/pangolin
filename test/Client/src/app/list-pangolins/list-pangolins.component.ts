import { Component, OnInit, Input } from '@angular/core';
import { IPangolin } from './../models/pangolin.models';
import { PangolinService } from './../services/pangolin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-pangolins',
  templateUrl: './list-pangolins.component.html',
  styleUrls: ['./list-pangolins.component.scss'],
})
export class ListPangolinsComponent implements OnInit {
  public openForm: boolean = false;

  @Input() pangolins: IPangolin[];

  constructor(
    private _pangolinService: PangolinService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._pangolinService.removeFriend.subscribe((pangolin) => {
      if (pangolin) {
        this.pangolins.push(pangolin);
      }
    });
  }

  public addFriend(index: number): void {
    const pangolin = this.pangolins[index];
    this._pangolinService.addPangolinFriend(pangolin).subscribe(() => {
      this._pangolinService.addFriend.next(pangolin);
      this.pangolins.splice(index, 1);
    });
  }

  public addNewFriend() {
    this.openForm = !this.openForm;
  }

  public submit(formData): void {
    this._authService.signup(formData).subscribe((res: any) => {
      const pangolin = res.data;
      this._pangolinService.addPangolinFriend(pangolin).subscribe(() => {
        this._pangolinService.addFriend.next(pangolin);
        this.openForm = !this.openForm;
      });
    });
  }
}
