import {
  Lightbulb,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    text: "Mendapatkan pengalaman kerja langsung di lingkungan profesional.",
  },
  {
    icon: Users,
    text: "Mengembangkan kemampuan komunikasi dan kerja tim.",
  },
  {
    icon: Building2,
    text: "Mengenal sistem dan budaya kerja instansi pemerintahan.",
  },
  {
    icon: Briefcase,
    text: "Meningkatkan kesiapan menghadapi dunia kerja nyata.",
  },
  {
    icon: GraduationCap,
    text: "Mengaplikasikan ilmu yang diperoleh selama perkuliahan.",
  },
  {
    icon: ShieldCheck,
    text: "Membangun relasi dan jaringan profesional yang lebih luas.",
  },
];

const Benefit = () => {
  return (
    <section className="py-16 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Title */}
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Benefit
        </h2>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-lg bg-[#D9D9D9] text-black shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-md">
                  <Icon size={26} />
                </div>

                <p className="text-sm leading-relaxed md:text-base">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefit;
