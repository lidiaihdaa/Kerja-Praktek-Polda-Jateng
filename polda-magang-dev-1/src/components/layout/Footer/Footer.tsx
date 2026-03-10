import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 bg-white border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 mx-auto text-sm text-gray-600 md:grid-cols-3">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h3 className="mb-3 font-semibold text-gray-800">POLDA JATENG</h3>
          <p>
            Media informasi magang di Polda Jateng untuk Mahasiswa/i dan Siswa/i SMK.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <h3 className="mb-3 font-semibold text-gray-800">Navigasi</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-gray-900 hover:underline">
                Halaman Utama
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900 hover:underline">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/magang" className="hover:text-gray-900 hover:underline">
                Magang
              </Link>
            </li>
            <li>
              <Link to="/proyek" className="hover:text-gray-900 hover:underline">
                Proyek
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <h3 className="mb-3 font-semibold text-gray-800">Hubungi Kami</h3>
          <p>WhatsApp: +62-123-123-1234</p>
          <p>Email: poldajateng@gmail.com</p>
          <p className="mt-2">Sosial Media</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;