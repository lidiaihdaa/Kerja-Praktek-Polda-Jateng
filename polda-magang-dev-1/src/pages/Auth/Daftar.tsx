import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Daftar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Pendaftaran Sukses! Silakan masuk menggunakan akun barumu.");
        navigate('/auth/login'); 
      } else {
        alert("Pendaftaran Gagal: " + (result?.message || "Email mungkin sudah dipakai."));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Gagal terhubung ke server Laravel.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-xl font-semibold text-center text-gray-700">
          DAFTAR AKUN
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          {}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Username</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Konfirmasi Password</label>
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40" />
          </div>

          {}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 mt-2 text-white transition rounded-md ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7a6f6a] hover:opacity-90'
            }`}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/auth/login" className="text-biru hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Daftar;