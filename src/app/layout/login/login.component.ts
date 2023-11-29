import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  onSubmit() {
    console.log(this.email + ' ' + this.password);
  }
}
