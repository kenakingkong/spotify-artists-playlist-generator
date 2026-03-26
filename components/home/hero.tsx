import SignInButton from "../auth/SignInButton";

export default function Hero({ isAuthenticated = false }) {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-[10px] lg:px-0 py-[50px] flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-[40px]">
      <div className="space-y-[20px] max-w-[500px]">
        <h1 className="text-7xl lg:text-8xl font-black">
          <span className="block">CREATE A</span>
          <span className="block font-outline">SETLIST</span>
        </h1>
        <p className="text-lg lg:text-xl font-mono">
          Pick your <b>favorite artists</b>. We’ll pull their top 10 tracks and build the playlist for you.
        </p>
      </div>
      {isAuthenticated ? (
        <div>
          <a href="/" className="button button-pink">Create a setlist ➡️</a>
        </div>
      ) : (
        <div className="space-y-[10px]">
          <SignInButton />
          <p className="text-sm text-center text-app-black/50">
            Sign in to start creating
          </p>
        </div>
      )}
    </div>
  )
}