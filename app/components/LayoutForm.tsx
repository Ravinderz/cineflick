import { useState } from "react";

const LayoutForm = (props:any) => {

const [layoutData,setLayoutData] = useState({
    sectionName: '',
    rowsFormat:'',
    colsFormat:''
});

const handleSubmit = (event:any) => {
    event.preventDefault();
    props.setFormData(layoutData);
}

const handleInputChange = (event:any) => {
    const {name, value} = event.target;
    setLayoutData({...layoutData,[name]:value})
}

    return (
        <div>
    <form onSubmit={handleSubmit}>
        <label className={`block mb-2`}>
            <span className={`text-gray-500`}>Section Name</span>
        <input 
            type="text"
            name="sectionName"
            className={`
            mt-1 p-2 border border-gray-300 w-full
            rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:border-transparent
            `}
            value={layoutData.sectionName}
            onChange={handleInputChange}
        />
        </label>
        <label className={`block mb-2`}>
        <span className={`text-gray-500`}>rows format </span>
        <input 
            type="text"
            name="rowsFormat"
            className={`
            mt-1 p-2 border border-gray-300 w-full
            rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:border-transparent
            `}
            value={layoutData.rowsFormat}
            onChange={handleInputChange}
        />
        </label>
        <label className={`block mb-2`}>
        <span className={`text-gray-500`}>column format</span>
        <input 
            type="text"
            name="colsFormat"
            className={`
            mt-1 p-2 border border-gray-300 w-full
            rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:border-transparent
            `}
            value={layoutData.colsFormat}
            onChange={handleInputChange}
        />
        </label>
        <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 
        text-white font-bold w-full py-2 px-4 my-6 rounded`}
      >
        Submit
      </button>
    </form>
    </div>
  )
}

export default LayoutForm