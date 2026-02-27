
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";

const ProfileTable = () => {
  return (
    <div className="bg-white border shadow rounded-xl border-abu">
      {/* HEADER */}
      <div className="flex items-center gap-6 p-6 bg-abu rounded-t-xl">
        <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        </div>

        <div className="text-white">
          <h2 className="text-xl font-semibold">Siti Aisyah</h2>
          <p className="text-sm opacity-90">
            Universitas Dian Nuswantoro - Teknik Informatika
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="border rounded-md">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-40 font-medium">Nama Lengkap</TableCell>
                <TableCell>
                  <Input defaultValue="Siti Aisyah" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>
                  <Input defaultValue="sitiaisyah@gmail.com" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">No. HP Aktif</TableCell>
                <TableCell>
                  <Input defaultValue="+62-123-123-1234" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Universitas</TableCell>
                <TableCell>
                  <Input defaultValue="Universitas Dian Nuswantoro" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Jurusan</TableCell>
                <TableCell>
                  <Input defaultValue="Teknik Informatika" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Fakultas</TableCell>
                <TableCell>
                  <Input defaultValue="Fakultas Ilmu Komputer" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-end p-4">
            <Button className="text-white bg-biru hover:bg-biru/90">
              UPDATE
            </Button>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="mb-4 font-semibold">Berkas Anda</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="text-abu" />
              <Input type="file" />
            </div>

            <div className="flex items-center gap-3">
              <FileText className="text-abu" />
              <Input type="file" />
            </div>

            <div className="flex items-center gap-3">
              <FileText className="text-abu" />
              <Input type="file" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="text-white bg-biru hover:bg-biru/90">
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
