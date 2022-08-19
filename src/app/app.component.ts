import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';

//An interface to map responses of api call
interface ipResponse{
  ip:string
}

interface basicInfo{
  city:string,
  country:string,
  ip:string,
  loc:string,
  org:string,
  postal:string,
  region:string,
  timezone:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IpMap';
  ip = '';
  myip:boolean = false;
  basicInfo:basicInfo|undefined;

  //Getting a singleton for http
  constructor(private http:HttpClient) {}

  //Method for getting the current IP
  fetchIP = () =>{
    this.myip = !this.myip;
    console.log("fetch called!");
    console.log(this.myip);
    if (!this.myip){
      this.ip = "";
      return;
    }
    this.http.get<ipResponse>("https://api.ipify.org/?format=json")
    .subscribe(data => {
      console.log(data.ip);
      this.ip = data.ip;
    })
  }

  //Method for getting basic info about ip
  BasicInfo = () =>{
    if (this.ip.trim() === ""){
      alert("Please enter an ip address")
      return;
    }
    else if (!this.ip.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)){
      alert("Please enter a valid ip address");
      return;
    }

    this.http.get<basicInfo>(`https://ipinfo.io/${this.ip}?token=${environment.apiToken}`)
    .subscribe(data =>{
      this.basicInfo = data;
    })
  }
}
