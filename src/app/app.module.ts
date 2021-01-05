import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent,
		IngresoEgresoComponent,
		EstadisticaComponent,
		DetalleComponent,
		FooterComponent,
		NavbarComponent,
		SidebarComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		AppRoutingModule,

		StoreModule.forRoot(appReducer),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
		}),

		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
