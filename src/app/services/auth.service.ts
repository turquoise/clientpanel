import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth ) { }

  login(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve(userData),
                error => reject(error));
    });
  }

}
