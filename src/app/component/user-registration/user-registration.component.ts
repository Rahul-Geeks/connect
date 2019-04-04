import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUser: any = {
    "name": "",
    "userName": "",
    "phoneNo": "",
    "password": ""
  };
  checkPass: String;
  constructor(private userSrv: UserService, private router: Router) { }

  ngOnInit() {
  }

  isPassCorrect() {
    return this.newUser.password == this.checkPass;
  }

  userSignup() {
    if (this.isPassCorrect())
      this.userSrv.userSignup(this.newUser)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(["connect_and_share/login"]);
          },
          err => {
            console.log(err);
          }
        );
  }
}
