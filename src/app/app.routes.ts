import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component"; // example route

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "partners", loadComponent: () => import("./pages/partners/partners.component").then(m => m.PartnersComponent) },
      { path: "approvals", loadComponent: () => import("./pages/approvals/approvals.component").then(m => m.ApprovalsComponent) },
    ],
  },
];
