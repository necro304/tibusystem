
import firebase from 'firebase/app'
import 'firebase/firestore'
import {firebaseConfig} from "@/plugins/firebase_config";

export const db = firebaseConfig.firestore()

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }



