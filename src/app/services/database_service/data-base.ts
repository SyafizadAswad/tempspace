import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

import { environment } from '../../../env/env';
import { IMachine, MachineModel, IMachineData, IMachineRequest } from '../models/MachineModel';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  private readonly http = inject(HttpClient);
  private readonly resourceMachine = `${environment.apiBaseUrl}/Machine`;
  private readonly resourceMachineData = `${environment.apiBaseUrl}/MachineData`;

  // machine services
  public getAllMachine(): Observable<IMachine[]> {
    return this.http.get<IMachine[]>(this.resourceMachine);
  }

  // public getMachineById(machineId: string): Observable<IMachine> {
  //   const key = encodeURIComponent(machineId);
  //   return this.http.get<IMachine>(`${this.resourceMachine}/${key}`);
  // } 

  public getMachineById(machineId: string):Promise<MachineModel>{
    const key = encodeURIComponent(machineId);
    return lastValueFrom(this.http.get<MachineModel>(`${this.resourceMachine}/${key}`)).then((response) => {
      return response = new MachineModel({
        machineId: response.machineId,
        machineName: response.machineName,
        location: response.location,
        installDate: response.installDate,
      })
    });
  } 

  public createMachine(body: IMachineRequest): Observable<IMachine> {
    return this.http.post<IMachine>(this.resourceMachine, body);
  }

  public updateMachine(machineId: string, body: IMachineRequest): Observable<void> {
    const key = encodeURIComponent(machineId);
    return this.http.put<void>(`${this.resourceMachine}/${key}`, body);
  }

  public deleteMachine(machineId: string): Observable<void> {
    const key = encodeURIComponent(machineId);
    return this.http.delete<void>(`${this.resourceMachine}/${key}`);
  }

  // machine data services
  public getAllMachineData(): Observable<IMachineData[]> {
    return this.http.get<IMachineData[]>(this.resourceMachineData);
  }

  public getMachineDataById(machineId: string): Observable<IMachineData[]> {
    const key = encodeURIComponent(machineId);
    return this.http.get<IMachineData[]>(`${this.resourceMachineData}/${key}`);
  }

}
