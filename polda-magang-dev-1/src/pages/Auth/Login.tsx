import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-xl font-semibold text-center text-gray-700">
          LOGIN
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-biru/40"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 text-white transition rounded-md bg-[#7a6f6a] hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <Link to="/auth/daftar" className="text-biru hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
