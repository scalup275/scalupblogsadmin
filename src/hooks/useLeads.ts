import { useState } from "react";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  source: string;
  createdAt: string;
  value: number;
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah@techcorp.com",
    company: "TechCorp Inc.",
    status: "qualified",
    source: "Website",
    createdAt: "2024-01-20",
    value: 15000,
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael@startupxyz.io",
    company: "StartupXYZ",
    status: "new",
    source: "LinkedIn",
    createdAt: "2024-01-19",
    value: 8500,
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily@innovate.co",
    company: "Innovate Co",
    status: "contacted",
    source: "Referral",
    createdAt: "2024-01-18",
    value: 22000,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@enterprise.net",
    company: "Enterprise Net",
    status: "converted",
    source: "Google Ads",
    createdAt: "2024-01-15",
    value: 45000,
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@growth.io",
    company: "Growth.io",
    status: "lost",
    source: "Website",
    createdAt: "2024-01-12",
    value: 12000,
  },
];

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const addLead = (lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return { leads, addLead, updateLead, deleteLead };
}
