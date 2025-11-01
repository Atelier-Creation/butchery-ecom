import React, { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneNumberField = forwardRef(
  ({ mobileInfo, setMobileInfo, errors }, ref) => {
    // Ensure the value is a string, default empty
    const formattedValue = mobileInfo || "";

    return (
      <div className="flex flex-col" ref={ref}>
        <PhoneInput
          country="in" // 🇮🇳 Default country
          value={formattedValue}
          onChange={(phone) => setMobileInfo(phone)}
          inputClass="!w-full !h-[52px] !border !border-gray-300 !rounded !pl-[50px]"
          buttonClass="!border !border-gray-300 !rounded-l"
          containerClass="!w-full"
          placeholder="Mobile Phone Number"
          enableSearch
          specialLabel="" // Remove default label
          inputProps={{
            name: "mobile",
            autoFocus: false,
          }}
        />
        {errors.mobileInfo && (
          <p className="text-red-500 text-sm mt-1">{errors.mobileInfo}</p>
        )}
      </div>
    );
  }
);
