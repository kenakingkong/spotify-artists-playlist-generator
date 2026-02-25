import SignInButton from "@/components/auth/SignInButton";
import Creator from "@/components/creator";
import Gallery from "@/components/gallery";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Creator />;

  return (
    <div className="space-y-4">
      <div className="min-h-40 sm:min-h-32 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-center gap-4 p-4">
        <div className="space-y-1">
          <p className="text-sm font-bold">Create a setlist</p>
          <p className="text-xs">
            Select your favorite artists and generate a playlist of each of
            their top 10 tracks.
          </p>
        </div>
        <SignInButton />
      </div>
      <Gallery />
    </div>
  );
}
