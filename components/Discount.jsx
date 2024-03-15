import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setDiscount, cartDetails } from "@/lib/features/cartDetailsSlice";

const Discount = () => {
  const dispatch = useDispatch();
  const details = useSelector(cartDetails);

  const totalPrice =
    details.products &&
    details.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

  const [promo, setPromo] = useState("grow10");
  const [btnClick, setBtnClick] = useState(true);

  const handlePromo = (e) => {
    setPromo(e.target.value);
  };

  useEffect(() => {
    dispatch(
      setDiscount({
        total: totalPrice,
        discount: 10,
      })
    );
  }, [totalPrice]);

  const handleClick = () => {
    btnClick
      ? dispatch(setDiscount({ total: totalPrice, discount: 0 }))
      : dispatch(
          setDiscount({
            total: totalPrice,
            discount: promo === "grow10" ? 10 : 0,
          })
        );
    setBtnClick((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="promo" className="text-gray-500 font-bold">
        Promo Code
      </label>
      <div className="flex rounded-lg items-center border-gray-300 border justify-between ">
        <input
          className="p-3 focus:outline-none w-full"
          type="text"
          name="promo"
          value={promo}
          onChange={handlePromo}
          placeholder="Apply Promo Code"
        />
        <button
          className="whitespace-nowrap py-4 px-8 bg-gray-300 text-sm font-bold rounded-r-lg"
          onClick={handleClick}
        >
          {btnClick ? "Remove" : "Apply"}
        </button>
      </div>
      {btnClick && promo !== "grow10" ? (
        <p className="text-red-500 font-bold text-sm">
          Invalid Promo Code Applied
        </p>
      ) : (
        btnClick &&
        promo === "grow10" && (
          <p className="text-green-500 font-bold text-sm">Promo Code Applied</p>
        )
      )}
    </div>
  );
};

export default Discount;
