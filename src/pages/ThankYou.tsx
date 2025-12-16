import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsHeader } from "@/components/news/NewsHeader";
import { NewsFooter } from "@/components/news/NewsFooter";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewsHeader />
      
      <main className="container py-12 md:py-16 max-w-2xl flex-1 flex items-center">
        <div className="w-full">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative bg-primary/10 rounded-full p-6">
                  <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Thank You!
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Your registration has been successfully submitted.
            </p>

            {/* Description */}
            <div className="mt-8 p-6 md:p-8 bg-card border border-border rounded-lg shadow-sm">
              <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
                An official program consultant will contact you shortly to discuss your eligibility and next steps.
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Please check your email for a confirmation message and keep your phone nearby for our call.
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="h-14 text-lg font-semibold px-8"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <NewsFooter />
    </div>
  );
};

export default ThankYou;




