
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const Register = () => {

    const [email ,setEmail ] = React.useState('');
    const [password ,setPassword ] = React.useState('');

    const handleRegister = async () => {
        const res = await fetch("/api/register", {
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
      
    }
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
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
                  autoComplete="email"
                  onChange={(e: any) => setEmail(e.target.value)}
                  required
                  className="p-2 mb-4 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e: any) => setPassword(e.target.value)}

                  required
                  className="p-2 mb-4  relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleRegister}
                className="group relative flex w-full justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 " aria-hidden="true" />
                </span>
                Sign up
              </button>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                Already have an account ?{" "}
                <Link href="/login" className="font-medium">
                  {" "}
                  Sign in{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
