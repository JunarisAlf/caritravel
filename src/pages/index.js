import React from "react";
import Link from 'next/link'

import Head from "next/head";
export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Driver</title>
      </Head>
      <div className="p-5 mt-[50%] md:mt-[20%]">
        <div className="flex items-center justify-center">
          <main className="max-w-screen-xl px-4 lg:px-16">
            <div className="text-left">
              <h2 className="mt-8 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Temukan Travel
                <br />
                <span className="pt-3 text-indigo-600">Dengan Mudah!</span>
              </h2>
              <p className="mt-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Cari travel pilihan sesuai dengan kriterial anda hanya dengan beberapa klik.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/customer"
                    
                  >
                      <a 
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                      > Cari Travel</a>
                    
                  </Link>
                </div>

                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/driver/login"
                    
                  >
                      <a className="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-indigo-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">Masuk sebagai driver</a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
