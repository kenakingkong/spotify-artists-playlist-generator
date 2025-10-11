import WizardLayout from "../WizardLayout";
import { useAuth } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";

export default function StepArtists() {
  const { isAuthenticated } = useAuth();

  const endpoint = isAuthenticated
    ? "/api/spotify/me/top-artists?limit=5"
    : undefined;

  // const { data, isLoading, error } = useFetch(endpoint);
  // console.log(data?.data?.items)

  return (
    <WizardLayout>
      <p>Artists</p>
      <p>Your top artists</p>
    </WizardLayout>
  );
}
