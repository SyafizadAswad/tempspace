import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { UserNavbar } from '../user-navbar/user-navbar';

@Component({
  selector: 'app-machine-register-page',
  imports: [RouterLink, UserNavbar],
  templateUrl: './machine-register-page.html',
  styleUrl: './machine-register-page.css',
})
export class MachineRegisterPageComponent {

}
