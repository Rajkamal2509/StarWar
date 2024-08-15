import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './core/service/api-service/http.service';
import { LocalStorageService } from './core/service/localStorage/local-storage.service';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'LLM_Angular';
  status: OnlineStatusType = this.onlineStatusService.getStatus();	
  onlineStatus: any;
  constructor(public httpClient: HttpClient,private onlineStatusService: OnlineStatusService) {	
      this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {	
        this.status = status;	
        this.getStatus(this.status);	
        console.log("this.status" + this.status)	
      });	
    } 
    ngOnInit(): void {
      this.getStatus(this.status);
    }
    getStatus(statusType:any){	
    	console.log(statusType);
      
    if(statusType == 0){	
      this.onlineStatus = "Offline";	
      $('#Internet').show();	
    }	else{
      $('#Internet').hide();	
    }
 }	
 closePopUp(){	
   $('#Internet').hide();	
 }
}
