"use client";

import Image from "next/image";
import Loading from "@/components/Loading";
import PreviousButton from "@/icons/PreviousButton";
import Location from "@/icons/Location";
import Phone from "@/icons/Phone";
import OrderList from "@/components/OrderList";
import OrderSummary from "@/components/OrderSummary";
import PaymentBar from "@/components/PaymentBar";
import Discount from "@/components/Discount";
import ThemeSwitch from "@/components/ThemeSwitcher";
import { useEffect } from "react";
import {
  fetchCartDetails,
  isCartError,
  isCartLoading,
  cartDetails,
} from "@/lib/features/cartDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector(isCartLoading);
  const isError = useSelector(isCartError);
  const cart = useSelector(cartDetails);

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, []);

  let cartItems = "";

  if (isLoading) {
    cartItems = <Loading />;
  } else if (isError) {
    cartItems = (
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src="/images/server.png" alt="error" width={300} height={300} />
        <p className="text-bg-500 font-bold">
          Something went wrong, Kindly refresh the page!
        </p>
      </div>
    );
  } else if (cart.products && cart.products.length === 0) {
    cartItems = (
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/images/shopping.png"
          alt="empty-cart"
          width={300}
          height={300}
        />
        <p className="text-gray-500 font-bold text-3xl">Your cart is empty!</p>
      </div>
    );
  } else {
    cartItems = (
      <>
        <OrderList />
        <Discount />
        <OrderSummary />
        <PaymentBar />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-24 md:gap-[4.5rem] lg:gap-8 items-center">
        <div>
          <PreviousButton />
        </div>
        <div className="font-bold text-2xl flex text-center items-center justify-between w-full">
          <p>Checkout</p>
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex flex-col gap-10 md:px-24 lg:px-48">
        <div className="flex flex-col gap-2 items-start">
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-100">
            Delivery Details
          </h3>
          <div className="flex items-center gap-2 bg-gray-300 dark:bg-neutral-700 p-2 rounded-md text-sm">
            <Location />
            Sector 1, HSR Layout, Bangalore
          </div>
          <div className="flex items-center dark:bg-neutral-700 border-gray-100 dark:border-none border-2 px-3 py-2 rounded-lg w-full gap-x-2">
            <Phone />
            <input
              className="focus:outline-none w-full dark:bg-neutral-700"
              type="text"
              placeholder="Mobile Number"
              name="phone"
              value="6203710264"
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>
        {cartItems}
      </div>
    </div>
  );
}
