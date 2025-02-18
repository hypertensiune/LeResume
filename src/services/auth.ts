import { FirebaseApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Database } from "./database";

export class Authentication {
  private app: FirebaseApp;
  private provider: GoogleAuthProvider;

  constructor(firebaseApp: FirebaseApp) {
    this.app = firebaseApp;
    this.provider = new GoogleAuthProvider();
  }

  public isAuthenticated() {
    const auth = getAuth(this.app);
    return auth.currentUser != null;
  }

  public getUserId() {
    return getAuth(this.app).currentUser!.uid;
  }

  public async signInWithEmail(email: string, password: string) {
    const auth = getAuth(this.app);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in", user);

    } catch {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password); 
        Database.createNewUserDocs(this.app, user.user.uid);        
      } catch {
        return false;
      }  
    }

    return true;
  }
  
  public async signInWithGoogle() {
    const auth = getAuth(this.app);
    try {
      const user = await signInWithPopup(auth, this.provider);
      const info = getAdditionalUserInfo(user);
      
      if(info?.isNewUser) {
        Database.createNewUserDocs(this.app, user.user.uid);
      }

      return true;
    } catch {
      return false;
    }
  }

  public signOut() {
    const auth = getAuth(this.app);
    auth.signOut();
  }
}
