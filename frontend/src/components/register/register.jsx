export default function Register() {
  return (
    <div className="mt-10">
      <p className="text-white/80">Start Now</p>
      <p className="mt-3 text-white text-3xl">Create a new account.</p>
      <div class="w-full max-w-sm min-w-[200px] mt-5">
        <label htmlFor="Name" className="text-slate-200">
          Name
        </label>
        <input
          class="w-full bg-french-blue placeholder:text-white/70 text-white text-sm rounded-xl px-3 py-4 mt-2 focus:text-white"
          placeholder="John Doe"
        />
      </div>
      <div class="w-full max-w-sm min-w-[200px] mt-5">
        <label htmlFor="Name" className="text-slate-200">
          Email
        </label>
        <input
          class="w-full bg-french-blue placeholder:text-white/70 text-white text-sm rounded-xl px-3 py-4 mt-2 focus:text-white"
          placeholder="John@example.com"
        />
      </div>
      <div class="w-full max-w-sm min-w-[200px] mt-5">
        <label htmlFor="Name" className="text-slate-200">
          Password
        </label>
        <input
          class="w-full bg-french-blue placeholder:text-white/70 text-white text-sm rounded-xl px-3 py-4 mt-2 focus:text-white"
          placeholder="example123"
        />
      </div>
      <div className="mt-5 w-full max-w-sm bg-french-blue rounded-xl px-3 py-4 flex justify-center">
        <button className="text-white">Submit</button>
      </div>
    </div>
  );
}
