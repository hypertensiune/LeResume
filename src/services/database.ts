import { FirebaseApp } from "firebase/app";
import { doc, Firestore, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

export class Database {
  private db: Firestore

  constructor(app: FirebaseApp) {
    this.db = getFirestore(app);
  }

  public static async createNewUserDocs(app: FirebaseApp, userId: string) {
    const db = getFirestore(app);
    await setDoc(doc(db, userId, "shared"), {});
    await setDoc(doc(db, userId, "nonshared"), {});
  }

  public async getResumes(userId: string): Promise<Resume[]> {
    const shared = await getDoc(doc(this.db, userId, "shared"));
    const nonshared = await getDoc(doc(this.db, userId, "nonshared"));

    const data1 = nonshared.data()!;
    const r1 = Object.keys(data1).map(key => {
      return {
        name: key,
        data: data1[key]['data'],
        created: data1[key]['created'],
        updated: data1[key]['updated'],
        template: data1[key]['template']
      }
    });

    const data2 = shared.data()!;
    const r2 = Object.keys(data2).map(key => {
      return {
        name: key,
        data: data1[key]['data'],
        created: data1[key]['created'],
        updated: data1[key]['updated'],
        template: data1[key]['template']
      }
    });

    return [...r1, ...r2];
  }

  public async uploadResume(userId: string, resume: Resume) {
    await updateDoc(doc(this.db, userId, "nonshared"), {
      [resume.name]: {
        data: resume.data,
        created: resume.created,
        updated: resume.updated
      }
    });
  }
}