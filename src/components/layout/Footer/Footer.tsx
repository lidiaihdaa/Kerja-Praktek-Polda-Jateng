const Footer = () => {
  return (
    <footer className="mt-20 bg-white border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 mx-auto text-sm text-gray-600 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-800">POLDA JATENG</h3>
          <p>
            Media informasi magang di Polda Jateng untuk Mahasiswa/i dan Siswa/i
            SMK.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-800">Navigasi</h3>
          <ul className="space-y-1">
            <li>Halaman Utama</li>
            <li>Tentang Kami</li>
            <li>Alur Pendaftaran</li>
            <li>Proyek</li>
            <li>Kontak</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
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
