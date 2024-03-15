import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartDetails,
  discount,
  setTotalPrice,
  totalPrice,
} from "@/lib/features/cartDetailsSlice";
import { usePathname } from "next/navigation";

const OrderSummary = () => {
  const orders = useSelector(cartDetails);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const total = useSelector(totalPrice);
  const discounted = useSelector(discount);
  //console.log(discounted);

  const totalAmount =
    orders.products &&
    orders?.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

  useEffect(() => {
    dispatch(
      setTotalPrice({ discount: discounted, total: totalAmount, delivery: 5 })
    );
    console.log(discounted);
  }, [discounted, totalAmount]);

  const summary = orders.products && [
    {
      title: "Order Amount",
      value: totalAmount.toFixed(2),
    },
    {
      title: "Delivery Charges",
      value: 5,
    },
    {
      title: "Discount",
      value: discounted,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-xl font-bold dark:text-white text-gray-700">
        Order Summary
      </h2>
      <div className="flex flex-col gap-2 dark:bg-neutral-900 shadow-md px-2 py-3 rounded-lg md:p-6">
        {orders.products &&
          summary.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between text-base font-medium dark:text-white text-gray-500"
              >
                <p>{item.title}</p>
                <p>{`$${item.value}`}</p>
              </div>
            );
          })}
        {pathname === "/order-status" && (
          <div className="flex justify-between text-base font-bold">
            <p>Total Amount Paid</p>
            <p>{`$${total}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
