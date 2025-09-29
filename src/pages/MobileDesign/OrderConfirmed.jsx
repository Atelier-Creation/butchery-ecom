import Lottie from "lottie-react";
import successAnimation from "../../assets/LottieJson/order-confirmed.json";
import failAnimation from "../../assets/LottieJson/payment-failed.json";
import Confetti from "react-confetti";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("paymentId");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");
  const contact = searchParams.get("contact");
  const isSuccess = location.pathname === "/order-confirmed";

  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState(
    isSuccess ? "Payment initiated..." : "Verifying payment..."
  );

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const messages = isSuccess
      ? [
          "Payment initiated...",
          "Processing your order...",
          "Placing your order...",
          "Finalizing...",
        ]
      : [
          "Verifying payment...",
          "Attempting to confirm payment...",
          "Oops, something went wrong...",
        ];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setStatusText(messages[index]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loading, isSuccess]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-32 lg:w-62 h-32 lg:h-62 mx-auto"
          />
          <p className="mt-3 font-semibold text-gray-700">{statusText}</p>
        </div>
      </div>
    );
  }

  // ===========================
  // ✅ SUCCESS UI
  // ===========================
  if (isSuccess) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
        />

        <div className="flex flex-col justify-center items-center min-h-screen bg-white pt-4 pb-6 px-4">
          <div className="mb-2 w-72 h-72">
            <Lottie animationData={successAnimation} loop={false} speed={0.5} />
          </div>
          <h2 className="font-bold text-2xl mb-2 text-center">
            Your order has been confirmed
          </h2>
          <p className="text-gray-500 text-center mb-2">
            Thanks for your order! Your order Id:{" "}
            <span className="text-blue-600 font-medium">{orderId}</span>. and Your payment Id: {" "} <span className="text-blue-600 font-medium">{paymentId}</span> We
            will process your order within <strong>1hr</strong>.
          </p>
          <button
            className="bg-black text-white px-6 py-3 mt-4 rounded-md hover:bg-gray-900 transition-colors"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
          <div className="mt-4">
            <p className="text-gray-400 text-center text-sm">
              Need help? Contact us at{" "}
              <a
                href="mailto:ecom@Iraichikadai.store"
                className="text-blue-600 underline"
              >
                ecom@Iraichikadai.store
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }

  // ===========================
  // ❌ FAIL UI
  // ===========================
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white pt-4 pb-6 px-4">
      <div className="mb-2 w-full max-w-xl h-72">
        <Lottie animationData={failAnimation} loop={false} />
      </div>
      <p className="text-gray-500 text-center my-4">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
        <button
          className="border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
