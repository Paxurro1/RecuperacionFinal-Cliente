import { Component, OnInit } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public imgLogo: string;

  constructor(
    private storageUser: LoginStorageUserService,
    private toastr: ToastrService,
  ) {
    this.imgLogo = "./assets/logo.png";
  }

  ngOnInit(): void {

  }

  salir() {
    this.toastr.warning('Has cerrado sesión.', 'AVISO')
    this.storageUser.removeUser()
    window.location.href = ""
  }

}
