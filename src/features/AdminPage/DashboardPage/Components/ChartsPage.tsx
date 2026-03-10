import { useEffect, useState } from "react";
import DashboardChart from "./DashboardChart";
import PredikatChart from "./PredikatChart";
import RecentStudents from "./RecentStudents";
import Map from "../../AnalyticPage/Components/Map";

interface Mahasiswa {
  id:number
  universitas:string
  jurusan:string
  user:{
    name:string
  }
}

interface ChartItem{
  bulan:string
  jumlah:number
}

const ChartsPage = ()=>{

const [recent,setRecent] = useState<Mahasiswa[]>([])
const [chart,setChart] = useState<ChartItem[]>([])

const fetchDashboard = async()=>{

const token = localStorage.getItem("auth_token")

const res = await fetch(
"http://127.0.0.1:8000/api/admin/dashboard",
{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/json"
}
})

const result = await res.json()

if(res.ok){
setRecent(result.recent_students || [])
setChart(result.charts || [])
}

}

useEffect(()=>{
fetchDashboard()
},[])

return(

<div className="space-y-6">

<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

<div className="lg:col-span-2">
<DashboardChart data={chart}/>
</div>

<RecentStudents data={recent}/>

</div>

<PredikatChart/>

<Map/>

</div>

)

}

export default ChartsPage