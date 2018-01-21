/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {AuthService} from './@core/data/auth/auth.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
