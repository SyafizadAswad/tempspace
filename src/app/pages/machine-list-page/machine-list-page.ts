import { Component, OnInit, signal, inject, computed, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validator, Validators } from '@angular/forms';

import { UserNavbar } from '../../page-component/user-navbar/user-navbar';
import { MachineEditComponent } from '../../page-component/machine-edit/machine-edit';

import { IMachine, IMachineRequest } from '../../services/models/MachineModel';
import { DataBaseService } from '../../services/database_service/data-base';
import { UserService } from '../../services/user_services/user-service';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-machine-list-page',
  imports: [
    FormsModule,
    RouterLink, 
    UserNavbar,
    MachineEditComponent, 
    DatePipe, 
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './machine-list-page.html',
  styleUrl: './machine-list-page.css',
})
export class MachineListPageComponent implements OnInit {
  private translate = inject(TranslateService);
  private readonly machineApi = inject(DataBaseService);
  private readonly userApi = inject(UserService);
  private readonly authApi = inject(AuthService);
  private readonly route = inject(Router);

  private readonly fb = inject(NonNullableFormBuilder);

  readonly editModalOpen = signal(false);


  
  public machines = signal<IMachine[]>([]);
  public searchQuery = signal<string>('');
  
  public sortKey: string | any = "";
  public searchKey: string | any = "";
  
  public actionKey: string | any = "";
  
  // for edit
  readonly openActionsMenu = signal<string | null>(null);
  readonly edittingMachineId = signal<string | null>(null);
  readonly savingEdit = signal(false);

  readonly editForm = this.fb.group({
    machineName: this.fb.control('', {
      validators: [Validators.required]
    }),
    location: this.fb.control('', {
      validators: [Validators.required]
    }),
    installDate: this.fb.control('', {
      validators: [Validators.required]
    })
  })

  isActionsMenuOpen(mac: IMachine): boolean {
    return this.openActionsMenu() === mac.machineId;
  }

  toggleActionsMenu(machineId: string, event: Event): void {
    event.stopPropagation();
    this.openActionsMenu.set(
      this.openActionsMenu() === machineId ? null: machineId,
    );
  }

  closeActionsMenu(): void {
    this.openActionsMenu.set(null);
  }


  onMenuDelete(mac: IMachine): void {
    this.closeActionsMenu();
    this.deleteMachine(mac);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeActionsMenu();
  }


  // onClickUpdate(mac: IMachine): void {
  //   this.machineApi
  // }

  deleteMachine(mac: IMachine): void {
    if(!confirm(`${this.translate.instant('alert.delete')}`)) return;
    this.machineApi.deleteMachine(mac.machineId).subscribe({
      next: () => this.load(),
      error: (err:unknown) => {
        console.log(err);
      }
    });

  }

  readonly selectedMachine = signal<IMachine | null>(null);

  openEditModal(machine: IMachine): void {
    this.closeActionsMenu();
    this.selectedMachine.set(machine);
    this.editModalOpen.set(true);
  }

  closeEditModal(): void {
    this.editModalOpen.set(false);
    this.selectedMachine.set(null);
  }

  onMachineUpdated(): void {
    this.closeEditModal();
    this.load();
  }


  
  // colors
  public greenColor = '#10b981';
  public redColor = '#ef4444';
  public blackColor = '#000000';

  onSortInputKey(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.sortKey = e?.value ?? '';
  }

  onSearchInputKey(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.searchKey = e?.value ?? '';
  }

  OnActionInputKey(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.actionKey = e?.value ?? '';
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void{
    this.getAllMachine();

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

  // temperature data up to 1 decimal place only
  trimFloat(value: number, decimalPlaces: number = 1): string {
    const valueString = value.toString();
    const decimalIndex = valueString.indexOf('.');

    if (decimalIndex === 1) {
      return valueString + '.' + '0'.repeat(decimalPlaces);
    }
    return valueString.substring(0, decimalIndex + decimalPlaces + 1);
  }


  getStatusColor(statusKey: string): string {
    switch(statusKey) {
      case '正常': return this.greenColor;
      case '異常': return this.redColor;
      default: return this.blackColor;
    }
  }

  
  filteredMachine = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.machines();
    return this.machines().filter(item =>
      item.machineId.toLowerCase().includes(query) ||
      item.machineName.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.installDate.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });


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

}
