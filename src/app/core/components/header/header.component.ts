import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario;
  public imgLogo: string;

  constructor(
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.imgLogo = "./assets/logo.png";
  }

  ngOnInit(): void {

  }

}
