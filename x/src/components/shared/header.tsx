import { MessageCircle } from "lucide-react";


function Header() {
  return (
    <header className="bg-transparent py-5 border-b">
      <div className="container mx-auto  flex justify-between">
       <div className="flex items-center gap-4">
         <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-full">
            <MessageCircle size={25} />
          </div>
          <h1 className="text-primary text-2xl font-semibold">WaSend</h1>
        </div>
        <div className="border-l-2 h-full"></div>
        <p className=" font-secondary text-sm">
          Connect your WhatsApp account
        </p>
       </div>
      </div>
    </header>
  );
}

export default Header;
