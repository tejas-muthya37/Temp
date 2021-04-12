import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindetails:any={emailID:'', password:''}
  loginerrordetails:any={emailIDloginerror:'', passwordloginerror:''}

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  login(){
    let hasloginError=false;
    if(this.logindetails.emailID==undefined || this.logindetails.emailID=="") {
      this.loginerrordetails.emailIDloginerror="Required";
      hasloginError=true;
    } else {
      this.loginerrordetails.emailIDloginerror=false;
    }
    if(this.logindetails.password==undefined || this.logindetails.password=="") {
      this.loginerrordetails.passwordloginerror="Required";
      hasloginError=true;
    } else {
      this.loginerrordetails.passwordloginerror=false;
  }
  var loginformData = new FormData();
    loginformData.set("xemailID", this.logindetails.emailID);
    loginformData.set("xpassword", this.logindetails.password);

    this.http.post("http://localhost:9005/admin/validateRegister/",loginformData).subscribe((data:any)=>{
      console.log(data);
    })
    
    console.log(this.logindetails);
}
}