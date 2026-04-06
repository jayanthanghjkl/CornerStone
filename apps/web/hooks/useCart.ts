import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { productSchema, type DbCartItem } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

async function fetchCartItems(userId: string): Promise<DbCartItem[]> {
  const { data, error } = await supabase
    .from("carts")
    .select(`
      id,
      cart_items (
        id,
        quantity,
        added_at,
        product:products (*)
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error) {
<<<<<<< HEAD
    if (error.code === 'PGRST116') return []; 
=======
    if (error.code === 'PGRST116') return []; // No cart yet
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    throw error;
  }
  
  if (!data || !data.cart_items) return [];

  return data.cart_items.map((item: any) => {
    if (!item.product) return null;
    return {
      ...item,
      product: productSchema.parse({
        ...item.product,
        imageUrl: item.product.image_url,
        createdAt: item.product.created_at,
        reviewsCount: item.product.reviews_count,
        stock: item.product.stock_quantity ?? 0,
        rating: item.product.rating ?? 0,
        specs: item.product.specs ?? {},
      }),
    };
  }).filter(Boolean) as DbCartItem[];
}

async function fetchCartTotal() {
  const { data, error } = await supabase.rpc("get_cart_total");
  if (error) throw error;
  return data?.[0] || { subtotal: 0, tax: 0, shipping: 0, total: 0 };
}

export function useCart() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const guestCart = useCartStore();

  useEffect(() => {
    let mounted = true;
    let isSyncing = false;
    
    const handleAuthChange = async (session: any) => {
      const newUser = session?.user ?? null;
      
<<<<<<< HEAD
      
      
      
      if (newUser && !isSyncing) {
        
        
        
=======
      // Use a local ref-like check or functional state to avoid dependency loop
      // We only want to sync if we have a NEW user and we had guest items
      // and we haven't just synced.
      if (newUser && !isSyncing) {
        // We can't easily check "old user" here without a ref, 
        // but we can check if we have items to sync.
        // To be safe, we'll use a local flag for this mount.
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        const items = useCartStore.getState().items;
        if (items.length > 0) {
          isSyncing = true;
          try {
            const itemsToSync = items.map(item => ({
              product_id: item.product.id,
              quantity: item.quantity
            }));
            
            const { error } = await supabase.rpc("sync_guest_cart", {
              guest_items: itemsToSync
            });
            
            if (!error) {
              useCartStore.getState().clearCart();
            }
          } catch (err) {
            console.error("Failed to sync guest cart:", err);
          } finally {
            isSyncing = false;
          }
        }
      }

      if (mounted) {
        setUser(newUser);
        setIsAuthResolved(true);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthChange(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
<<<<<<< HEAD
  }, []); 
=======
  }, []); // Only run once on mount. guestCart.items.length is handled by getState() inside.
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de

  const cartQuery = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => fetchCartItems(user!.id),
    enabled: !!user?.id && isAuthResolved,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });

  const totalsQuery = useQuery({
    queryKey: ["cart-totals", user?.id],
    queryFn: fetchCartTotal,
    enabled: !!user?.id && isAuthResolved,
    placeholderData: keepPreviousData,
  });

  const addItem = useMutation<void, Error, { productId: string; quantity?: number; product?: any }>({
    mutationFn: async ({ productId, quantity = 1, product }) => {
      if (!user) {
<<<<<<< HEAD
        
        if (product) {
          guestCart.addItem(product, quantity);
        } else {
          
=======
        // Fallback to guest cart if not logged in
        if (product) {
          guestCart.addItem(product, quantity);
        } else {
          // If product info not provided, we might need to fetch it or just redirect
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          const returnTo = window.location.pathname + window.location.search;
          router.push(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
        }
        return;
      }
      const { error } = await supabase.rpc('add_to_cart', { p_product_id: productId, p_quantity: quantity });
      if (error) {
        if (error.code === '40001') {
          throw new Error("Insufficient stock available");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["cart-totals", user?.id] });
    },
  });

  const updateQuantity = useMutation<void, Error, { id: string; quantity: number; productId?: string }, { previousCart: any }>({
    mutationFn: async ({ id, quantity, productId }) => {
      if (!user) {
        if (productId) {
          guestCart.updateQuantity(productId, quantity);
        }
        return;
      }
      const { error } = await supabase.rpc('update_cart_quantity', { p_cart_item_id: id, p_quantity: quantity });
      if (error) {
        if (error.code === '40001') {
          throw new Error("Insufficient stock available");
        }
        throw error;
      }
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.id] });
      const previousCart = queryClient.getQueryData(["cart", user?.id]);
      if (user) {
        queryClient.setQueryData(["cart", user?.id], (old: any) => 
          old?.map((item: any) => item.id === variables.id ? { ...item, quantity: variables.quantity } : item)
        );
      }
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (user) {
        queryClient.setQueryData(["cart", user?.id], context?.previousCart);
      }
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        queryClient.invalidateQueries({ queryKey: ["cart-totals", user?.id] });
      }
    },
  });

  const removeItem = useMutation<void, Error, { id: string; productId?: string }, { previousCart: any }>({
    mutationFn: async ({ id, productId }) => {
      if (!user) {
        if (productId) {
          guestCart.removeItem(productId);
        }
        return;
      }
      const { error } = await supabase.from("cart_items").delete().eq("id", id);
      if (error) throw error;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.id] });
      const previousCart = queryClient.getQueryData(["cart", user?.id]);
      if (user) {
        queryClient.setQueryData(["cart", user?.id], (old: any) => old?.filter((item: any) => item.id !== variables.id));
      }
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (user) {
        queryClient.setQueryData(["cart", user?.id], context?.previousCart);
      }
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        queryClient.invalidateQueries({ queryKey: ["cart-totals", user?.id] });
      }
    },
  });

  const clearCart = useMutation<void, Error>({
    mutationFn: async () => {
      if (!user) {
        guestCart.clearCart();
        return;
      }
      const { error } = await supabase.rpc("clear_cart");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["cart-totals", user?.id] });
    }
  });

  const dbItems = cartQuery.data ?? [];
  const items = user ? dbItems : guestCart.items.map(item => ({
<<<<<<< HEAD
    id: item.product.id, 
    product_id: item.product.id,
    cart_id: "guest",
    quantity: item.quantity,
    added_at: new Date().toISOString(),
=======
    id: item.product.id, // using product id as item id for guest items
    product_id: item.product.id,
    user_id: null,
    quantity: item.quantity,
    created_at: new Date().toISOString(),
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    product: item.product
  }));

  const totalItems = user 
    ? dbItems.reduce((sum, item) => sum + item.quantity, 0)
    : guestCart.totalItems();

  const serverTotals = totalsQuery.data || { subtotal: 0, tax: 0, shipping: 0, total: 0 };
  const clientTotals = {
    subtotal: guestCart.totalPrice(),
    tax: guestCart.totalPrice() * 0.08,
    shipping: guestCart.totalPrice() > 0 ? 10 : 0,
    total: guestCart.totalPrice() * 1.08 + (guestCart.totalPrice() > 0 ? 10 : 0)
  };

  const totals = user ? serverTotals : clientTotals;

  return {
    items,
    isLoading: !isAuthResolved || (user ? cartQuery.isLoading : false),
    isFetching: cartQuery.isFetching,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totals,
    user
  };
}

export function useCartRealtime(userId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;
    
<<<<<<< HEAD
    
=======
    // Unique channel for this hook instance
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    const channel = supabase
      .channel(`cart-realtime-${userId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, 
      () => {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
        queryClient.invalidateQueries({ queryKey: ["cart-totals", userId] });
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
