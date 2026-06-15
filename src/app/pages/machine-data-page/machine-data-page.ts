import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

import { UserNavbar } from '../../page-component/user-navbar/user-navbar';
import { DataGaugeBarComponent } from '../../page-component/data-gauge-bar/data-gauge-bar';

import { DataBaseService } from '../../services/database_service/data-base';
import { UserService } from '../../services/user_services/user-service';

import { MachineModel, IMachineData } from '../../services/models/MachineModel';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-machine-data-page',
  imports: [
    RouterLink, 
    UserNavbar, 
    DataGaugeBarComponent, 
    CommonModule,
    DatePipe,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './machine-data-page.html',
  styleUrl: './machine-data-page.css',
})
export class MachineDataPageComponent {
  private readonly machineApi = inject(DataBaseService);
  private readonly userApi = inject(UserService);
  private readonly authApi = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  public machineData = signal<IMachineData[]>([]);
  public sortedData = signal<IMachineData[]>([]);
  public latestData = signal<IMachineData[]>([]);
  public latestDataGauge: string | any = 0;
  public machineInfo: MachineModel = new MachineModel({machineId:'',machineName:'',location:'',installDate:''});
  public selectedMachineId: string | any = '';
  public message: string = "";

  ngOnInit(): void {
    const machineId = this.route.snapshot.paramMap.get('machineId');
    const stateMachine = history.state?.machine as Partial<MachineModel> | undefined;

    if(machineId !== null) {
      this.selectedMachineId = String(this.route.snapshot.paramMap.get('machineId'));
      if (stateMachine?.machineId === machineId) {
        this.machineInfo = new MachineModel({
          machineId: stateMachine.machineId,
          machineName: stateMachine.machineName ?? '',
          location: stateMachine.location ?? '',
          installDate: stateMachine.installDate ?? ''
        });
      } else {
        this.getMachineById(this.selectedMachineId);
        this.getMachineDataById(this.selectedMachineId);
      }
    }
  }
  
  getMachineById(machineId: string){
    this.message = "";
    this.machineApi.getMachineById(machineId).then(res => {
      this.machineInfo = res;
    })
    .catch((error) => (this.message = error.message));
  }
  
  getMachineDataById(machineId: string){
    this.machineApi.getMachineDataById(machineId).subscribe({
      next: (rows) => {
        this.machineData.set(rows);
        this.machineData.update(list => {
          return [...list].sort((a, b) => b.dataDate.localeCompare(a.dataDate));
        });
      },
      error: (err: unknown) => {
        console.log(err);
      }
    })
  }
  
  
  dataGaugeUpdater(value: number): string {
    return `${value}%`;
  }


  trimFloat(value: number, decimalPlaces: number = 1): string {
    const valueString = value.toString();
    const decimalIndex = valueString.indexOf('.');

    if (decimalIndex === 1){
      return valueString + '.' + '0'.repeat(decimalPlaces);
    }
    return valueString.substring(0, decimalIndex + decimalPlaces + 1);
  }


}

