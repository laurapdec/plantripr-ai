"use client";

import React, { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Complete currency definitions
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

// Group currencies by region for better organization
const currencyGroups = {
  "Popular": ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"] as Currency[],
  "Europe": ["CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "TRY", "RUB"] as Currency[],
  "Asia": ["CNY", "KRW", "INR", "THB", "SGD", "HKD", "AED", "ILS"] as Currency[],
  "Americas": ["BRL", "MXN", "CLP", "COP", "PEN", "ARS", "NZD"] as Currency[],
  "Africa": ["NGN", "GHS", "KES", "UGX", "TZS", "ETB", "EGP", "MAD", "TND", "DZD", "XAF", "XOF", "MWK", "ZMW", "BWP", "NAD", "SZL", "LSL", "MZN", "AOA", "RWF", "BIF", "DJF", "SOS", "SSP", "SDG", "LRD", "SLL", "GMD", "GNF", "CVE", "STP", "MRU", "LYD", "CDF", "ERN", "MGA", "KMF", "SCR", "MUR", "ZAR"] as Currency[]
};

interface CurrencySelectProps {
  value: Currency;
  onValueChange: (value: Currency) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export function CurrencySelect({ value, onValueChange, placeholder = "Select currency", className, compact = false }: CurrencySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-emerald-600">
                {currencySymbols[value]}
              </span>
              {!compact && <span>{currencyNames[value]}</span>}
              {compact && <span className="hidden sm:block">{value}</span>}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            {Object.entries(currencyGroups).map(([group, currencies]) => (
              <CommandGroup key={group} heading={group}>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency}
                    value={`${currency} ${currencyNames[currency]}`}
                    onSelect={() => {
                      onValueChange(currency);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === currency ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-emerald-600 w-12">
                        {currencySymbols[currency]}
                      </span>
                      <span className="font-medium">{currency}</span>
                      <span className="text-gray-600 text-sm">{currencyNames[currency]}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { type Currency, currencySymbols, currencyNames };