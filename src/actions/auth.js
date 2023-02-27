import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: "LOGIN",
  uid
})
export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLoginGithub = () => {
  return () => {
    return firebase.auth().signInWithPopup(githubAuthProvider);
  };
};

export const logout = () => ({
  type: "LOGOUT"
})
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
