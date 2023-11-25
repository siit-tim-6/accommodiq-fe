import { Component } from '@angular/core';
import { faCoffee} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email: string | undefined;
  password: string | undefined;
  faCoffee = faCoffee;

  onSubmit() {
    console.log(this.email + " " + this.password)
  }
}
