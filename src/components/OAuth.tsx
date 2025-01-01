import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelGoogleClick = async () => {
    // TODO: redirect to Google OAuth
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          photoURL: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      gradientDuoTone='pinkToOrange'
      type='submit'
      outline
      onClick={handelGoogleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2 text-gray-700 dark:text-gray-200' />
      Continue with Google
    </Button>
  );
}
