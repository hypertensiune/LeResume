import { FirebaseApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  public async signInWithEmail(email: string, password: string) {
    const auth = getAuth(this.app);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password); 
      console.log("Signed in", user);
      
      return true;
    } catch {
      return false;
    }  
  }
  
  public async signInWithGoogle() {
    const auth = getAuth(this.app);
    try {
      const user = await signInWithPopup(auth, this.provider);
      console.log("Signed in with Google", user);

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
