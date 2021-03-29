import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { DetailsComponent } from './details/details.component'

const routes: Routes = [{ path: '', component: TableComponent, pathMatch: "full" }, { path: 'table', component: TableComponent },
{ path: "details/:id/:date", component: DetailsComponent }, { path: "**", component: DetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
