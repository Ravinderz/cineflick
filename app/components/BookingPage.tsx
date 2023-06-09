'use client'

import { useEffect, useState } from "react";

const BookingPage = () => {
    let arr: string[] = [];
    let [selected, setSelected] = useState(arr);
    let [booked, setBooked] = useState(["A2",'B3','B4','B5']);

    useEffect(() => {
        setBooked([...booked,'A3','A4']);
    },[])

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const obj = {
        "screenName": "Preston Prime",
        "screenNumber": "Audi 1",
        "screenType": "Dolby Atmos",
        "layout": {
            "rows": 15,
            "seatsPerRow": 29,
            "cols": "2#2#11#2#2"
        }
    };

    const isBooked = (seat: string): boolean => {
        return booked.includes(seat);
    }

    const selectedSeat = (seat: string): boolean => {
        return !isBooked(seat) && selected.includes(seat);
    }

    const selectSeat = (e: any) => {

        let rowId = e.target.parentNode.getAttribute("row-id");
        let seatId = e.target.getAttribute("seat-id");
        let seat = (rowId + seatId);
        if(isBooked(seat)){
            return;
        }
        if (selected.length > 0) {
            let index = selected.findIndex(elm => elm === (rowId+seatId));
            if(index !== -1){
                let arr = selected;
                arr.splice(index,1);
                setSelected((arr: any) => [...arr]);
            }else{
                    setSelected((selected: any) => [...selected, (rowId + seatId)]);
            }
        } else {
                setSelected([(rowId + seatId)]);
        }

        console.log(rowId + seatId);
    }

    const renderSeatLayout = () => {

        let layout = [];
        let cols = obj.layout.cols.split("#");
        for (let i = 0; i < obj.layout.rows; i++) {
            let seatCol = [];
            for (let j = 0; j < obj.layout.seatsPerRow; j++) {
                if (j === 0) {
                    seatCol.push(
                        <div key={alphabets[i]} className="mx-4  w-4">
                            <span seat-id={j + 1} className="font-medium">{alphabets[i]}</span>
                        </div>)
                }
                seatCol.push(<span key={alphabets[i] + j + 1} seat-id={j + 1} onClick={(event) => selectSeat(event)}
                    className={`cursor-pointer text-[10px] text-center leading-6 align-middle text-green-500
                      border border-green-400 rounded-sm w-[25px] h-[25px] mx-1
                    ${isBooked(alphabets[i] + (j + 1)) ? ' booked-seat text-slate-400 ' : ' hover:bg-green-500 hover:text-white '}    
                    ${selectedSeat(alphabets[i] + (j + 1)) ? ' active-seat text-white ' : ''}
                    `}>
                    {(j + 1)}
                </span>)
            }
            layout.push(<div key={alphabets[i]} row-id={alphabets[i]} className="flex my-2">
                {seatCol}
            </div>);
        }
        return layout;
    }

    return (
        <div>
            <div id="cine-screen" className="bg-violet-400 flex justify-evenly">
                <span>{obj.screenName}</span>
                <span>{obj.screenNumber}({obj.screenType})</span>
            </div>
            <div className="text-center">
                <span className="text-lg">
                    SCREEN
                </span>
            </div>
            <div className="bg-slate-100 py-12 flex justify-center">
                <div>
                    {renderSeatLayout()}
                </div>
            </div>
        </div>
    )
}

export default BookingPage