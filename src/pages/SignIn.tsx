/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { loading, error: errorMessage } = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelSubmit = async (event: any) => {
    event.preventDefault();
    // TODO: send form data to server]
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill all the required fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        localStorage.setItem("token", data.data.accessToken);
        dispatch(signInSuccess(data));
        navigate("/create-post", { replace: true });
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'></Link>
        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
            <div className=''>
              <Label value='Email' className='' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Password' className='' />
              <TextInput
                type='password'
                placeholder='********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  (<Spinner size='sm' />{" "}
                  <span className='pl-3'>Loading...</span>)
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {errorMessage && (
            <Alert className='mt-5' color='blue'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
