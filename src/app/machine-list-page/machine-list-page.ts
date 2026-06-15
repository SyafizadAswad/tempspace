import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { UserNavbar } from '../user-navbar/user-navbar';

import { IMachine, IMachineData } from '../services/models/MachineModel';
import { DataBaseService } from '../services/database_service/data-base';
import { UserService } from '../services/user_services/user-service';

@Component({
  selector: 'app-machine-list-page',
  imports: [RouterLink, UserNavbar, DatePipe, CommonModule],
  templateUrl: './machine-list-page.html',
  styleUrl: './machine-list-page.css',
})
export class MachineListPageComponent implements OnInit {
  private readonly machineApi = inject(DataBaseService);
  private readonly userApi = inject(UserService);
  private readonly route = inject(Router);

  public machines = signal<IMachine[]>([]);

  public sortKey: string | any = "";

  public statusKey: string | any = "";


  // colors
  public greenColor = '#10b981';
  public redColor = '#ef4444';
  public blackColor = '#000000';

  onSortInputKey(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.sortKey = e?.value ?? '';
  }

  // OnStatusInputKey(event: Event): void {
  //   const e = event.target as HTMLInputElement | null;
  //   this.statusKey = e?.value ?? '';
  // }

  ngOnInit(): void {
    this.load();
  }

  load(): void{
    this.getAllMachine();
  }

  // temperature data up to 1 decimal place only
  trimFloat(value: number, decimalPlaces: number = 1): string {
    const valueString = value.toString();
    const decimalIndex = valueString.indexOf('.');

    if (decimalIndex === 1) {
      return valueString + '.' + '0'.repeat(decimalPlaces);
    }
    return valueString.substring(0, decimalIndex + decimalPlaces + 1);
  }

  // sort function | ソート機能
  sortBy(): void {
    switch(this.sortKey){
      case 'machineId':
        this.machines.update(list => {
          return [...list].sort((a, b) => a.machineId.localeCompare(b.machineId));
        });
        break;
      case 'machineName':
        this.machines.update(list => {
          return [...list].sort((a, b) => a.machineName.localeCompare(b.machineName));
        });
        break;
      case 'location':
        this.machines.update(list => {
          return [...list].sort((a, b) => a.location.localeCompare(b.location));
        });
        break;
      case 'installDate-latest':
        this.machines.update(list => {
          return [...list].sort((a, b) => b.installDate.localeCompare(a.installDate));
        });
        break;
      case 'installDate-oldest':
        this.machines.update(list => {
          return [...list].sort((a, b) => a.installDate.localeCompare(b.installDate));
        });
        break;
      case 'status':
        this.machines.update(list => {
          return [...list].sort((a, b) => a.status.localeCompare(b.status));
        });
        break;
    }
  }

  getStatusColor(statusKey: string): string {
    switch(statusKey) {
      case '正常': return this.greenColor;
      case '異常': return this.redColor;
      default: return this.blackColor;
    }
  }

  getAllMachine(): void {
    this.machineApi.getAllMachine().subscribe({
      next: (rows) => {
        this.machines.set(rows);
      },
      error: (err: unknown) => {
        console.log(err);
      }
    });
  }

  // getMachineById(): void {
  //   this.machineApi.getMachineById(machineId).subscribe({
  //     next: (mac) => {
  //       this.machines.set([mac]);
  //     },
  //     error: (err: unknown) => {
  //       console.log(err);
  //     }
  //   });
  // }

}
