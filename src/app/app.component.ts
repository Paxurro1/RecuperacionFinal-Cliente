import { Component } from '@angular/core';
import { LoginStorageUserService } from './services/login.storageUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecuperacionFinal-Cliente';
  usuario;
  constructor(
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    console.log(this.usuario)
  }
}
