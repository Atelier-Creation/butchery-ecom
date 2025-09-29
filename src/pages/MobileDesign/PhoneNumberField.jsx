import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneNumberField = ({ mobileInfo, setMobileInfo, errors }) => {
  return (
    <div className="flex flex-col">
      <PhoneInput
        country={"in"} // 🇮🇳 Default country
        value={mobileInfo}
        onChange={(phone) => setMobileInfo(phone)}
        inputClass="!w-full !h-[52px] !border !border-gray-300 !rounded !pl-[50px]" // Tailwind override
        buttonClass="!border !border-gray-300 !rounded-l"
        containerClass="!w-full"
        placeholder="Mobile Phone Number"
        enableSearch={true} // Allow searching countries
      />
      {errors.mobileInfo && (
        <p className="text-red-500 text-sm mt-1">{errors.mobileInfo}</p>
      )}
    </div>
  );
};
