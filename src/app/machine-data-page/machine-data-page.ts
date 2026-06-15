import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { UserNavbar } from '../user-navbar/user-navbar';
import { DataGaugeBarComponent } from '../data-gauge-bar/data-gauge-bar';

import { DataBaseService } from '../services/database_service/data-base';
import { UserService } from '../services/user_services/user-service';

import { IMachine } from '../services/models/MachineModel';

@Component({
  selector: 'app-machine-data-page',
  imports: [RouterLink, UserNavbar, DataGaugeBarComponent, CommonModule ],
  templateUrl: './machine-data-page.html',
  styleUrl: './machine-data-page.css',
})
export class MachineDataPageComponent implements OnInit {
  private readonly machineApi = inject(DataBaseService);
  private readonly userApi = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public machineId: string | any = '';


  ngOnInit():void {
    this.load();
  }

  load(): void {

  }

//   selectedMachine():void {
//     const machineId = this.route.snapshot.paramMap.get('machineId');
//     this.machineApi.getMachineById(machineId).subscribe({
//       next: (mac) => this.appendFromMachine(mac),
//       error: (err: unknown) => console.log(err),
//     });
//   }

// private appendFromMachine(mac: IMachine): void {
//   this.
// }


  }


