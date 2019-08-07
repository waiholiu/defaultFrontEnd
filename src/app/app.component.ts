import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private afa: AngularFireAuth, private http: HttpClient, private localStorageService: LocalStorageService) {
    this.afa.idToken.subscribe((data) => {
      console.log(data);
      this.localStorageService.set('loginToken', data);
    });
  }

  onLogOut(){
    this.afa.auth.signOut();
  }

  callServerAuth()
  {
    this.callAuthEndpoint();
  }

  callServerUnauth()
  {
    this.http
      .get<any>('https://localhost:5001/api/free').subscribe(d => {
        console.log('unauth');
        console.log(d);

      });
  }

  private callAuthEndpoint() {
    console.log('calling auth endpoint');
    const token = this.localStorageService.get('loginToken');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.http
      .get<any>('https://localhost:5001/api/values', { headers: headers }).subscribe(d => {
        console.log('returning auth endpoint');
        console.log(d);
      });
  }
}
