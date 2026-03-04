import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Mahasiswa {
  id:number
  universitas:string
  jurusan:string
  user:{
    name:string
  }
}

interface Props{
  data:Mahasiswa[]
}

const RecentStudents = ({data}:Props)=>{

return(
<Card className="h-fit">

<CardHeader>
<CardTitle className="text-sm font-semibold">
Mahasiswa Magang Baru
</CardTitle>
</CardHeader>

<CardContent className="space-y-4">

{data.length===0?(
<p className="text-sm text-gray-500">
Belum ada mahasiswa
</p>
):(

data.map((mhs)=>(
<div key={mhs.id} className="flex items-center gap-3">

<div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
{mhs.user?.name?.charAt(0)}
</div>

<div>
<p className="text-sm font-medium">
{mhs.user?.name}
</p>

<p className="text-xs text-gray-500">
{mhs.universitas} - {mhs.jurusan}
</p>
</div>

</div>
))

)}

</CardContent>

</Card>
)
}

export default RecentStudents