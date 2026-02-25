import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataDiriTab from "./Component/DataDiriTab";
import DataKampusTab from "./Component/DataKampusTab";
import DataMagangTab from "./Component/DataMagang";

const PendaftaranPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white border rounded-md shadow border-abu">
        <div className="p-6 border-b border-abu">
          <h1 className="text-2xl font-semibold">Pendaftaran</h1>
        </div>

        <div className="p-6">
          <Tabs defaultValue="data-diri" className="w-full">
            <TabsList>
              <TabsTrigger value="data-diri">DATA DIRI</TabsTrigger>
              <TabsTrigger value="data-kampus">DATA KAMPUS</TabsTrigger>
              <TabsTrigger value="data-magang">DATA MAGANG</TabsTrigger>
            </TabsList>

            <TabsContent value="data-diri">
              <DataDiriTab />
            </TabsContent>

            <TabsContent value="data-kampus">
              <DataKampusTab />
            </TabsContent>

            <TabsContent value="data-magang">
              <DataMagangTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PendaftaranPage;
