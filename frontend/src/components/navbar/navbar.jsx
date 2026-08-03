export default function Navbar({ onViewClick }) {
  return (
    <div className="sticky px-10 py-4 z-50 bg-french-blue bg-radial-[at_50%_250%] from-frost-blue/10 to-transparent backdrop-blur-md rounded-xl shadow-md flex justify-between items-center border border-light-cyan/20">
      <p className="text-white">Logo</p>
      <div className="flex flex-row space-x-7 items-center">
        <p
          onClick={() => onViewClick("login")}
          className="text-white py-2 px-4 rounded-md hover:bg-blue-green/25 transition-all duration-200 ease-out select-none"
        >
          Login
        </p>
        <p
          onClick={() => onViewClick("register")}
          className="text-white py-2 px-4 rounded-md hover:bg-blue-green/25 transition-all duration-200 ease-out select-none"
        >
          Register
        </p>
      </div>
    </div>
  );
}
