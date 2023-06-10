'use client'

import { useEffect, useState } from "react";
import SeatItem from "./SeatItem";
import Screen from "./Screen";
import BookingPageHeader from "./BookingPageHeader";
import Sidebar from "./Sidebar";

//rows X gaps X rows // we can add more rows and gaps seperated by x
// cols x gaps x cols
// for one special layout we can also use the below format
// cols x gaps x (cols - no of rows that needs to be blank in this cols)
// eg : 4x2x(4-2) this would render, 4 cols, 2 gaps and 4 cols with first two rows being empty  
// eg : 4-2:5x1x6x1x4 this 4-2:5 this format will render empty seats
// from 2nd row till 5th row and then show normal bookable seats

//TODO :: should be able to render normal seat along with missing seats in a particular row after gap

export interface LayoutData {
  rowsFormat?: string, 
  colsFormat?: string 
                      }

const BookingPage = () => {
    let arr: string[] = [];
    let [selected, setSelected] = useState(arr);
    let [booked, setBooked] = useState(["A2",'B3','B4','B5']);
    let [colLayout, setColLayout] = useState(arr);
    let [rowLayout, setRowLayout] = useState(arr);
    let [layoutData,setLayoutData] = useState<LayoutData>({});

    useEffect(() => {
        setBooked([...booked,'A3','A4']);
        generateColumnLayout();
        generateRowLayout();
        renderSeatLayout()
    },[layoutData])

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const obj = {
        "screenName": "PVR Preston Prime",
        "screenNumber": "Audi 1",
        "screenType": "Dolby Atmos",
    };

    const setLayoutFormData = (data: any) => {
      setLayoutData({...data})
    }


    const generateRowLayout = () => {
      if(!layoutData || !layoutData.rowsFormat){
        return;
      }
      let rowArr = layoutData.rowsFormat.split('x');
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
      if (!layoutData || !layoutData.colsFormat) {
        return;
      }
      let colArr = layoutData.colsFormat.split("x");
      let colLayout = [];
      colArr = [...colArr];
      
      let negativeArr = [];
      for (let j = 0; j < colArr.length; j++) {
        let count: any = colArr[j];
        let gapRow;
        if (count.includes("-")) {
          count = count.replace("(", '').replace(")", '');
          negativeArr = count.split("-");
          count = negativeArr[0];
          gapRow = negativeArr[1];

        }
        for (let i = 0; i < count; i++) {
          if (gapRow){
            if(gapRow.includes(':') &&
            (gapRow.split(':')[1] - gapRow.split(':')[0]) > 0) {
              colLayout.push(`gap-${gapRow}`);
            }else if(gapRow > 0){
              colLayout.push(`gap-${gapRow}`);
            }
          } else {
            if (j % 2 === 0) {
              colLayout.push("main");
            } else {
              colLayout.push("gap");
            }
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

    const getNormalSeatItem = (rowMainCount: any,mainCount:any) => {
      return <SeatItem
      key={"main "+ alphabets[rowMainCount] + (mainCount + 1)}
      type={"main"}
      seatId={alphabets[rowMainCount] + (mainCount + 1)}
      index={mainCount}
      selectSeat={selectSeat}
      isBooked={isBooked}
      selectedSeat={selectedSeat}
    />
    }

    const getAplhabetSeatItem = (rowMainCount:any,j:any) => {
      return <SeatItem
      key={"letter " + alphabets[rowMainCount] + (j + 1)}
      type={"letter"}
      seatId={"letter " + alphabets[rowMainCount] + (j + 1)}
      value={alphabets[rowMainCount]}
      index={j}
    />
    }

    const getEmptySeatItem = (rowMainCount: any,gapCount:any) => {
      
      return <SeatItem
                key={"gap " + alphabets[rowMainCount] + (gapCount + 1)}
                type={"gap"}
                seatId={alphabets[rowMainCount] + (gapCount + 1)}
                index={gapCount}
              />
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
        if (rowLayout[i] === "main") {
          for (let j = 0; j < colLayout.length; j++) {
            if (j === 0) {
              seatCol.push(getAplhabetSeatItem(rowMainCount, j));
            }
            if (colLayout[j] === "main") {
              seatCol.push(getNormalSeatItem(rowMainCount, mainCount));
              mainCount++;
            } else if (colLayout[j] === "gap") {
              seatCol.push(getEmptySeatItem(rowMainCount, gapCount));
              gapCount++;
            } else if (colLayout[j].includes("gap-")) {
              let val = colLayout[j].split("-")[1];
              if(val.includes(':')){
                let splitVal = val.split(':');
                if(parseInt(splitVal[0]) <= rowMainCount
                 && parseInt(splitVal[1]) > rowMainCount){
                  seatCol.push(getEmptySeatItem(rowMainCount, gapCount));
                  gapCount++;
                 } else {
                  seatCol.push(getNormalSeatItem(rowMainCount, mainCount));
                  mainCount++;
                }
              }
              else if (parseInt(val) > rowMainCount) {
                seatCol.push(getEmptySeatItem(rowMainCount, gapCount));
                gapCount++;
              } else {
                seatCol.push(getNormalSeatItem(rowMainCount, mainCount));
                mainCount++;
              }
            }
          }
          layout.push(
            <div
              key={"rowMain " + alphabets[rowMainCount]}
              row-id={alphabets[rowMainCount]}
              className="flex my-2"
            >
              {seatCol}
            </div>
          );
          rowMainCount++;
        } else if (rowLayout[i] === "gap") {
          seatCol.push(getEmptySeatItem(rowGapCount, gapCount));
          layout.push(
            <div
              key={"rowGap " + alphabets[rowGapCount]}
              row-id={alphabets[i]}
              className="flex my-2"
            >
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
        <div className={`flex`}>
          <Sidebar setLayoutData={setLayoutFormData} />
          <div className="bg-slate-50 py-12 grid w-full overflow-x-scroll">
            <Screen />
            <div className="justify-self-center px-8">
              {
                renderSeatLayout()
              }
            </div>
          </div>
        </div>
      </div>
    );
}

export default BookingPage