"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { CapsuleCard } from "./capsule-card";
import { ReviewDialog } from "./review-dialog";
import { FilterTabs } from "./filter-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Search, Sun, Moon, LogOut, Shield } from "lucide-react";
import type { Capsule, ListItem, Review, CapsuleWithStatus } from "@/lib/types";
import type { User } from "@supabase/supabase-js";

interface DolceGustoAppProps {
  user: User;
}

const ADMIN_EMAIL = "franco.pagano66@gmail.com";

export function DolceGustoApp({ user }: DolceGustoAppProps) {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedCapsule, setSelectedCapsule] = useState<CapsuleWithStatus | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const supabase = createClient();

  const isAdmin = user.email === ADMIN_EMAIL;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [capsulesRes, listItemsRes, reviewsRes, profilesRes] = await Promise.all([
      supabase.from("capsules").select("*").order("name"),
      supabase.from("list_items").select("*"),
      supabase.from("reviews").select("*"),
      supabase.from("profiles").select("*"),
    ]);

    if (capsulesRes.data) setCapsules(capsulesRes.data);
    if (listItemsRes.data) setListItems(listItemsRes.data);

    // Combinar reviews con profiles manualmente
    if (reviewsRes.data) {
      const reviewsWithProfiles = reviewsRes.data.map(review => ({
        ...review,
        profiles: profilesRes.data?.find(p => p.id === review.user_id) || null
      }));
      setReviews(reviewsWithProfiles);
    }
  }

  const categories = useMemo(() => {
    const cats = [...new Set(capsules.map((c) => c.category))];
    return cats.sort();
  }, [capsules]);

  const capsulesWithStatus: CapsuleWithStatus[] = useMemo(() => {
    return capsules.map((capsule) => ({
      ...capsule,
      list_item: listItems.find((li) => li.capsule_id === capsule.id),
      review: reviews.find((r) => r.capsule_id === capsule.id),
    }));
  }, [capsules, listItems, reviews]);

  const filteredCapsules = useMemo(() => {
    return capsulesWithStatus.filter((capsule) => {
      // Search filter
      if (search && !capsule.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "all" && capsule.category !== categoryFilter) {
        return false;
      }

      // Status filter
      switch (filter) {
        case "pending":
          return capsule.list_item?.status === "pending";
        case "tried":
          return capsule.list_item?.status === "tried";
        case "reviewed":
          return !!capsule.review;
        default:
          return true;
      }
    });
  }, [capsulesWithStatus, filter, search, categoryFilter]);

  const counts = useMemo(() => {
    const baseFiltered = capsulesWithStatus.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      return true;
    });

    return {
      all: baseFiltered.length,
      pending: baseFiltered.filter((c) => c.list_item?.status === "pending").length,
      tried: baseFiltered.filter((c) => c.list_item?.status === "tried").length,
      reviewed: baseFiltered.filter((c) => !!c.review).length,
    };
  }, [capsulesWithStatus, search, categoryFilter]);

  async function handleAddToList(capsuleId: string) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("list_items")
      .insert({ capsule_id: capsuleId, user_id: user.id, status: "pending" })
      .select()
      .single();

    if (!error && data) {
      setListItems((prev) => [...prev, data]);
    }
    setIsLoading(false);
  }

  async function handleMarkTried(capsuleId: string) {
    setIsLoading(true);
    const listItem = listItems.find((li) => li.capsule_id === capsuleId);
    if (listItem) {
      const { data, error } = await supabase
        .from("list_items")
        .update({ status: "tried" })
        .eq("id", listItem.id)
        .select()
        .single();

      if (!error && data) {
        setListItems((prev) =>
          prev.map((li) => (li.id === data.id ? data : li))
        );
      }
    }
    setIsLoading(false);
  }

  function handleOpenReview(capsule: CapsuleWithStatus) {
    setSelectedCapsule(capsule);
    setReviewDialogOpen(true);
  }

  async function handleSubmitReview(capsuleId: string, rating: number, comment: string) {
    setIsLoading(true);
    const existingReview = reviews.find((r) => r.capsule_id === capsuleId);

    if (existingReview) {
      const { data, error } = await supabase
        .from("reviews")
        .update({ rating, comment })
        .eq("id", existingReview.id)
        .select()
        .single();

      if (!error && data) {
        setReviews((prev) =>
          prev.map((r) => (r.id === data.id ? data : r))
        );
      }
    } else {
      const { data, error } = await supabase
        .from("reviews")
        .insert({ capsule_id: capsuleId, user_id: user.id, rating, comment })
        .select()
        .single();

      if (!error && data) {
        setReviews((prev) => [...prev, data]);
      }
    }

    setReviewDialogOpen(false);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Coffee className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  Capsulas Dolce Gusto
                </h1>
                <p className="text-sm text-muted-foreground">
                  Recomendaciones para Mailu caminos
                </p>
              </div>
            </div>
            {/* Theme Toggle & Logout */}
            <div className="flex items-center gap-3">
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span className="sr-only">Cambiar tema</span>
                </Button>
              )}
              <div className="hidden sm:flex items-center gap-2">
                {isAdmin && (
                  <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    <Shield className="h-3 w-3" />
                    Admin
                  </span>
                )}
                <span className="text-sm text-foreground font-medium">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => supabase.auth.signOut()}
                className="rounded-full"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar cápsulas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Tabs */}
          <FilterTabs value={filter} onChange={setFilter} counts={counts} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {filteredCapsules.length === 0 ? (
          <div className="text-center py-12">
            <Coffee className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No se encontraron cápsulas con estos filtros
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCapsules.map((capsule) => (
              <CapsuleCard
                key={capsule.id}
                capsule={capsule}
                onAddToList={handleAddToList}
                onMarkTried={handleMarkTried}
                onOpenReview={handleOpenReview}
                isLoading={isLoading}
                isAdmin={isAdmin}
                allReviews={reviews}
              />
            ))}
          </div>
        )}
      </main>

      {/* Review Dialog */}
      <ReviewDialog
        capsule={selectedCapsule}
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        onSubmit={handleSubmitReview}
        isLoading={isLoading}
      />
    </div>
  );
}
