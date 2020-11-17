import { IPangolin } from './../models/pangolin.models';
import { Component, Input, OnInit } from '@angular/core';
import { PangolinService } from './../services/pangolin.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  @Input() friends: IPangolin[]

  constructor(private _pangolinService: PangolinService) { }

  ngOnInit(): void {
    this._pangolinService.addFriend.subscribe(
      (newFriend) => {
        if(newFriend) {
          this.friends.push(newFriend)
        }
      }
    )
  }

  public removeFriend(index: number):void{
    const pangolin = this.friends[index]
    this._pangolinService.removePangolinFriend(pangolin).subscribe(
      () => {
        this._pangolinService.removeFriend.next(this.friends[index])
        this.friends.splice(index, 1)
      }
    )
  }

}
