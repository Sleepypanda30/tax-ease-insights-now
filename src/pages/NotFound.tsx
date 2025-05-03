
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideNav={true}>
      <div className="min-h-full flex flex-col items-center justify-center py-12">
        <h1 className="text-5xl font-bold text-taxgray-800 mb-2">404</h1>
        <p className="text-xl text-taxgray-600 mb-8">Page not found</p>
        <p className="text-taxgray-500 mb-8 text-center max-w-xs">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="bg-taxblue hover:bg-taxblue-dark">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
