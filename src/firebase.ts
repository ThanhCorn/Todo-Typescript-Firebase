import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyDu77cE_cQYWdA7fSMv2MUMKe3lfVxAf2A',
    authDomain: 'numeric-pilot-384110.firebaseapp.com',
    databaseURL: 'https://numeric-pilot-384110-default-rtdb.firebaseio.com',
    projectId: 'numeric-pilot-384110',
    storageBucket: 'numeric-pilot-384110.appspot.com',
    messagingSenderId: '5630035557',
    appId: '1:5630035557:web:115457563e0020feaa688c',
    measurementId: 'G-PYQRBVW6BG'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
