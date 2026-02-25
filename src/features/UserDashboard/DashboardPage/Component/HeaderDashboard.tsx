import AboutImg from "@/assets/img/aboutimg.png";

const HeaderDashboard = () => {
  return (
    <div className="flex flex-col items-start gap-6 lg:flex-row">
      {/* LEFT */}
      <div className="flex-1">
        <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm leading-relaxed text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[360px]">
        <img
          src={AboutImg}
          alt="Dashboard"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;
