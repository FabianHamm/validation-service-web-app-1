import { NgModule, Component } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BatchesComponent } from './batches/batches.component';
import { BatchesResolver } from './batches/batches-list-resolver.service';
import { BatchesStartComponent } from './batches/batches-start/batches-start.component';
import { BatchManagerComponent } from './batches/batch-manager/batch-manager.component';
import { FileUploaderComponent } from './batches/batch-manager/file-uploader/file-uploader.component';
import { BatchResolver } from './batches/batch-manager/batch-resolver.service';
import { BatchDefineComponent } from './batches/batch-define/batch-define.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { BatchViewerComponent } from './batches/batch-manager/batch-viewer/batch-viewer.component';
import { FilesResolver } from './batches/batch-manager/batch-viewer/files-resolver.service';
import { BatchInfoComponent } from './batches/batch-manager/batch-info/batch-info.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationsListComponent } from './configurations/configurations-list/configurations-list.component';
import { ConfigurationsResolver } from './configurations/configurations-list-resolver.service';
import { ConfigurationManagerComponent } from './configurations/configuration-manager/configuration-manager.component';
import { ConfigurationEditComponent } from './configurations/configuration-manager/configuration-edit/configuration-edit.component';
import { ConfigurationResolver } from './configurations/configuration-manager/configuration-resolver.service';
import { NameRuleManagerComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-manager.component';
import { FileNameRulesResolver } from './configurations/configuration-manager/name-rule-manager/name-rules-resolver.service';
import { NameRuleStartComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-start/name-rule-start.component';
import { NameRuleEditComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-edit.component';
import { FileNameRuleResolver } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-resolver.service';
import { FitsRuleManagerComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-manager.component';
import { FitsRuleStartComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-start/fits-rule-start.component';
import { FitsRuleEditComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-edit/fits-rule-edit.component';
import { FitsResultRulesResolver } from './configurations/configuration-manager/fits-rule-manager/fits-rules-resolver.service';
import { FitsResultRuleResolver } from './configurations/configuration-manager/fits-rule-manager/fits-rule-edit/fits-rule-resolver.service';
import { VerapdfSetupEditComponent } from './configurations/configuration-manager/verapdf-setup-edit/verapdf-setup-edit.component';
import { ReportsComponent } from './reports/reports.component';
import { BatchValidatorComponent } from './batches/batch-manager/batch-validator/batch-validator.component';
import { ReportsOverviewComponent } from './reports/reports-overview/reports-overview.component';
import { ReportsResolver } from './reports/reports-list-resolver.service';
import { QueueResolver } from './reports/queue-list-resolver.service';
import { FileReportsListComponent } from './reports/report-viewer/file-reports-list/file-reports-list.component';
import { FileReportsListResolver } from './reports/report-viewer/file-reports-list.resolver.service';
import { ReportViewerComponent } from './reports/report-viewer/report-viewer.component';
import { BatchReportResolver } from './reports/report-viewer/batch-report-resolver.service';
import { FileReportViewerComponent } from './reports/report-viewer/file-report-viewer/file-report-viewer.component';
import { FileReportResolver } from './reports/report-viewer/file-report-resolver.service';
import { SettingsComponent } from './settings/settings.component';
import { ApplicationSettingsResolver } from './settings/settings-resolver.service';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { UserListResolver } from './users/user-list-resolver.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserResolver } from './users/edit-user/user.resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch: 'full' },
    { path: 'login', children: [
        { path: '', component: LoginComponent, pathMatch: 'full'}
    ]},
    { path: 'batches', component: BatchesComponent, runGuardsAndResolvers: 'paramsChange', canActivate:[AuthGuard], data: {role:'user'}, resolve: {startPage: BatchesResolver}, children: [
        {path: '', component: BatchesStartComponent, pathMatch: 'full' },
        {path: 'new', component: BatchDefineComponent },
        {path: ':id', component: BatchManagerComponent, resolve: {batch: BatchResolver}, children: [
            {path: '', redirectTo: 'manage', pathMatch: 'full'},
            {path: 'info', component: BatchInfoComponent },
            {path: 'upload', component: FileUploaderComponent, canDeactivate:[CanDeactivateGuard] },
            {path: 'manage', component: BatchViewerComponent, resolve: {filesPage: FilesResolver} },
            {path: 'reports', component: BatchValidatorComponent, resolve: {startPage: ConfigurationsResolver} }
        ]}
    ]},
    {path: 'configurations', component: ConfigurationsComponent, runGuardsAndResolvers: 'always', canActivate:[AuthGuard], data: {role:'admin'}, resolve: {startPage: ConfigurationsResolver}, children: [
        {path: '', component: ConfigurationsListComponent, pathMatch:'full' },
        {path: ':id', component: ConfigurationManagerComponent, runGuardsAndResolvers: 'always',
        resolve: {configuration: ConfigurationResolver}, children: [
            {path: '', redirectTo: 'general', pathMatch: 'full' },
            {path: 'general', component: ConfigurationEditComponent, canDeactivate:[CanDeactivateGuard] },
            {path: 'namerules', component: NameRuleManagerComponent, resolve: {fileNameRulesPage: FileNameRulesResolver}, children: [
                {path: '', component: NameRuleStartComponent, pathMatch: 'full' },
                {path: 'new', component: NameRuleEditComponent, canDeactivate: [CanDeactivateGuard] },
                {path: ':id', component: NameRuleEditComponent,  resolve: {fileNameRule: FileNameRuleResolver},
                canDeactivate: [CanDeactivateGuard] },
            ]},
            {path: 'fitsrules', component: FitsRuleManagerComponent, resolve: {fitsResultRulesPage: FitsResultRulesResolver}, children: [
              {path: '', component: FitsRuleStartComponent, pathMatch: 'full' },
              {path: 'new', component: FitsRuleEditComponent, canDeactivate: [CanDeactivateGuard] },
              {path: ':id', component: FitsRuleEditComponent,  resolve: {fitsResultRule: FitsResultRuleResolver},
              canDeactivate: [CanDeactivateGuard] },
          ]},
          {path: 'verapdf', component: VerapdfSetupEditComponent, canDeactivate:[CanDeactivateGuard] },
      ]}
    ]},
    {path: 'reports', component: ReportsComponent,  runGuardsAndResolvers: 'always', canActivate:[AuthGuard], data: {role:'user'}, children: [
      {path: '', component: ReportsOverviewComponent, pathMatch: 'full', resolve: {reportsPage: ReportsResolver, queuePage: QueueResolver} },
      {path: ':id', component: ReportViewerComponent, resolve: {fileReportsPage: FileReportsListResolver, batchReport: BatchReportResolver}, children: [
        {path: ':id', component: FileReportViewerComponent,  resolve: {fileReport: FileReportResolver} }
      ] },
    ]},
  {
    path: 'users', component: UsersComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard], data: { role: 'admin' }, resolve: {startPage: UserListResolver}, children: [
      { path: '', component: UsersListComponent, pathMatch: 'full' },
      { path: 'new', component: EditUserComponent },
      { path: ':id', component: EditUserComponent, runGuardsAndResolvers: 'always', resolve: { user: UserResolver } }
    ]},
    {path: 'settings', component: SettingsComponent, resolve: {settings: ApplicationSettingsResolver}, canActivate:[AuthGuard], data: {role:'admin'}, canDeactivate: [CanDeactivateGuard]},
    {path: 'error', component: ErrorsComponent},
    { path: '**', redirectTo: 'batches' }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class RoutesModule {

}
