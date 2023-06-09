'use client'

interface seatItemProps {
    type: string,
    seatId: string,
    index: number,
    value?: string,
    selectSeat?: any,
    isBooked?: any,
    selectedSeat?: any

}

const SeatItem:React.FC<seatItemProps> = ({type,seatId,index,selectSeat,isBooked,selectedSeat,value}) => {
  return type && type === "main" ? (
    <span
      seat-id={index + 1}
      onClick={(event) => selectSeat(event)}
      className={`cursor-pointer text-[10px] text-center leading-6 align-middle text-green-500
                      border border-green-400 rounded-sm w-[25px] h-[25px] mx-1
                    ${
                      isBooked(seatId)
                        ? " booked-seat text-slate-400 "
                        : " hover:bg-green-500 hover:text-white "
                    }    
                    ${selectedSeat(seatId) ? " active-seat text-white " : ""}
                    `}
    >
      {index + 1}
    </span>
  ) : type && type === "gap" ? (
    <span seat-id={index + 1} type-id="gap" className="rounded-sm w-[25px] h-[25px]"></span>
  ) : (
    <div className="mx-4 w-4 ">
      <span seat-id={index + 1} className={`
      font-light text-gray-400
      text-sm`}>
        {value}
      </span>
    </div>
  );
}

export default SeatItem