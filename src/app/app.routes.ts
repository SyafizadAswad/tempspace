import { Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page';
import { MachineDataPageComponent } from './pages/machine-data-page/machine-data-page';
import { MachineListPageComponent } from './pages/machine-list-page/machine-list-page';
import { MachineRegisterPageComponent } from './pages/machine-register-page/machine-register-page';
import { UserRegisterPageComponent } from './pages/user-register-page/user-register-page';
import { DisplaySettingPageComponent } from './pages/display-setting-page/display-setting-page';
import { MachineEditComponent } from './page-component/machine-edit/machine-edit';

import { AuthGuard } from './services/auth-service/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'machine', pathMatch: 'full'},
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: UserRegisterPageComponent },
    { path: 'machine', component: MachineListPageComponent, canActivate: [AuthGuard] },
    { path: 'machine/register', component: MachineRegisterPageComponent, canActivate: [AuthGuard] },
    { path: 'machine/edit/:machineId', component: MachineEditComponent, canActivate: [AuthGuard] },
    { path: 'machine/:machineId', component: MachineDataPageComponent, canActivate: [AuthGuard] },
    { path: 'user/:userId', component: DisplaySettingPageComponent, canActivate: [AuthGuard] }
];
