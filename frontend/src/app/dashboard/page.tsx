"use client";
import HistoryDialog from "@/components/custom_ui/history-dialog";
import Pagination from "@/components/custom_ui/pagination";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronDownIcon,
  Clock,
  Copy,
  Eye,
  History,
  MessageCircle,
  MessageSquare,
  Plus,
  QrCode,
  Send,
  Trash2,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    label: "Send Message",
    icon: QrCode,
  },
  {
    label: "History",
    icon: CalendarIcon,
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

export function SendNowTab() {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [numberValue, setNumberValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [numbers, setNumbers] = useState<string[]>([]);
  const [setSchedule, setSetSchedule] = useState(false);

  const regx = new RegExp(
    "^\\+?[0-9]{1,4}?[-.\\s]?\\(?[0-9]{1,4}?\\)?([-.\\s]?[0-9]{1,4}){1,3}$",
  );

  const addNumber = (number: string) => {
    if (!regx.test(number)) return;
    setNumbers((p) => [...p, number.replace("+", "")]);
  };
  const removeNumber = (number: string) =>
    setNumbers((p) => p.filter((i) => i !== number));

  const isReady =
    numbers.length > 0 && messageValue && (setSchedule ? !!date : true);

  return (
    <div className="bg-card card-shadow p-6 sm:p-8 lg:p-10 border rounded-[32px]">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Col-1: Recipients */}
        <div className="col-span-1 lg:col-span-2 flex flex-col h-full border-b lg:border-b-0 lg:border-r border-border lg:pr-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <Users size={22} />
              </div>
              <p className="text-lg font-semibold">Recipients</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              {numbers.length} Total
            </div>
          </div>

          {/* Add Number */}
          <div className="mt-5 space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wide">
              Add New Number
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center w-full gap-2 bg-input rounded-full pl-3 pr-2">
                <Plus size={18} />
                <input
                  type="text"
                  placeholder="Enter phone with country code..."
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  value={numberValue}
                  onChange={(e) => setNumberValue(e.target.value)}
                />
              </div>

              <Button
                disabled={numberValue.length === 0}
                onClick={() => {
                  addNumber(numberValue);
                  setNumberValue("");
                }}
                className="px-6 py-3 md:py-5 rounded-full font-semibold bg-[#303139] border text-foreground w-full sm:w-auto flex items-center justify-center gap-2"
              >
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
            <div className="mt-2 space-y-2 max-h-64 sm:max-h-80 overflow-y-auto pr-1 font-secondary">
              {numbers.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-full"
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <UserRoundPlus size={16} />
                  </div>
                  <p className="text-sm font-bold flex-1 truncate">+{_}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-7 w-7"
                    onClick={() => removeNumber(_)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-10 pt-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:text-foreground text-xs font-semibold text-muted-foreground"
            >
              <Trash2 size={10} />
              <p>Remove all recipients</p>
            </Button>
          </div>
        </div>

        {/* Col-2: Message */}
        <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6 px-0 sm:px-4 md:px-6 lg:px-10">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <MessageSquare size={22} />
            </div>
            <p className="text-lg font-semibold">Write Message</p>
          </div>

          {/* Textarea */}
          <div className="relative w-full">
            <Textarea
              placeholder="Type your message here..."
              className="w-full h-64 sm:h-72 resize-none p-4 border-none outline-none placeholder:text-foreground rounded-xl ring-accent"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
            <div className="absolute bottom-3 left-0 w-full flex items-center justify-between px-4">
              <div className="bg-black text-xs px-3 py-1 rounded-md">
                {messageValue.length} CHARS
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
            <p className="text-xs uppercase font-bold tracking-wide">
              Delivery Schedule
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] px-5 py-3 flex items-center gap-3 rounded-full overflow-hidden">
                <div>
                  <CalendarIcon size={18} />
                </div>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Pick a date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        setOpenDate(false);
                      }}
                      startMonth={new Date()}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] px-5 py-3 flex items-center gap-3 rounded-full">
                <div>
                  <Clock size={18} />
                </div>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="06:30:00"
                  className="
    bg-background
    border-none
    outline-none
    ring-0
    focus:ring-0
    focus:outline-none
    focus-visible:ring-0
    focus-visible:outline-none
    shadow-none
    appearance-none
    [&::-webkit-calendar-picker-indicator]:hidden
    [&::-webkit-calendar-picker-indicator]:appearance-none
  "
                />
              </div>
            </div>
          </div>

          {/* Send Button */}
          <Button
            variant="default"
            className="w-full py-6 sm:py-7 rounded-full text-primary-foreground button-shadow flex items-center justify-center gap-3 uppercase font-bold"
            disabled={!isReady}
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

export function SendHistory() {
  return (
    <div className="bg-card card-shadow p-10 border rounded-[32px] ">
      {/* Header */}
      <div className="flex items-center gap-3">
        <History className="text-primary" size={22} />
        <p className="text-xl font-semibold">Send History</p>
      </div>

      {/* List */}
      <div className="mt-5 space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="group p-5 rounded-2xl border bg-card flex flex-col gap-4 transition-all hover:shadow-lg hover:border-primary/30"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start gap-4">
              {/* Message */}
              <div className="flex-1">
                <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                  {item.message}
                </p>

                <p className="text-[11px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition">
                  Click to view full message
                </p>
              </div>

              {/* Status */}
              <span
                className={`text-[11px] px-3 py-1 rounded-full capitalize font-medium whitespace-nowrap border
      ${
        item.status === "sent"
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : item.status === "scheduled"
            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            : "bg-red-500/10 text-red-400 border-red-500/20"
      }`}
              >
                {item.status}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Bottom Row */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              {/* Meta Info */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon size={14} />
                  {item.date}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {item.time}
                </span>

                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {item.recipients}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <Button size="icon" variant="ghost" className="hover:bg-muted">
                  <Copy size={16} />
                </Button>

                <Button size="icon" variant="ghost" className="hover:bg-muted">
                  <Send size={16} />
                </Button>

                <Button size="icon" variant="ghost" className="hover:bg-muted">
                  <Eye size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HistoryDialog
        messageItem={{
          id: "6",
          message:
            "System maintenance alert: The platform will be down for maintenance from 02:00 AM to 04:00 AM. Please plan accordingly.",
          status: "scheduled",
          date: "2026-03-19",
          time: "02:00 AM",
          recipients: 20,
        }}
        open={false}
        onClose={() => {}}
      />
      <div className="mt-6">
        <Pagination total={30} limit={4} current={1} />
      </div>
    </div>
  );
}

function page() {
  const [active, setActive] = useState(0);
  return (
    <div className="py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Messaging Dashboard</h1>

        <p className="font-secondary text-sm lg:w-1/2">
          Send WhatsApp messages easily to single or multiple users. Add numbers
          manually or paste a bulk list, write your message, and hit send to
          reach your audience instantly.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
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
        <div className="mt-14">
          {active === 0 ? (
            <SendNowTab />
          ) : active === 1 ? (
            <SendHistory />
          ) : null}
        </div>

        <div className=" mt-8 md:mt-10 grid-cols-2 grid lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col lg:flex-row gap-3 bg-[#FFFFFF0D] px-4 pt-4 pb-8 rounded-xl `}
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
