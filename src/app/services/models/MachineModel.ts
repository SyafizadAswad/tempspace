export class MachineModel implements IMachineInfo{
    machineId: string;
    machineName: string;
    location: string;
    installDate: string;

    constructor(init: IMachineInfo) {
        this.machineId = init.machineId;
        this.machineName = init.machineName;
        this.location = init.location;
        this.installDate = init.installDate
    }

}

export interface IMachine {
    machineId: string;
    machineName: string;
    location: string;
    installDate: string;
    dataDate: string;
    data: number;
    status: string;
}

export interface IMachineInfo {
    machineId: string;
    machineName: string;
    location: string;
    installDate: string;
}

export interface IMachineData {
    machineId: string;
    dataDate: string;
    data: number;
    status: string;
}

export interface IMachineRequest {
    machineId: string;
    machineName: string;
    location: string;
    installDate: string;
}