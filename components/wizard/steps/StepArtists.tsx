import { useEffect } from "react";
import WizardLayout from "../WizardLayout";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function StepArtists() {
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchTopArtists() {
      try {
        const response = await axios.get("/api/spotify/me/top-artists?limit=5");
        if (!isMounted) return;

        console.log(response.data);
      } catch (err) {
        if (!isMounted) return;

        console.error(err);
      }
    }

    // if (user) fetchTopArtists();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <WizardLayout>
      <p>Artists</p>
      <p>Your top artists</p>
    </WizardLayout>
  );
}
