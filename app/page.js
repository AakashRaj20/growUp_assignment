"use client";

import { useRouter } from "next/navigation";
import PreviousButton from "@/icons/PreviousButton";
import Location from "@/icons/Location";
import Phone from "@/icons/Phone";
import OrderList from "@/components/OrderList";
import OrderSummary from "@/components/OrderSummary";
import PaymentBar from "@/components/PaymentBar";
import Discount from "@/components/Discount";
import ThemeSwitch from "@/components/ThemeSwitcher";
import { useEffect, useState } from "react";
import { fetchCartDetails } from "@/lib/features/cartDetailsSlice";
import { setAddress, setPhone } from "@/lib/features/ShipmentDetailSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [location, setLocation] = useState("Sector 18, Noida, UP");
  const [phoneNo, setPhoneNo] = useState("6203710265");

  useEffect(() => {
    dispatch(fetchCartDetails());
    dispatch(setAddress("Sector 18, Noida, UP"));
    dispatch(setPhone("6203710265"));
  }, []);

  const handleSubmit = () => {
    router.push("/payment")
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-24 items-center">
        <div className="">
          <PreviousButton />
        </div>
        <div className="font-bold text-2xl flex text-center items-center justify-between w-full">
          <p>Checkout</p>
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h3 className="text-xl font-bold text-gray-700">Delivery Details</h3>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div className="flex items-center border-gray-100 border-2 px-3 py-2 rounded-lg w-full gap-x-2">
            <Location />
            <input
              className="focus:outline-none w-full"
              type="text"
              placeholder="Delivery Address, Area, City, State"
              name="phone"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              title="Please enter a 10-digit number"
              required
            />
          </div>
          <div className="flex items-center border-gray-100 border-2 px-3 py-2 rounded-lg w-full gap-x-2">
            <Phone />
            <input
              className="focus:outline-none w-full"
              type="text"
              placeholder="Mobile Number"
              name="phone"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
          </div>
        </form>
      </div>
      <OrderList />
      <Discount />
      <OrderSummary />
      <PaymentBar />
    </div>
  );
}
