import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  User: User;
  title: string;

  constructor(
    public auth: AuthService,
  ) {
    this.User = {};
    this.title = 'Anmelden';
  }

  ngOnInit() {
  }

  login(event) {
    console.log('user', this.User);
    return this.auth.login(this.User).subscribe((data: any ) => {
      console.log(data);
    } );
    console.log(event);
    event.preventDefault();

  }

}
