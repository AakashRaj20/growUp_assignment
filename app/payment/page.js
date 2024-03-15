import Link from "next/link";
import PreviousButton from "@/icons/PreviousButton";
import PaymentMethods from "@/components/PaymentMethods";
import PaymentBar from "@/components/PaymentBar";

const Payment = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-32 items-center">
        <div className="">
          <Link href="/">
            <PreviousButton />
          </Link>
        </div>
        <div className="text-center font-bold text-2xl">
          <p>Payment</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-700">Choose Payment Method</h3>
      <PaymentMethods />
      <PaymentBar />
    </div>
  );
};

export default Payment;
