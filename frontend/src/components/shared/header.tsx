import { MessageCircle } from "lucide-react";

function Header() {
  return (
    <header className="bg-transparent py-5 border-b">
      <div className="container mx-auto  flex  items-center justify-between">
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
        <div className="flex items-center gap-6">
          <div className=" px-4 py-2  bg-accent/10 size-fit rounded-full mx-auto border border-accent text-primary font-semibold font-primary flex items-center gap-2">
            <div className="bg-primary/10 size-fit p-1 rounded-full">
              <div className="p-1 bg-primary rounded-full"></div>
            </div>
            <p className="text-xs font-secondary">Connected to RMX56522</p>
          </div>
         <div className="flex items-center gap-3">
           <div>
            <p className="text-sm">Siam Hasan</p>
            <p className="text-xs text-end">+8801xxxxx</p>
          </div>
          <img className="size-10 rounded-full object-cover" src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt=""  />
         </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
