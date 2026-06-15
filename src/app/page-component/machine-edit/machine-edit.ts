import { Component, signal, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DataBaseService } from '../../services/database_service/data-base';
import { IMachine, IMachineData, IMachineRequest, MachineModel } from '../../services/models/MachineModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machine-edit',
  imports: [ 
    RouterLink,
    TranslatePipe,
    TranslateDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './machine-edit.html',
  styleUrl: './machine-edit.css',
})
export class MachineEditComponent implements OnChanges {
  @Input() machine: IMachine | null = null;
  @Input() isModal = false;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  private translate = inject(TranslateService);

  private readonly machineApi = inject(DataBaseService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  public machineData = signal<IMachineData[]>([]);
  public machineInfo: MachineModel = new MachineModel({machineId:'',machineName:'',location:'',installDate:''});
  public selectedMachineId: string = '';
  public message: string = "";

  


  readonly form = this.fb.group({
    machineId: this.fb.control('', {
      validators: []
    }),
    machineName: this.fb.control('', {
      validators: [Validators.required],
    }),
    location: this.fb.control('', {
      validators: [Validators.required],
    }),
    installDate: this.fb.control('', {
      validators: [Validators.required]
    })
  })

  submit(){
    const m = this.form.getRawValue();
    const body: IMachineRequest = {
      machineId: this.selectedMachineId,
      machineName: m.machineName,
      location: m.location,
      installDate: m.installDate
    }

    if (this.form.invalid){
      alert(`${this.translate.instant('alert.inputError')}`);
      return;
    }
    if (!confirm(`${this.translate.instant('alert.edit')}`)){
      return;
    }

    this.machineApi.updateMachine(this.selectedMachineId, body).subscribe({
      next:() => {
        if (this.isModal) {
          this.updated.emit();
        } else {
          this.router.navigate(['/machine']);
        }
      },
      error:(err: unknown) => {
        console.log(err);
      }
    });
  }

  cancel(): void {
    if (this.isModal) {
      this.close.emit();
    } else {
      this.router.navigate(['/machine']);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['machine'] && this.machine) {
      this.setupFormFromMachine(this.machine);
    }
  }

  ngOnInit(): void {
    if (this.machine) {
      this.setupFormFromMachine(this.machine);
      return;
    }

    const machineId = this.route.snapshot.paramMap.get('machineId');
    const stateMachine = history.state?.machine as Partial<MachineModel> | undefined;

    if(machineId !== null) {
      this.selectedMachineId = String(machineId);
      if(stateMachine?.machineId === machineId) {
        this.machineInfo = new MachineModel({
          machineId: stateMachine.machineId,
          machineName: stateMachine.machineName ?? '',
          location: stateMachine.location ?? '',
          installDate: stateMachine.installDate ?? ''
        });
        this.form.patchValue({
          machineName: this.machineInfo.machineName,
          location: this.machineInfo.location,
          installDate: this.machineInfo.installDate
        });
      } else {
        this.getMachineById(this.selectedMachineId);
      }
    }
  }

  private setupFormFromMachine(machine: IMachine): void {
    this.selectedMachineId = machine.machineId;
    this.machineInfo = new MachineModel({
      machineId: machine.machineId,
      machineName: machine.machineName,
      location: machine.location,
      installDate: machine.installDate
    });
    this.form.patchValue({
      machineName: machine.machineName,
      location: machine.location,
      installDate: machine.installDate
    });
  }

  getMachineById(machineId: string){
    this.message = "";
    this.machineApi.getMachineById(machineId).then(res => {
      this.machineInfo = res;
    })
    .catch((error) => (this.message = error.message));
  }

}
