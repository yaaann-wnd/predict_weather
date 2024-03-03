import DisplayResult from "@/components/DisplayResult";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-6 items-start">
        <div className="text-center">
          <h4 className="text-5xl font-bold">Weather Prediction</h4>
          <p className="text-gray-500 text-lg font-medium">Developed by Kelompok Dedinda</p>
        </div>
        <DisplayResult />
      </div>
    </div>
  );
}
