"use client";
import React from "react";
const Shop = () => {
  return (
    <section className="min-h-screen overflow-hidden bg-[#EEEEEE] px-5 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col items-center lg:min-h-[520px] lg:flex-row">
          <div className="group relative z-10 h-[280px] w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ease-in-out hover:z-30 sm:h-[360px] lg:h-[440px] lg:w-[55%]">
            <img
              src="/image2.png"
              alt="Complete Shopping Collection"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="relative z-20 -mt-8 flex min-h-[280px] w-[92%] flex-col items-center justify-center rounded-xl bg-black px-5 py-10 text-center text-white shadow-2xl transition-all duration-500 sm:min-h-[340px] sm:px-8 lg:absolute lg:left-[36%] lg:mt-0 lg:min-h-[400px] lg:w-[60%] lg:px-10">
            <p className="mb-5 text-[10px] tracking-[0.4em] text-[#E8C96A] transition-all duration-500 hover:tracking-[0.5em] sm:text-xs">
              VELVETY THORNS
            </p>
            <h1 className="cursor-default font-serif text-3xl font-medium leading-tight transition-all duration-500 ease-in-out hover:-translate-y-1 hover:text-[#E8C96A] sm:text-5xl lg:text-6xl">
              FAST PACE
              <span className="mt-2 block text-[#E8C96A] transition-all duration-500 ease-in-out hover:tracking-wider">
                ENDLESS CHOICE
              </span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400 transition-colors duration-500 hover:text-white sm:text-base">
              Discover everything you love in one place.
            </p>
            <a
              href="/shop"
              className="mt-7 inline-flex items-center justify-center border border-[#B89542] px-7 py-3 text-[10px] tracking-[0.2em] text-[#E8C96A] transition-all duration-300 hover:scale-105 hover:bg-[#E8C96A] hover:text-black sm:text-xs"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Shop;
