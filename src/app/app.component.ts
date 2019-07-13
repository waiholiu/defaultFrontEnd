import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private afa: AngularFireAuth, private http: HttpClient) {
    this.afa.idToken.subscribe((data) => {
      console.log(data);
      this.callServer(data);
    })
    this.http
      .get<any>('https://localhost:5001/api/free').subscribe(d => {
        console.log(d);

      });
  }

  onLogOut(){
    this.afa.auth.signOut();
  }

  private callServer(token :string) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.http
      .get<any>('https://localhost:5001/api/values', { headers: headers }).subscribe(d => {
        console.log(d);
      });
  }
}
