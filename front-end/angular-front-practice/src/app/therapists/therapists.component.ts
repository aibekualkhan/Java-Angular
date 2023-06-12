import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../_services/user.service";
import {User} from "../model/user.model";


@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.css']
})
export class TherapistsComponent implements OnInit{
  dataSource?: User[];

  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.userService.getPsy().subscribe((response: User[])=>{
      this.dataSource=response;
    });
  }

}
