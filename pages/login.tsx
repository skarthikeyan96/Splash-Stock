import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import { supabase } from "../helper/supabaseClient";

const Login = () => {
  const user = useUser();

  console.log(user);

  const [email, setEmail] = React.useState("");
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      console.log(error)
      // alert(error.error_description || error.message);
    } finally {
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 mb-4 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
             
            </div>

            <div className="space-y-6">
              <button
                onClick={handleLogin}
                className="group relative flex w-full justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 " aria-hidden="true" />
                </span>
                Sign in
              </button>
             
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
