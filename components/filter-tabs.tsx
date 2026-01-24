"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
  counts: {
    all: number;
    pending: number;
    tried: number;
    reviewed: number;
  };
}

export function FilterTabs({ value, onChange, counts }: FilterTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-muted">
        <TabsTrigger value="all" className="text-xs sm:text-sm">
          Todas ({counts.all})
        </TabsTrigger>
        <TabsTrigger value="pending" className="text-xs sm:text-sm">
          Por Probar ({counts.pending})
        </TabsTrigger>
        <TabsTrigger value="tried" className="text-xs sm:text-sm">
          Probadas ({counts.tried})
        </TabsTrigger>
        <TabsTrigger value="reviewed" className="text-xs sm:text-sm">
          Reseñadas ({counts.reviewed})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
