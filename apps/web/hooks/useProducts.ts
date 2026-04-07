import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/lib/supabase-client";
import { productSchema, type Product } from "@/types";

async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error, status, statusText } = await supabase
      .from("products")
      .select("*");

    if (error) {
      throw new Error(error.message || `Supabase error ${status}: ${statusText}`);
    }

    if (!data) return [];

    
    return z.array(productSchema).parse(
      data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        imageUrl: p.image_url,
        stock: p.stock_quantity ?? 0,
        rating: p.rating ?? 0,
        reviewsCount: p.reviews_count ?? 0,
        specs: p.specs ?? {},
        createdAt: p.created_at,
      }))
    );
  } catch (err: any) {
    console.error("Catch Block Error:", err);
    throw err;
  }
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return productSchema.parse({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.image_url,
        stock: data.stock_quantity ?? 0,
        rating: data.rating ?? 0,
        reviewsCount: data.reviews_count ?? 0,
        specs: data.specs ?? {},
        createdAt: data.created_at,
      });
    },
    enabled: !!id,
  });
}
