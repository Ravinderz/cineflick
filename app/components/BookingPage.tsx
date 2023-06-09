'use client'

import { useEffect, useState } from "react";
import SeatItem from "./SeatItem";
import Screen from "./Screen";
import BookingPageHeader from "./BookingPageHeader";

const BookingPage = () => {
    let arr: string[] = [];
    let [selected, setSelected] = useState(arr);
    let [booked, setBooked] = useState(["A2",'B3','B4','B5']);
    let [colLayout, setColLayout] = useState(arr);
    let [rowLayout, setRowLayout] = useState(arr);

    useEffect(() => {
        setBooked([...booked,'A3','A4']);
        generateColumnLayout();
        generateRowLayout();
        
    },[])

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const obj = {
        "screenName": "PVR Preston Prime",
        "screenNumber": "Audi 1",
        "screenType": "Dolby Atmos",
        "layout": { // layout will have different sections, which can 
                    // have different layout for rows/columns
            "rowsFormat": "2x1x2x1x2",
            "colsFormat": "3x2x8x2x2" //columns X no of columns as gaps X columns
                              // 10 columns 2 gaps 10 columns
        }
    };

    const generateRowLayout = () => {
      let rowArr = obj.layout.rowsFormat.split('x');
      let rowLayout = [];
      rowArr = [...rowArr];
      for(let j = 0; j < rowArr.length; j++){
        let value:any = rowArr[j];
        for(let i = 0; i < value; i++){
          if(j % 2 === 0){
            rowLayout.push('main');
          }else{
            rowLayout.push('gap');
          }
        }
      }

      setRowLayout([...rowLayout]);
    }

    const generateColumnLayout = () => {
      let colArr = obj.layout.colsFormat.split('x');
      let colLayout = [];
      colArr = [...colArr];
      for(let j = 0; j < colArr.length; j++){
        let value:any = colArr[j];
        for(let i = 0; i < value; i++){
          if(j % 2 === 0){
            colLayout.push('main');
          }else{
            colLayout.push('gap');
          }
        }
      }

      setColLayout([...colLayout]);
    }

    const isBooked = (seat: string): boolean => {
        return booked.includes(seat);
    }

    const selectedSeat = (seat: string): boolean => {
        return !isBooked(seat) && selected.includes(seat);
    }

    const selectSeat = (e: any) => {
      let rowId = e.target.parentNode.getAttribute("row-id");
      let seatId = e.target.getAttribute("seat-id");
      let seat = rowId + seatId;
      if (isBooked(seat)) {
        return;
      }
      if (selected.length > 0) {
        let index = selected.findIndex((elm) => elm === rowId + seatId);
        if (index !== -1) {
          let arr = selected;
          arr.splice(index, 1);
          setSelected((arr: any) => [...arr]);
        } else {
          setSelected((selected: any) => [...selected, rowId + seatId]);
        }
      } else {
        setSelected([rowId + seatId]);
      }

      console.log(rowId + seatId);
    };

    const renderSeatLayout = () => {
      let layout = [];
      let rowMainCount = 0;
      let rowGapCount = 0;
      for (let i = 0; i < rowLayout.length; i++) {
        let seatCol = [];
        let mainCount = 0;
        let gapCount = 0;
        if(rowLayout[i] === 'main'){
        for (let j = 0; j < colLayout.length; j++) {
          if (j === 0) {
            seatCol.push(
              <SeatItem
                key={"letter " + alphabets[rowMainCount] + (j + 1)}
                type={"letter"}
                seatId={"letter " + alphabets[rowMainCount] + (j + 1)}
                value={alphabets[rowMainCount]}
                index={j}
              />
            );
          }
          if(colLayout[j] === 'main'){
            seatCol.push(
              <SeatItem
                key={"main "+ alphabets[rowMainCount] + (mainCount + 1)}
                type={"main"}
                seatId={alphabets[rowMainCount] + (mainCount + 1)}
                index={mainCount}
                selectSeat={selectSeat}
                isBooked={isBooked}
                selectedSeat={selectedSeat}
              />
            );
            mainCount++;
          }else if(colLayout[j] === 'gap'){
            seatCol.push(
            <SeatItem
                key={"gap " + alphabets[rowMainCount] + (gapCount + 1)}
                type={"gap"}
                seatId={alphabets[rowMainCount] + (gapCount + 1)}
                index={gapCount}
              />
            );
            gapCount++;
          }
        }
          layout.push(
            <div key={"rowMain "+alphabets[rowMainCount]} row-id={alphabets[rowMainCount]} className="flex my-2">
              {seatCol}
            </div>
          );
          rowMainCount++;
        }
        else if(rowLayout[i] === 'gap'){
          seatCol.push(
            <SeatItem
                key={"gap " + alphabets[rowGapCount] + (gapCount + 1)}
                type={"gap"}
                seatId={alphabets[rowGapCount] + (gapCount + 1)}
                index={gapCount}
              />
            );
            layout.push(
              <div key={"rowGap "+alphabets[rowGapCount]} row-id={alphabets[i]} className="flex my-2">
                {seatCol}
              </div>
            );
            rowGapCount++;
        }
        
      }
      return layout;
    }

    return (
      <div>
        <BookingPageHeader obj={obj} />
        <div className="bg-slate-50 py-12 grid">
          <Screen />
          <div className="justify-self-center">{renderSeatLayout()}</div>
        </div>
      </div>
    );
}

export default BookingPage