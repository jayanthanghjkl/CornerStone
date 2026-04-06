import { z } from "zod";

<<<<<<< HEAD

=======
// ── Product ──────────────────────────────────────────────────
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().url().nullable(),
  category: z.string(),
  stock: z.coerce.number().int().nonnegative().default(0),
  rating: z.coerce.number().min(0).max(5).default(0),
  reviewsCount: z.coerce.number().int().nonnegative().default(0),
  specs: z.record(z.any()).default({}),
  createdAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;

<<<<<<< HEAD

=======
// ── Cart item ────────────────────────────────────────────────
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export interface DbCartItem {
  id: string;
<<<<<<< HEAD
  cart_id: string;
  product_id: string;
  quantity: number;
  added_at: string;
  product?: Product;
}


=======
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

// ── User profile ─────────────────────────────────────────────
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
