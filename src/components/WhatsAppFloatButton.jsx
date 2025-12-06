import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatButton = () => {
  const phoneNumber = '916381250549';
  const message = 'Hello! I am Looking for More personalized Product Details...';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-5
        right-5
        sm:bottom-6 sm:right-6
        bg-[#25d366]
        text-white
        rounded-full
        p-2
        sm:p-3
        shadow-md
        z-50
        transition-transform
        duration-200
        ease-in-out
        hover:scale-110
      "
    >
      <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8" />
    </a>
  );
};

export default WhatsAppFloatButton;
