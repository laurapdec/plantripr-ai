"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  QrCode,
  Search,
  Settings,
  Share2,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

// --------- Mock helpers ---------
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD" | "CHF" | "SEK" | "NOK" | "DKK" | "PLN" | "CZK" | "CNY" | "KRW" | "INR" | "BRL" | "MXN" | "ZAR" | "SGD" | "HKD" | "NZD" | "TRY" | "RUB" | "THB" | "AED" | "ILS" | "CLP" | "COP" | "PEN" | "ARS" | "NGN" | "GHS" | "KES" | "UGX" | "TZS" | "ETB" | "EGP" | "MAD" | "TND" | "DZD" | "XAF" | "XOF" | "MWK" | "ZMW" | "BWP" | "NAD" | "SZL" | "LSL" | "MZN" | "AOA" | "RWF" | "BIF" | "DJF" | "SOS" | "SSP" | "SDG" | "LRD" | "SLL" | "GMD" | "GNF" | "CVE" | "STP" | "MRU" | "LYD" | "CDF" | "ERN" | "MGA" | "KMF" | "SCR" | "MUR";

const currencySymbols: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "CA$", AUD: "AU$",
  CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr", PLN: "zł", CZK: "Kč",
  CNY: "¥", KRW: "₩", INR: "₹", BRL: "R$", MXN: "Mex$", ZAR: "R",
  SGD: "S$", HKD: "HK$", NZD: "NZ$", TRY: "₺", RUB: "₽", THB: "฿",
  AED: "د.إ", ILS: "₪", CLP: "CL$", COP: "COL$", PEN: "S/", ARS: "AR$",
  // African currencies
  NGN: "₦", GHS: "₵", KES: "KSh", UGX: "USh", TZS: "TSh", ETB: "Br",
  EGP: "£", MAD: "د.م.", TND: "د.ت", DZD: "د.ج", XAF: "FCFA", XOF: "CFA",
  MWK: "MK", ZMW: "ZK", BWP: "P", NAD: "N$", SZL: "E", LSL: "L",
  MZN: "MT", AOA: "Kz", RWF: "RWF", BIF: "FBu", DJF: "Fdj", SOS: "Sh",
  SSP: "£", SDG: "ج.س.", LRD: "L$", SLL: "Le", GMD: "D", GNF: "FG",
  CVE: "Esc", STP: "Db", MRU: "UM", LYD: "ل.د", CDF: "FC", ERN: "Nfk",
  MGA: "Ar", KMF: "CF", SCR: "₨", MUR: "₨"
};

const currencyNames: Record<Currency, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", CAD: "Canadian Dollar", AUD: "Australian Dollar",
  CHF: "Swiss Franc", SEK: "Swedish Krona", NOK: "Norwegian Krone", DKK: "Danish Krone", PLN: "Polish Zloty", CZK: "Czech Koruna",
  CNY: "Chinese Yuan", KRW: "South Korean Won", INR: "Indian Rupee", BRL: "Brazilian Real", MXN: "Mexican Peso", ZAR: "South African Rand",
  SGD: "Singapore Dollar", HKD: "Hong Kong Dollar", NZD: "New Zealand Dollar", TRY: "Turkish Lira", RUB: "Russian Ruble", THB: "Thai Baht",
  AED: "UAE Dirham", ILS: "Israeli New Shekel", CLP: "Chilean Peso", COP: "Colombian Peso", PEN: "Peruvian Sol", ARS: "Argentine Peso",
  // African currencies
  NGN: "Nigerian Naira", GHS: "Ghanaian Cedi", KES: "Kenyan Shilling", UGX: "Ugandan Shilling", TZS: "Tanzanian Shilling", ETB: "Ethiopian Birr",
  EGP: "Egyptian Pound", MAD: "Moroccan Dirham", TND: "Tunisian Dinar", DZD: "Algerian Dinar", XAF: "Central African CFA Franc", XOF: "West African CFA Franc",
  MWK: "Malawian Kwacha", ZMW: "Zambian Kwacha", BWP: "Botswana Pula", NAD: "Namibian Dollar", SZL: "Swazi Lilangeni", LSL: "Lesotho Loti",
  MZN: "Mozambican Metical", AOA: "Angolan Kwanza", RWF: "Rwandan Franc", BIF: "Burundian Franc", DJF: "Djiboutian Franc", SOS: "Somali Shilling",
  SSP: "South Sudanese Pound", SDG: "Sudanese Pound", LRD: "Liberian Dollar", SLL: "Sierra Leonean Leone", GMD: "Gambian Dalasi", GNF: "Guinean Franc",
  CVE: "Cape Verdean Escudo", STP: "São Tomé and Príncipe Dobra", MRU: "Mauritanian Ouguiya", LYD: "Libyan Dinar", CDF: "Congolese Franc", ERN: "Eritrean Nakfa",
  MGA: "Malagasy Ariary", KMF: "Comorian Franc", SCR: "Seychellois Rupee", MUR: "Mauritian Rupee"
}; 

const formatCurrency = (amount: number, currencyCode: Currency) => {
  return new Intl.NumberFormat(undefined, { 
    style: "currency", 
    currency: currencyCode 
  }).format(amount);
};

type Guest = { id: string; name: string; email?: string; avatar?: string; rsvp: "yes"|"no"|"maybe" };

type SplitType = "equal" | "exact" | "percentage";

type ExpenseSplit = {
  userId: string;
  userName: string;
  amount?: number; // for exact amounts
  percentage?: number; // for percentage splits
};

type Expense = { 
  id: string; 
  label: string; 
  amount: number; 
  paidBy: string; 
  splitType: SplitType;
  splitWith: ExpenseSplit[];
  currency: Currency;
  category?: string;
  notes?: string;
};
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
  tripCode: string;
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
  tripCode: "ANS-2026-A7X9",
  expenses: [
    { 
      id: "e1", 
      label: "Cabin deposit", 
      amount: 480, 
      paidBy: "Laura", 
      splitType: "equal" as SplitType,
      splitWith: [
        { userId: "g1", userName: "Laura" },
        { userId: "g2", userName: "David" },
        { userId: "g3", userName: "Nina" }
      ], 
      currency: "USD" as Currency,
      category: "Accommodation"
    },
    { 
      id: "e2", 
      label: "Coffee & Snacks", 
      amount: 47.50, 
      paidBy: "David", 
      splitType: "exact" as SplitType,
      splitWith: [
        { userId: "g1", userName: "Laura", amount: 12.50 }, // Coffee + pastry
        { userId: "g2", userName: "David", amount: 8.00 },  // Just coffee
        { userId: "g3", userName: "Nina", amount: 27.00 }   // Coffee + lunch sandwich
      ], 
      currency: "USD" as Currency,
      category: "Food"
    },
    { 
      id: "e3", 
      label: "Park Passes", 
      amount: 90, 
      paidBy: "Laura", 
      splitType: "exact" as SplitType,
      splitWith: [
        { userId: "g1", userName: "Laura", amount: 45 },
        { userId: "g2", userName: "David", amount: 45 }
      ], 
      currency: "EUR" as Currency,
      category: "Activities"
    },
    { 
      id: "e4", 
      label: "Car Rental", 
      amount: 240, 
      paidBy: "Nina", 
      splitType: "percentage" as SplitType,
      splitWith: [
        { userId: "g1", userName: "Laura", percentage: 50 },   // Main driver
        { userId: "g2", userName: "David", percentage: 30 },   // Secondary driver
        { userId: "g3", userName: "Nina", percentage: 20 }     // Passenger only
      ], 
      currency: "USD" as Currency,
      category: "Transportation"
    },
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

function useExpenseSplit(expenses: Expense[], guests: Guest[], displayCurrency: Currency) {
  return useMemo(() => {
    const members = guests.map(g => g.name);
    const balances: Record<string, number> = Object.fromEntries(members.map(m => [m, 0]));

    // Simple conversion rates (in a real app, these would come from an API)
    const exchangeRates: Record<Currency, number> = {
      USD: 1.0, EUR: 0.85, GBP: 0.75, JPY: 110.0, CAD: 1.25, AUD: 1.35,
      CHF: 0.88, SEK: 10.5, NOK: 10.8, DKK: 6.5, PLN: 4.2, CZK: 23.5,
      CNY: 7.2, KRW: 1250, INR: 83, BRL: 5.1, MXN: 18.5, ZAR: 18.8,
      SGD: 1.35, HKD: 7.8, NZD: 1.55, TRY: 27, RUB: 90, THB: 36,
      AED: 3.67, ILS: 3.7, CLP: 850, COP: 4200, PEN: 3.8, ARS: 350,
      // African currencies
      NGN: 760, GHS: 12, KES: 150, UGX: 3700, TZS: 2300, ETB: 55,
      EGP: 31, MAD: 10, TND: 3.1, DZD: 134, XAF: 590, XOF: 590,
      MWK: 1030, ZMW: 20, BWP: 13.5, NAD: 18.8, SZL: 18.8, LSL: 18.8,
      MZN: 63, AOA: 830, RWF: 1250, BIF: 2850, DJF: 178, SOS: 570,
      SSP: 130, SDG: 600, LRD: 155, SLL: 20000, GMD: 67, GNF: 8600,
      CVE: 99, STP: 22000, MRU: 36, LYD: 4.8, CDF: 2700, ERN: 15,
      MGA: 4500, KMF: 440, SCR: 14, MUR: 45
    };

    // Convert all expenses to display currency for consistent splitting
    const normalizedExpenses = expenses.map(e => ({
      ...e,
      normalizedAmount: e.amount * (exchangeRates[displayCurrency] / exchangeRates[e.currency])
    }));

    normalizedExpenses.forEach(e => {
      // Calculate splits based on split type
      e.splitWith.forEach(split => {
        let splitAmount: number;
        
        if (e.splitType === "equal") {
          splitAmount = e.normalizedAmount / e.splitWith.length;
        } else if (e.splitType === "exact" && split.amount) {
          // Convert exact amount to display currency
          const exactInDisplayCurrency = split.amount * (exchangeRates[displayCurrency] / exchangeRates[e.currency]);
          splitAmount = exactInDisplayCurrency;
        } else if (e.splitType === "percentage" && split.percentage) {
          splitAmount = (e.normalizedAmount * split.percentage) / 100;
        } else {
          // Fallback to equal split
          splitAmount = e.normalizedAmount / e.splitWith.length;
        }
        
        balances[split.userName] -= splitAmount;
      });
      
      balances[e.paidBy] += e.normalizedAmount;
    });

    const total = normalizedExpenses.reduce((s, e) => s + e.normalizedAmount, 0);
    const perPerson = total / Math.max(1, members.length);

    return { total, perPerson, balances };
  }, [expenses, guests, displayCurrency]);
}

// --------- Main App ---------
export default function TripDetailPage() {
  const [activeTrip, setActiveTrip] = useState<Trip>(demoTrip);
  const [prompt, setPrompt] = useState("");
  const [newExpense, setNewExpense] = useState({ 
    label: "", 
    amount: "", 
    paidBy: "Laura",
    splitType: "equal" as SplitType,
    category: "",
    notes: "",
    selectedSplitMembers: activeTrip.guests.map(g => g.id),
    exactAmounts: {} as Record<string, string>, // guest.id -> amount string
    percentages: {} as Record<string, string>   // guest.id -> percentage string
  });
  const [showAdvancedSplit, setShowAdvancedSplit] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "" });
  const [linkCopied, setLinkCopied] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>("USD");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQrCode, setShowQrCode] = useState(false);

  const split = useExpenseSplit(activeTrip.expenses, activeTrip.guests, currentCurrency);

  // Generate QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        const tripUrl = `${window.location.origin}/trips/${activeTrip.id}?code=${activeTrip.tripCode}`;
        const qrDataUrl = await QRCode.toDataURL(tripUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#10b981', // emerald-500
            light: '#ffffff'
          }
        });
        setQrCodeUrl(qrDataUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQR();
  }, [activeTrip.id, activeTrip.tripCode]);

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
    
    // Create split array based on selected members and split type
    const splitWith: ExpenseSplit[] = newExpense.selectedSplitMembers.map(memberId => {
      const guest = activeTrip.guests.find(g => g.id === memberId);
      
      if (newExpense.splitType === "exact") {
        const exactAmount = parseFloat(newExpense.exactAmounts[memberId] || "0");
        return {
          userId: memberId,
          userName: guest?.name || "",
          amount: exactAmount
        };
      } else if (newExpense.splitType === "percentage") {
        const percentage = parseFloat(newExpense.percentages[memberId] || "0");
        return {
          userId: memberId,
          userName: guest?.name || "",
          percentage: percentage
        };
      } else {
        // Equal split
        return {
          userId: memberId,
          userName: guest?.name || ""
        };
      }
    });
    
    const e: Expense = {
      id: Math.random().toString(36).slice(2, 8),
      label: newExpense.label,
      amount: amt,
      paidBy: newExpense.paidBy,
      splitType: newExpense.splitType,
      splitWith: splitWith,
      currency: currentCurrency,
      category: newExpense.category,
      notes: newExpense.notes
    };
    
    setActiveTrip({ ...activeTrip, expenses: [...activeTrip.expenses, e] });
    setNewExpense({ 
      label: "", 
      amount: "", 
      paidBy: newExpense.paidBy,
      splitType: "equal" as SplitType,
      category: "",
      notes: "",
      selectedSplitMembers: activeTrip.guests.map(g => g.id),
      exactAmounts: {},
      percentages: {}
    });
    setShowAdvancedSplit(false);
  }

  function handleCurrencyChange(newCurrency: Currency) {
    setCurrentCurrency(newCurrency);
  }

  function addGuest() {
    if (!newGuest.name) return;
    const g: Guest = { id: Math.random().toString(36).slice(2, 8), name: newGuest.name, email: newGuest.email, rsvp: "maybe" };
    setActiveTrip({ ...activeTrip, guests: [...activeTrip.guests, g] });
    setNewGuest({ name: "", email: "" });
  }

  const shareUrl = `https://plantripr.app/trip/${activeTrip.id}?code=${activeTrip.tripCode}`;

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
              <div className="font-semibold tracking-tight text-xl">Plantrip&apos;r</div>
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
                    <div className="text-2xl font-semibold tracking-tight text-white">{activeTrip.title}</div>
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
                  <MiniStat label="Budget (est.)" value={formatCurrency(split.perPerson * activeTrip.guests.length, currentCurrency)} icon={<Wallet className="h-4 w-4"/>}/>
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
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5"/>
                  Share Trip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Trip Code</span>
                    <Badge variant="secondary" className="font-mono">{activeTrip.tripCode}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Share this code with fellow travelers</p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                  >
                    {linkCopied ? "Copied!" : "Copy Link"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowQrCode(true)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                {/* QR Code Modal */}
                {showQrCode && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowQrCode(false)}>
                    <div className="bg-white p-6 rounded-2xl max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
                      <div className="text-center">
                        <h3 className="font-semibold text-lg mb-2">Scan to Join Trip</h3>
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-100 mb-4">
                          {qrCodeUrl && <Image src={qrCodeUrl} alt="Trip QR Code" width={200} height={200} className="mx-auto" />}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Trip: <strong>{activeTrip.title}</strong><br/>
                          Code: <span className="font-mono">{activeTrip.tripCode}</span>
                        </p>
                        <Button onClick={() => setShowQrCode(false)} className="w-full">
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5"/>Expenses</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {activeTrip.expenses.map(e => (
                    <div key={e.id} className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{e.label}</span>
                          {e.category && <Badge variant="outline" className="text-xs">{e.category}</Badge>}
                        </div>
                        <div className="font-bold text-emerald-600">{formatCurrency(e.amount, e.currency)}</div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Paid by <span className="font-medium">{e.paidBy}</span></div>
                        <div className="flex items-center gap-2">
                          <span>Split {e.splitType}ly with {e.splitWith.length} {e.splitWith.length === 1 ? 'person' : 'people'}:</span>
                          <div className="flex flex-wrap gap-1">
                            {e.splitWith.slice(0, 3).map(split => (
                              <Badge key={split.userId} variant="secondary" className="text-xs">
                                {split.userName}
                                {e.splitType === "exact" && split.amount && ` (${formatCurrency(split.amount, e.currency)})`}
                                {e.splitType === "percentage" && split.percentage && ` (${split.percentage}%)`}
                              </Badge>
                            ))}
                            {e.splitWith.length > 3 && (
                              <Badge variant="secondary" className="text-xs">+{e.splitWith.length - 3} more</Badge>
                            )}
                          </div>
                        </div>
                        {e.notes && <div className="italic">&ldquo;{e.notes}&rdquo;</div>}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Advanced Expense Form */}
                <div className="space-y-4 border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Add New Expense</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedSplit(!showAdvancedSplit)}
                    >
                      {showAdvancedSplit ? "Simple" : "Advanced"}
                    </Button>
                  </div>
                  
                  {/* Basic Fields */}
                  <div className="grid grid-cols-1 gap-3">
                    <Input 
                      placeholder="What did you buy? (e.g., Dinner, Gas, Hotel)" 
                      value={newExpense.label} 
                      onChange={e=>setNewExpense({...newExpense, label: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Amount" 
                        type="number"
                        step="0.01"
                        value={newExpense.amount} 
                        onChange={e=>setNewExpense({...newExpense, amount: e.target.value})}
                      />
                      <div className="space-y-1">
                        <Select value={currentCurrency} onValueChange={(value) => handleCurrencyChange(value as Currency)}>
                          <SelectTrigger>
                            <SelectValue>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-semibold text-emerald-600">
                                  {currencySymbols[currentCurrency]}
                                </span>
                                <span className="hidden sm:block">{currencyNames[currentCurrency]}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(currencySymbols) as Currency[]).map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-semibold text-emerald-600 w-8">
                                    {currencySymbols[currency]}
                                  </span>
                                  <span>{currencyNames[currency]}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Input 
                      placeholder="Category (optional)" 
                      value={newExpense.category} 
                      onChange={e=>setNewExpense({...newExpense, category: e.target.value})}
                    />
                  </div>
                  
                  {/* Who Paid */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Who paid for this?</Label>
                    <Select value={newExpense.paidBy} onValueChange={(value) => setNewExpense({...newExpense, paidBy: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Who paid for this expense?" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeTrip.guests.map((guest: Guest) => (
                          <SelectItem key={guest.id} value={guest.name}>
                            <div className="flex items-center gap-2">
                              {guest.avatar ? (
                                <Avatar className="w-5 h-5">
                                  <AvatarImage src={guest.avatar} />
                                  <AvatarFallback>{guest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                                  {guest.name.substring(0, 1).toUpperCase()}
                                </div>
                              )}
                              <span>{guest.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Advanced Splitting Options */}
                  {showAdvancedSplit && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">How should this be split?</Label>
                        <Select 
                          value={newExpense.splitType} 
                          onValueChange={(value: SplitType) => setNewExpense({...newExpense, splitType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equal">
                              <div className="space-y-1">
                                <div className="font-medium">Split Equally</div>
                                <div className="text-xs text-gray-600">Everyone pays the same amount</div>
                              </div>
                            </SelectItem>
                            <SelectItem value="exact">
                              <div className="space-y-1">
                                <div className="font-medium">Exact Amounts</div>
                                <div className="text-xs text-gray-600">Specify exact amounts per person</div>
                              </div>
                            </SelectItem>
                            <SelectItem value="percentage">
                              <div className="space-y-1">
                                <div className="font-medium">By Percentage</div>
                                <div className="text-xs text-gray-600">Split by percentage shares</div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Who should split this expense?</Label>
                        <div className="space-y-2">
                          {activeTrip.guests.map((guest: Guest) => (
                            <div key={guest.id} className="flex items-center justify-between p-2 border rounded-lg">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={newExpense.selectedSplitMembers.includes(guest.id)}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setNewExpense(prev => ({
                                      ...prev,
                                      selectedSplitMembers: isChecked 
                                        ? [...prev.selectedSplitMembers, guest.id]
                                        : prev.selectedSplitMembers.filter(id => id !== guest.id)
                                    }));
                                  }}
                                />
                                {guest.avatar ? (
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={guest.avatar} />
                                    <AvatarFallback>{guest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                                    {guest.name.substring(0, 1).toUpperCase()}
                                  </div>
                                )}
                                <span className="font-medium">{guest.name}</span>
                              </div>

                              {newExpense.selectedSplitMembers.includes(guest.id) && (
                                <div className="flex items-center gap-2">
                                  {newExpense.splitType === "equal" && (
                                    <Badge variant="outline" className="text-xs">
                                      {formatCurrency(parseFloat(newExpense.amount || "0") / newExpense.selectedSplitMembers.length, currentCurrency)}
                                    </Badge>
                                  )}

                                  {newExpense.splitType === "exact" && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-mono text-emerald-600">
                                        {currencySymbols[currentCurrency]}
                                      </span>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={newExpense.exactAmounts[guest.id] || ""}
                                        onChange={(e) => setNewExpense(prev => ({
                                          ...prev,
                                          exactAmounts: {
                                            ...prev.exactAmounts,
                                            [guest.id]: e.target.value
                                          }
                                        }))}
                                        className="w-20 h-8 text-xs"
                                      />
                                    </div>
                                  )}

                                  {newExpense.splitType === "percentage" && (
                                    <div className="flex items-center gap-1">
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        value={newExpense.percentages[guest.id] || ""}
                                        onChange={(e) => setNewExpense(prev => ({
                                          ...prev,
                                          percentages: {
                                            ...prev.percentages,
                                            [guest.id]: e.target.value
                                          }
                                        }))}
                                        className="w-16 h-8 text-xs"
                                      />
                                      <span className="text-xs text-gray-500">%</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Summary for exact amounts */}
                          {newExpense.splitType === "exact" && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                              <div className="text-xs text-gray-600 mb-1">Split Summary:</div>
                              {(() => {
                                const totalExactAmounts = newExpense.selectedSplitMembers.reduce((sum, guestId) => {
                                  return sum + (parseFloat(newExpense.exactAmounts[guestId] || "0") || 0);
                                }, 0);
                                const totalExpense = parseFloat(newExpense.amount || "0");
                                const difference = totalExpense - totalExactAmounts;
                                
                                return (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Total expense:</span>
                                      <span className="font-medium">{formatCurrency(totalExpense, currentCurrency)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span>Sum of splits:</span>
                                      <span className="font-medium">{formatCurrency(totalExactAmounts, currentCurrency)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span>Difference:</span>
                                      <span className={`font-medium ${difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(Math.abs(difference), currentCurrency)} 
                                        {difference > 0 ? ' remaining' : difference < 0 ? ' over' : ' ✓'}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Summary for percentages */}
                          {newExpense.splitType === "percentage" && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                              <div className="text-xs text-gray-600 mb-1">Percentage Summary:</div>
                              {(() => {
                                const totalPercentage = newExpense.selectedSplitMembers.reduce((sum, guestId) => {
                                  return sum + (parseFloat(newExpense.percentages[guestId] || "0") || 0);
                                }, 0);
                                
                                return (
                                  <div className="flex justify-between text-xs">
                                    <span>Total percentage:</span>
                                    <span className={`font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                                      {totalPercentage}% {totalPercentage === 100 ? '✓' : `(need ${100 - totalPercentage}% more)`}
                                    </span>
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Notes (optional)</Label>
                        <Textarea 
                          placeholder="Add any notes about this expense..."
                          value={newExpense.notes}
                          onChange={e=>setNewExpense({...newExpense, notes: e.target.value})}
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {/* Quick Split for Simple Mode */}
                  {!showAdvancedSplit && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Split with:</Label>
                      <div className="flex flex-wrap gap-2">
                        {activeTrip.guests.map((guest: Guest) => (
                          <label key={guest.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newExpense.selectedSplitMembers.includes(guest.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setNewExpense(prev => ({
                                  ...prev,
                                  selectedSplitMembers: isChecked 
                                    ? [...prev.selectedSplitMembers, guest.id]
                                    : prev.selectedSplitMembers.filter(id => id !== guest.id)
                                }));
                              }}
                            />
                            <Badge variant={newExpense.selectedSplitMembers.includes(guest.id) ? "default" : "outline"} className="text-xs">
                              {guest.name}
                            </Badge>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={addExpense} 
                    className="w-full bg-emerald-500 hover:bg-emerald-400"
                    disabled={(() => {
                      if (!newExpense.label || !newExpense.amount || newExpense.selectedSplitMembers.length === 0) {
                        return true;
                      }
                      
                      if (newExpense.splitType === "exact") {
                        const totalExactAmounts = newExpense.selectedSplitMembers.reduce((sum, guestId) => {
                          return sum + (parseFloat(newExpense.exactAmounts[guestId] || "0") || 0);
                        }, 0);
                        const totalExpense = parseFloat(newExpense.amount || "0");
                        return Math.abs(totalExpense - totalExactAmounts) > 0.01; // Allow small rounding differences
                      }
                      
                      if (newExpense.splitType === "percentage") {
                        const totalPercentage = newExpense.selectedSplitMembers.reduce((sum, guestId) => {
                          return sum + (parseFloat(newExpense.percentages[guestId] || "0") || 0);
                        }, 0);
                        return Math.abs(totalPercentage - 100) > 0.1; // Allow small rounding differences
                      }
                      
                      return false;
                    })()}
                  >
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Expense ({formatCurrency(parseFloat(newExpense.amount || "0"), currentCurrency)})
                  </Button>
                </div>
                
                <Separator className="my-4"/>
                
                {/* Currency Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-700 mb-2">Expense Summary</div>
                  {Object.entries(
                    activeTrip.expenses.reduce((acc, e) => {
                      acc[e.currency] = (acc[e.currency] || 0) + e.amount;
                      return acc;
                    }, {} as Record<Currency, number>)
                  ).map(([currency, total]) => (
                    <div key={currency} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {currencySymbols[currency as Currency]}
                        </span>
                        {currencyNames[currency as Currency]}
                      </span>
                      <span className="font-medium">{formatCurrency(total, currency as Currency)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-2 bg-gray-200"/>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>Total (in {currencyNames[currentCurrency]})</span><span className="font-medium">{formatCurrency(split.total, currentCurrency)}</span></div>
                  <div className="flex items-center justify-between"><span>Per person</span><span className="font-medium">{formatCurrency(split.perPerson, currentCurrency)}</span></div>
                </div>
                <div className="space-y-2">
                  {activeTrip.guests.map(g => {
                    const bal = split.balances[g.name] ?? 0;
                    return (
                      <div key={g.id} className="text-sm flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-3 py-2">
                        <span>{g.name}</span>
                        <span className={bal >= 0 ? "text-emerald-600" : "text-red-600"}>{bal>=0?"owes": "is owed"} {formatCurrency(Math.abs(bal), currentCurrency)}</span>
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