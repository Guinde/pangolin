import { Component, OnInit, Input } from '@angular/core';
import { IPangolin } from './../models/pangolin.models';
import { PangolinService } from './../services/pangolin.service';

@Component({
  selector: 'app-list-pangolins',
  templateUrl: './list-pangolins.component.html',
  styleUrls: ['./list-pangolins.component.scss']
})
export class ListPangolinsComponent implements OnInit {

  @Input() pangolins: IPangolin[];

  constructor(private _pangolinService: PangolinService) { }

  ngOnInit(): void {
    this._pangolinService.removeFriend.subscribe(
      (pangolin) => {
        if(pangolin) {
          this.pangolins.push(pangolin)
        }
      }
    )
  }

  public addFriend(index: number):void{
    const pangolin = this.pangolins[index];
    this._pangolinService.addPangolinFriend(pangolin).subscribe(
      () => {
        this._pangolinService.addFriend.next(pangolin)
        this.pangolins.splice(index, 1)
      }
    )
  }

}
