
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-dark text-white">
      <div className="text-center p-8 max-w-md">
        <Headphones className="h-24 w-24 text-spotify mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! This track doesn't exist</p>
        <p className="text-zinc-400 mb-8">
          The page you're looking for can't be found. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button className="bg-spotify hover:bg-spotify/80 text-white font-medium">
            Return to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
