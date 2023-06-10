'use client'

import LayoutForm from "./LayoutForm"

const Sidebar = (props: any) => {

    const setFormData = (data:any) => {
        props.setLayoutData({...data})
    }

  return (
    <div className={` bg-slate-50 
    w-[25%] 
    p-3 
    border-r-2`}>
        <LayoutForm setFormData={setFormData}/>
    </div>
  )
}

export default Sidebar