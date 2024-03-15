"use client";

import Link from "next/link";
import Loading from "@/components/Loading";
import PreviousButton from "@/icons/PreviousButton";
import PaymentMethods from "@/components/PaymentMethods";
import ThemeSwitch from "@/components/ThemeSwitcher";
import { useSelector } from "react-redux";
import { isCartLoading } from "@/lib/features/cartDetailsSlice";
import PaymentBar from "@/components/PaymentBar";

const Payment = () => {
  const isLoading = useSelector(isCartLoading);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-24 md:gap-[4.5rem] lg:gap-8 items-center">
        <div className="">
          <Link href="/">
            <PreviousButton />
          </Link>
        </div>
        <div className="font-bold text-2xl flex text-center items-center justify-between w-full">
          <p>Payment</p>
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex flex-col gap-10 md:px-24 lg:px-48">
        <h3 className="text-xl font-bold text-gray-700">
          Choose Payment Method
        </h3>
        <PaymentMethods />
        <PaymentBar />
      </div>
    </div>
  );
};

export default Payment;
