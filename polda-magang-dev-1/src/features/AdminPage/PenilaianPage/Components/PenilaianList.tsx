import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ChevronRight, Pencil } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Divisi = {
  divisi: string;
};

const PER_PAGE = 4;

const PenilaianList = () => {

  const [data, setData] = useState<Divisi[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchDivisi = async () => {

    try {

      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        "http://127.0.0.1:8000/api/admin/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await res.json();

      if (res.ok) {

        if (Array.isArray(result.data)) {
          setData(result.data);
        }

      }

    } catch (error) {
      console.error("Gagal mengambil data divisi");
    }

  };

  useEffect(() => {
    fetchDivisi();
  }, []);

  const totalPages = Math.ceil(data.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = data.slice(start, start + PER_PAGE);

  return (

    <div className="space-y-4">

      <h2 className="text-lg font-semibold">
        Data Divisi Magang
      </h2>

      <div className="space-y-4">

        {currentData.map((item, index) => (

          <Card key={index} className="border">

            <CardContent className="p-5">

              <div className="flex items-start gap-4">

                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {item.divisi.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">

                  <h3 className="font-semibold text-sm">
                    {item.divisi}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Mahasiswa Magang
                  </p>

                </div>

                <Button
                  size="sm"
                  className="gap-2 bg-abu hover:bg-abu/90"
                  onClick={() =>
                    navigate(`/admin/penilaian/${encodeURIComponent(item.divisi)}`)
                  }
                >
                  <Pencil size={14} />
                  Edit
                </Button>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

      <div className="flex justify-center mt-6">

        <Pagination>

          <PaginationContent>

            {Array.from({ length: totalPages }).map((_, i) => (

              <PaginationItem key={i}>

                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>

              </PaginationItem>

            ))}

            <PaginationItem>

              <PaginationLink
                onClick={() =>
                  setPage((p) => Math.min(p + 1, totalPages))
                }
              >
                <ChevronRight size={16} />
              </PaginationLink>

            </PaginationItem>

          </PaginationContent>

        </Pagination>

      </div>

    </div>

  );
};

export default PenilaianList;