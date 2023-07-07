import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eipdp';

  constructor( 
    private _router: Router
  ){}
  
  ngOnInit() {
   /* let navVis = sessionStorage.getItem("navVis");
    console.log("navVis: "+ navVis);
    if(navVis == null || navVis == ''){
      this._router.navigate(["/login"]);
    }else{
      this._router.navigate([navVis]);
    }*/
    
  }
  
}
