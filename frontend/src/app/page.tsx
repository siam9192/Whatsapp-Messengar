import { AlertTriangle } from "lucide-react";

export default function Home() {
  const scanInstructions = [
    "Open WhatsApp on your phone",
    "Tap Menu or Settings and select Linked Devices",
    "Point your phone to this screen to capture the code",
  ];
  return (
    <div>
      <div className="max-w-md min-h-160 mx-auto bg-card border-[#FFFFFF1A] p-8  border mt-10 rounded-[32px] card-shadow relative overflow-hidden">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-center">Connect WhatsApp</p>
          <p className="text-sm  text-center font-secondary">
            Scan the QR code to link your account to WaSend
          </p>
        </div>

        <img
          className="mt-10 mx-auto rounded-lg  w-1/2"
          src="https://ar-code.com/images/AI-Code-try-on-shoes.webp"
          alt=""
        />
        <div className="mt-5 px-4 py-2 bg-accent/10 w-fit rounded-full mx-auto border border-accent text-primary font-semibold flex items-center gap-2">
          {/* Animated Indicator */}
          <div className="relative flex items-center justify-center">
            {/* Ripple */}
            <span className="absolute inline-flex h-5 w-5 rounded-full bg-primary/20 animate-ping"></span>

            {/* Inner Dot */}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
          </div>

          {/* Text */}
          <p className="text-xs text-muted-foreground animate-pulse">
            Waiting for Scan...
          </p>
        </div>

        <hr className="mt-10" />
        <div className="mt-5 space-y-2">
          {scanInstructions.map((i, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-surface flex justify-center items-center  border border-[#FFFFFF0D] text-xs">
                {index + 1}
              </div>
              <p className="font-secondary text-xs font-medium">{i}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 px-4 py-2  bg-primary/5 size-fit rounded-full mx-auto border border-accent text-primary font-semibold font-primary flex items-center ml-6 gap-2 opacity-60 scale-90">
          <AlertTriangle size={18} />

          <p className="text-xs font-secondary">Keep your phone screen on</p>
        </div>

        {/* Radial bg */}
        <div className="rectangle w-60 h-60  -top-50  left-0  translate-x-[50%]-translate-x-[50%]" />
      </div>
    </div>
  );
}
