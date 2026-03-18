"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Calendar,
  Clock,
  Copy,
  Eye,
  History,
  MessageCircle,
  MessageSquare,
  Plus,
  QrCode,
  Send,
  Trash,
  Trash2,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export function SendNowTab() {
  return (
    <div className="bg-card card-shadow p-10 border rounded-[32px] ">
      <div className="grid grid-cols-6">
        {/* Col-1 */}
        <div className="col-span-2 flex flex-col h-full border-r border-border pr-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <Users size={22} />
              </div>
              <p className="text-lg font-semibold">Recipients</p>
            </div>

            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              3 Total
            </div>
          </div>

          {/* Add Number */}
          <div className="mt-5 space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wide">
              Add New Number
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center w-full gap-2 bg-input rounded-full pl-3 pr-2">
                <Plus size={18} />
                <input
                  type="text"
                  placeholder="Enter phone with country code..."
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>

              <Button className="px-6 py-5 rounded-full font-semibold bg-[#303139] border text-foreground">
                <Plus /> Add
              </Button>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground italic">
              <AlertCircle size={14} />
              <p>Example: +8801700000000</p>
            </div>
          </div>

          {/* Queue List */}
          <div className="mt-6 flex flex-col flex-1">
            <p className="text-xs uppercase font-bold tracking-wide">
              Queue List
            </p>

            <div className="mt-2 space-y-2 max-h-72 overflow-y-hidden pr-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-full"
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <UserRoundPlus size={16} />
                  </div>

                  <p className="text-sm font-bold flex-1 truncate">
                    +88017000000
                  </p>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-7 w-7"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2  text-destructive hover:text-destructive text-xs font-semibold"
            >
              <Trash2 size={10} />
              Remove all recipients
            </Button>
          </div>
        </div>
        {/* Col-2 */}
    <div className="col-span-4 px-10 space-y-8">
  
  {/* Header */}
  <div className="flex items-center gap-3">
    <div className="text-primary">
      <MessageSquare size={22} />
    </div>
    <p className="text-lg font-semibold">Write Message</p>
  </div>

  {/* Textarea */}
  <div className="relative">
    <Textarea
      placeholder="Type your message here..."
      className="h-72 resize-none p-4 border-none outline-none placeholder:text-foreground rounded-xl"
    />

    <div className="absolute bottom-3 left-0 w-full flex items-center justify-between px-4">
      <div className="bg-black text-xs px-3 py-1 rounded-md">
        0 CHARS
      </div>

      <Button variant="ghost" size="icon">
        <Copy />
      </Button>
    </div>
  </div>

  {/* Schedule Toggle */}
  <div className="flex items-center gap-3">
    <Checkbox className="w-5 h-5" />
    <p className="text-sm font-secondary">Set schedule</p>
  </div>

  {/* Schedule Inputs */}
  <div className="space-y-4">
    <p className="text-xs uppercase font-bold tracking-wide ">
      Delivery Schedule
    </p>

    <div className="flex gap-6">
      <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] px-5 py-3 flex items-center gap-3 rounded-full w-full">
        <Calendar size={18} />
        <p className="text-sm">2026-03-21</p>
      </div>

      <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] px-5 py-3 flex items-center gap-3 rounded-full w-full">
        <Clock size={18} />
        <p className="text-sm">10:30</p>
      </div>
    </div>
  </div>

  {/* Send Button */}
  <Button
    variant="default"
    className="w-full py-7 rounded-full text-primary-foreground button-shadow flex items-center justify-center gap-3 uppercase font-bold"
  >
    <Send size={20} />
    <span>Send Now</span>
  </Button>

  {/* Info Box */}
  <div className="bg-[#3B82F61A] border border-[#3B82F633] rounded-2xl flex gap-3 py-4 px-5">
    <div className="text-blue-300 mt-0.5">
      <AlertCircle size={16} />
    </div>
    <p className="text-xs font-secondary leading-relaxed">
      Your message will be sent sequentially to each recipient. Avoid
      sending too many identical messages in a short period to prevent
      account restrictions.
    </p>
  </div>

</div>

      </div>
    </div>
  );
}
export function ScheduleTab() {
  return <div></div>;
}

const history = [
  {
    id: 1,
    message: "Hello! Your order has been confirmed.",
    status: "sent",
    date: "2026-03-18",
    time: "10:30",
    recipients: 120,
  },
  {
    id: 2,
    message: "Reminder: Your appointment is tomorrow.",
    status: "scheduled",
    date: "2026-03-21",
    time: "09:00",
    recipients: 45,
  },
];

export  function SendHistory() {
  return (
    <div className="col-span-4 px-10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <History className="text-primary" size={22} />
        <p className="text-lg font-semibold">Send History</p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border bg-card flex flex-col gap-4 hover:shadow-md transition"
          >
            
            {/* Top Row */}
            <div className="flex justify-between items-start gap-4">
              
              {/* Message */}
              <p className="text-sm line-clamp-2 text-foreground">
                {item.message}
              </p>

              {/* Status */}
              <span
                className={`text-xs px-3 py-1 rounded-full capitalize ${
                  item.status === "sent"
                    ? "bg-green-500/10 text-green-400"
                    : item.status === "scheduled"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>{item.date}</span>
                <span>{item.time}</span>
                <span>{item.recipients} recipients</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Copy size={16} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Send size={16} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye size={16} />
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}


const tabs = [
  {
    label: "Send Message",
    icon: QrCode,
    component: SendNowTab,
  },
  // {
  //   label: "Scheduled",
  //   icon: Calendar,
  //   component: ScheduleTab,
  // },
  {
    label: "History",
    icon: Calendar,
    component: ScheduleTab,
  },
];

const services = [
  {
    title: "Multi-recipient ready",
    description: "Send to 100+ numbers at once with sequential processing.",
    icon: Users,
    color: "text-green-500",
  },

  {
    title: "Message Templates",
    description: "Save frequently used messages for faster broadcasting.",
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    title: "Connection Stable",
    description:
      "Syncing with WhatsApp Web 2.30.x. High speed delivery active.",
    icon: AlertCircle,
    color: "text-amber-500",
  },
];

function page() {
  const [active, setActive] = useState(0);
  return (
    <div className="py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Messaging Dashboard</h1>

        <p className="font-secondary text-sm w-1/2">
          Send WhatsApp messages easily to single or multiple users. Add numbers
          manually or paste a bulk list, write your message, and hit send to
          reach your audience instantly.
        </p>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-8">
          {tabs.map((tab, index) => (
            <Button
              variant="ghost"
              key={tab.label}
              className={`p-0 ${active === index ? "text-primary" : ""}`}
              onClick={() => setActive(index)}
            >
              <tab.icon size={30} /> <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-2 bg-border  relative  h-[2px]">
          <div
            className={` left-0 absolute w-32 bg-primary h-full duration-75 `}
            style={{ transform: `translateX(${active * 110}%)` }}
          ></div>
        </div>
        <div className="mt-20">
          {active === 0 ? <SendNowTab /> :active === 1 ? <SendHistory/> : <ScheduleTab />}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex gap-3 bg-[#FFFFFF0D] px-4 pt-4 pb-8 rounded-xl `}
            >
              <div
                className={` p-2 size-fit rounded-full ${index == 0 ? "bg-green-600/10 text-green-600" : index == 1 ? "bg-blue-600/10 text-blue-600" : "bg-amber-600/10 text-amber-600"}`}
              >
                <service.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">{service.title}</p>
                <p className="text-xs font-secondary mt-.5">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
