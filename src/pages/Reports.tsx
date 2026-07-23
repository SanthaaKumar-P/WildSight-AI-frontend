import { useEffect, useState } from "react";

import {
    FileText,
    Download,
    Calendar,
    User,
    Trash2,
    CheckCircle,
    Clock
} from "lucide-react";

import {
    getReports,
    deleteReport
} from "../services/reportService";



function Reports(){


const [reports,setReports]=useState<any[]>([]);



useEffect(()=>{

loadReports();

},[]);



const loadReports=async()=>{

try{

const data=await getReports();

setReports(data);

}

catch(error){

console.log(error);

}

};




const removeReport=async(id:number)=>{

await deleteReport(id);

loadReports();

};




return (

<div className="
p-8
space-y-10
bg-[#f7faf7]
min-h-screen
">



{/* HEADER */}


<div className="
flex
justify-between
items-center
">


<div>

<h1 className="
text-4xl
font-bold
text-gray-900
">

Wildlife Reports 📄

</h1>


<p className="
text-gray-500
mt-2
">

Generate and manage wildlife survey reports

</p>


</div>



<button
className="
flex
items-center
gap-2
bg-green-600
text-white
px-5
py-3
rounded-xl
shadow
hover:bg-green-700
"
>


<FileText size={18}/>

Generate Report

</button>



</div>







{/* SUMMARY CARDS */}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">


<Card

title="Total Reports"

value={reports.length}

icon={<FileText/>}

color="bg-green-600"

/>


<Card

title="Ready Reports"

value={
reports.filter(
r=>r.reportStatus==="READY"
).length
}

icon={<CheckCircle/>}

color="bg-blue-600"

/>



<Card

title="PDF Reports"

value={
reports.filter(
r=>r.reportType==="PDF"
).length
}

icon={<Download/>}

color="bg-purple-600"

/>



</div>







{/* REPORT LIST */}



<div className="
space-y-5
">



<h2 className="
text-2xl
font-bold
">

Recent Reports

</h2>



{

reports.map((report)=>(


<div

key={report.reportId}

className="
bg-white
rounded-2xl
shadow-sm
border
p-6
flex
justify-between
items-center
"

>



<div className="flex gap-5 items-center">


<div
className="
p-4
rounded-xl
bg-green-100
text-green-700
"
>

<FileText/>

</div>




<div>


<h3 className="
text-xl
font-bold
">

{report.reportTitle}

</h3>



<div className="
flex
gap-5
text-sm
text-gray-500
mt-2
">


<span className="flex gap-1 items-center">

<Calendar size={15}/>

{
new Date(report.generatedAt)
.toLocaleDateString()
}

</span>




<span className="flex gap-1 items-center">

<User size={15}/>

{report.generatedByName}

</span>



</div>



</div>


</div>







<div className="flex items-center gap-4">


<span
className="
px-4
py-2
rounded-full
bg-green-100
text-green-700
font-semibold
text-sm
"
>

{report.reportStatus}

</span>




<button
className="
p-3
rounded-xl
bg-blue-100
text-blue-700
hover:bg-blue-200
"
>

<Download size={18}/>

</button>




<button

onClick={()=>removeReport(report.reportId)}

className="
p-3
rounded-xl
bg-red-100
text-red-600
hover:bg-red-200
"

>

<Trash2 size={18}/>

</button>


</div>



</div>


))

}



</div>





</div>

);


}




function Card(
{
title,
value,
icon,
color
}:any
){


return (

<div className="
bg-white
rounded-2xl
shadow-sm
border
p-6
flex
items-center
gap-5
">


<div
className={`
${color}
text-white
p-4
rounded-xl
`}
>

{icon}

</div>



<div>

<p className="
text-gray-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
">

{value}

</h2>


</div>


</div>


);

}



export default Reports;