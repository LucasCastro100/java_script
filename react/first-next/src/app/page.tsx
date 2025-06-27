import Person from "./components/Person";

const Page = () => {
  return (
    <div className="bg-slate-300">
      <p className="text-xl font-semibold text-gray-800">Home</p>
      <Person name="Lucas" />
    </div>
  );
}

export default Page;