"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Airplay,
  Plane,
  CalendarDays,
  Download,
  FileText,
  Heart,
  History,
  MapPin,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

// --------- Mock helpers ---------
const currency = (n:number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

type Guest = { id: string; name: string; email?: string; avatar?: string; rsvp: "yes"|"no"|"maybe" };
type Expense = { id: string; label: string; amount: number; paidBy: string; splitWith: string[] };
type Activity = { id: string; time: string; title: string; note?: string; location?: string };
type DayPlan = { date: string; activities: Activity[] };

type Trip = {
  id: string;
  title: string;
  destination: string;
  start: string;
  end: string;
  cover: string;
  guests: Guest[];
  expenses: Expense[];
  days: DayPlan[];
  isPublic: boolean;
};

const seedGuests: Guest[] = [
  { id: "g1", name: "Laura", email: "laura@example.com", avatar: "https://i.pravatar.cc/150?img=1", rsvp: "yes" },
  { id: "g2", name: "David", email: "david@example.com", avatar: "https://i.pravatar.cc/150?img=5", rsvp: "maybe" },
  { id: "g3", name: "Nina", email: "nina@example.com", avatar: "https://i.pravatar.cc/150?img=3", rsvp: "no" },
];

const demoTrip: Trip = {
  id: "t-andes",
  title: "Andes Mountain",
  destination: "Patagonia, Argentina",
  start: "2026-01-12",
  end: "2026-01-18",
  cover: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1500&auto=format&fit=crop",
  guests: seedGuests,
  isPublic: true,
  expenses: [
    { id: "e1", label: "Cabin deposit", amount: 480, paidBy: "Laura", splitWith: ["Laura", "David", "Nina"] },
    { id: "e2", label: "Groceries", amount: 126.5, paidBy: "David", splitWith: ["Laura", "David", "Nina"] },
    { id: "e3", label: "Park Passes", amount: 90, paidBy: "Laura", splitWith: ["Laura", "David"] },
  ],
  days: [
    {
      date: "Mon, Jan 12",
      activities: [
        { id: "a1", time: "09:00", title: "Flight JFK → EZE", location: "JFK T4", note: "Carry-on only" },
        { id: "a2", time: "16:30", title: "Arrive & check in", location: "Bariloche" },
      ],
    },
    {
      date: "Tue, Jan 13",
      activities: [
        { id: "a3", time: "08:00", title: "Hike Cerro Campanario", note: "Viewpoints loop 2–3h" },
        { id: "a4", time: "19:00", title: "Dinner", location: "Manush Brewery" },
      ],
    },
  ],
};

function useExpenseSplit(expenses: Expense[], guests: Guest[]) {
  return useMemo(() => {
    const members = guests.map(g => g.name);
    const balances: Record<string, number> = Object.fromEntries(members.map(m => [m, 0]));

    expenses.forEach(e => {
      const share = e.amount / e.splitWith.length;
      e.splitWith.forEach(p => (balances[p] -= share));
      balances[e.paidBy] += e.amount;
    });

    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const perPerson = total / Math.max(1, members.length);

    return { total, perPerson, balances };
  }, [expenses, guests]);
}

// --------- Main App ---------
export default function PlantriprApp() {
  const [activeTrip, setActiveTrip] = useState<Trip>(demoTrip);
  const [prompt, setPrompt] = useState("1 week in Patagonia for 3 hikers. Mix scenic hikes, 1 chill day, affordable food. Avoid crowded spots.");
  const [newExpense, setNewExpense] = useState({ label: "", amount: "", paidBy: "Laura" });
  const [newGuest, setNewGuest] = useState({ name: "", email: "" });
  const [linkCopied, setLinkCopied] = useState(false);

  const split = useExpenseSplit(activeTrip.expenses, activeTrip.guests);

  function addAIPlan() {
    // Tiny mock of an "AI generated" plan from the prompt
    const id = Math.random().toString(36).slice(2, 8);
    const newDay: DayPlan = {
      date: `AI Day ${activeTrip.days.length + 1}`,
      activities: [
        { id: id + "-1", time: "07:30", title: "Sunrise at Lago Gutiérrez", note: "Short scramble" },
        { id: id + "-2", time: "12:00", title: "Picnic + kayak", location: "Playa Bonita" },
        { id: id + "-3", time: "18:30", title: "Chill cooking night", note: "Groceries: $30" },
      ],
    };
    setActiveTrip({ ...activeTrip, days: [...activeTrip.days, newDay] });
  }

  function addExpense() {
    const amt = parseFloat(newExpense.amount);
    if (!newExpense.label || isNaN(amt)) return;
    const e: Expense = {
      id: Math.random().toString(36).slice(2, 8),
      label: newExpense.label,
      amount: amt,
      paidBy: newExpense.paidBy,
      splitWith: activeTrip.guests.map(g => g.name),
    };
    setActiveTrip({ ...activeTrip, expenses: [...activeTrip.expenses, e] });
    setNewExpense({ label: "", amount: "", paidBy: newExpense.paidBy });
  }

  function addGuest() {
    if (!newGuest.name) return;
    const g: Guest = { id: Math.random().toString(36).slice(2, 8), name: newGuest.name, email: newGuest.email, rsvp: "maybe" };
    setActiveTrip({ ...activeTrip, guests: [...activeTrip.guests, g] });
    setNewGuest({ name: "", email: "" });
  }

  const shareUrl = `https://plantripr.app/trip/${activeTrip.id}`;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15">
                <Plane className="h-4 w-4 text-emerald-400" />
              </span>
              <div className="font-semibold tracking-tight text-xl">Plantrip’r <span className="text-emerald-400">AI</span></div>
              <Badge variant="secondary" className="ml-2">Copilot</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline"><History className="mr-2 h-4 w-4"/>History</Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-white"><Sparkles className="mr-2 h-4 w-4"/>New Plan</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Describe your trip</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input defaultValue={activeTrip.destination} placeholder="Destination" />
                      <Input defaultValue={`${activeTrip.guests.length} travelers`} placeholder="# of travelers" />
                    </div>
                    <Textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={6} placeholder="Trip goals, vibe, constraints, activities, budget…"/>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600"><Sparkles className="h-4 w-4"/>AI will draft a day-by-day plan you can edit.</div>
                      <Button onClick={addAIPlan}><Sparkles className="mr-2 h-4 w-4"/>Generate</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button size="icon" variant="outline"><Settings className="h-4 w-4"/></Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-3">
          {/* Left column: Trip summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="relative">
                <Image src={activeTrip.cover} alt="cover" className="h-56 w-full object-cover" width={800} height={224} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">{activeTrip.title}</div>
                    <div className="flex items-center gap-2 text-white/80"><MapPin className="h-4 w-4"/>{activeTrip.destination} • {activeTrip.start} → {activeTrip.end}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white" onClick={() => {navigator.clipboard?.writeText(shareUrl); setLinkCopied(true); setTimeout(()=>setLinkCopied(false), 1500);}}>
                          <Share2 className="mr-2 h-4 w-4"/>Share
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{linkCopied ? "Link copied!" : shareUrl}</TooltipContent>
                    </Tooltip>
                    <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white"><Download className="mr-2 h-4 w-4"/>Export</Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white"><Heart className="h-4 w-4"/></Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <MiniStat label="Travelers" value={`${activeTrip.guests.length}`} icon={<Users className="h-4 w-4"/>}/>
                  <MiniStat label="Budget (est.)" value={currency(split.perPerson * activeTrip.guests.length)} icon={<Wallet className="h-4 w-4"/>}/>
                  <MiniStat label="Public" value={<Switch checked={activeTrip.isPublic} onCheckedChange={()=>setActiveTrip({...activeTrip, isPublic: !activeTrip.isPublic})}/>} icon={<Airplay className="h-4 w-4"/>}/>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5"/>Itinerary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {activeTrip.days.map((d, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{d.date}</div>
                      <Button size="sm" variant="outline" onClick={()=>{
                        const id = Math.random().toString(36).slice(2,8);
                        const a: Activity = { id, time: "15:00", title: "Free block", note: "Add activity" };
                        const days = [...activeTrip.days];
                        days[i] = { ...days[i], activities: [...days[i].activities, a] };
                        setActiveTrip({ ...activeTrip, days });
                      }}>
                        <Plus className="mr-2 h-4 w-4"/>Add
                      </Button>
                    </div>
                    <Separator className="my-3"/>
                    <ul className="space-y-3">
                      {d.activities.map(a => (
                        <li key={a.id} className="grid gap-2 rounded-xl bg-white border border-gray-200 p-3 md:grid-cols-12">
                          <div className="text-sm text-gray-600 md:col-span-2">{a.time}</div>
                          <div className="md:col-span-7">
                            <div className="font-medium">{a.title}</div>
                            {a.note && <div className="text-sm text-gray-600">{a.note}</div>}
                          </div>
                          <div className="md:col-span-3 flex items-center gap-2 text-sm text-gray-600"><MapPin className="h-4 w-4"/>{a.location ?? "–"}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column: Copilot / People / Money */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/>Copilot</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                  <Input className="pl-9" placeholder="Search places, trails, cafés…"/>
                </div>
                <Textarea rows={4} value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Tell the Copilot what to plan or fix"/>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">Autocomplete routes, opening hours & travel times.</div>
                  <Button size="sm" onClick={addAIPlan}><Sparkles className="mr-2 h-4 w-4"/>Suggest Day</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/>Travelers</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex -space-x-2">
                  {activeTrip.guests.map(g => (
                    <Tooltip key={g.id}>
                      <TooltipTrigger asChild>
                        <Avatar className="border-2 border-gray-200">
                          <AvatarImage src={g.avatar} />
                          <AvatarFallback>{g.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="font-medium">{g.name}</div>
                        <div className="text-xs text-gray-600">RSVP: {g.rsvp}</div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <Input placeholder="Name" value={newGuest.name} onChange={e=>setNewGuest({...newGuest, name: e.target.value})}/>
                  <Input placeholder="Email (optional)" value={newGuest.email} onChange={e=>setNewGuest({...newGuest, email: e.target.value})} className="col-span-2"/>
                </div>
                <div className="flex justify-end"><Button size="sm" onClick={addGuest}><Plus className="mr-2 h-4 w-4"/>Add traveler</Button></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5"/>Expenses</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {activeTrip.expenses.map(e => (
                    <div key={e.id} className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-3 py-2">
                      <div className="truncate text-sm">{e.label} <span className="text-gray-600">• paid by {e.paidBy}</span></div>
                      <div className="font-medium">{currency(e.amount)}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Input placeholder="Label" value={newExpense.label} onChange={e=>setNewExpense({...newExpense, label: e.target.value})} className="col-span-3"/>
                  <Input placeholder="Amount" value={newExpense.amount} onChange={e=>setNewExpense({...newExpense, amount: e.target.value})} className="col-span-2"/>
                  <Input placeholder="Paid by" value={newExpense.paidBy} onChange={e=>setNewExpense({...newExpense, paidBy: e.target.value})} className="col-span-1"/>
                </div>
                <div className="flex justify-end"><Button size="sm" onClick={addExpense}><Plus className="mr-2 h-4 w-4"/>Add expense</Button></div>
                <Separator className="my-2"/>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>Total</span><span className="font-medium">{currency(split.total)}</span></div>
                  <div className="flex items-center justify-between"><span>Per person</span><span className="font-medium">{currency(split.perPerson)}</span></div>
                </div>
                <div className="space-y-2">
                  {activeTrip.guests.map(g => {
                    const bal = split.balances[g.name] ?? 0;
                    return (
                      <div key={g.id} className="text-sm flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-3 py-2">
                        <span>{g.name}</span>
                        <span className={bal >= 0 ? "text-emerald-600" : "text-red-600"}>{bal>=0?"owes": "is owed"} {currency(Math.abs(bal))}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/>Notes & Docs</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">Attach confirmations, packing lists, PDFs and share with the group.</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline"><Plus className="mr-2 h-4 w-4"/>Upload PDF</Button>
                  <Button variant="outline"><Plus className="mr-2 h-4 w-4"/>Packing list</Button>
                </div>
                <Progress value={38} className="h-2"/>
                <div className="text-xs text-gray-600">38% of pre-trip checklist done</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-gray-500">
          Built with ❤ for travelers. This is a clickable prototype—wire up APIs for real data, maps, auth & payments.
        </footer>
      </div>
    </TooltipProvider>
  );
}

function MiniStat({ label, value, icon }: { label:string; value: React.ReactNode; icon: React.ReactNode }){
  return (
    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-3">
      <div className="flex items-center gap-2 text-gray-600 text-xs">{icon}{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
