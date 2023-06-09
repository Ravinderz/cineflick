'use client'

const BookingPageHeader = ({ obj } :any) => {
  return (
    //
    <div
      id="cine-screen"
      className={`
      bg-[#1F2833]
        h-14 
        w-[100%]
        flex justify-between
        px-8
        text-slate-100
        box-shadow-custom
      `}
    >
      <span
        className={`
            text-lg
            font-light
            mt-3
          `}
      >
        {obj.screenName}
      </span>
      <span
        className={`
                text-xs
                font-light
                mt-5
          `}
      >
        {obj.screenNumber} ({obj.screenType})
      </span>
    </div>
  );
};

export default BookingPageHeader