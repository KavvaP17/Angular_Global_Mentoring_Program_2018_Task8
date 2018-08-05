import { Component, OnInit } from '@angular/core';
import { InitIconsService } from './core/services/init-icons/init-icons.service';
import { AuthService } from './auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isAuthenticated;

  constructor(private initIconsService: InitIconsService,
              private authService: AuthService) {}

  ngOnInit() {
    this.initIconsService.init();
    this.isAuthenticated = this.authService.isAuthenticatedSubject;
  }

}
