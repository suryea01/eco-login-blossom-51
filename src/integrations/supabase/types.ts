export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          created_at: string
          id: string
          message: string
          response: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          response: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          response?: string
          user_id?: string
        }
        Relationships: []
      }
      community_challenges: {
        Row: {
          created_at: string
          description: string
          end_date: string
          id: string
          points: number
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          id?: string
          points?: number
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          points?: number
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          created_at: string
          delivery_proof: string | null
          delivery_time: string | null
          id: string
          order_id: string | null
          pickup_proof: string | null
          pickup_time: string | null
          status: string
          updated_at: string
          volunteer_id: string | null
          waste_post_id: string | null
        }
        Insert: {
          created_at?: string
          delivery_proof?: string | null
          delivery_time?: string | null
          id?: string
          order_id?: string | null
          pickup_proof?: string | null
          pickup_time?: string | null
          status?: string
          updated_at?: string
          volunteer_id?: string | null
          waste_post_id?: string | null
        }
        Update: {
          created_at?: string
          delivery_proof?: string | null
          delivery_time?: string | null
          id?: string
          order_id?: string | null
          pickup_proof?: string | null
          pickup_time?: string | null
          status?: string
          updated_at?: string
          volunteer_id?: string | null
          waste_post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_waste_post_id_fkey"
            columns: ["waste_post_id"]
            isOneToOne: false
            referencedRelation: "waste_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      eco_points: {
        Row: {
          created_at: string
          id: string
          points: number
          source: string
          source_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points: number
          source: string
          source_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          source?: string
          source_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          email: string
          feedback_text: string
          id: string
          name: string
          sentiment_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          feedback_text: string
          id?: string
          name: string
          sentiment_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          feedback_text?: string
          id?: string
          name?: string
          sentiment_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          eco_points: number
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          eco_points?: number
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          eco_points?: number
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_method: string
          id: string
          payment_method: string
          shipping_address: Json
          status: string
          total_amount: number
          total_eco_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_method: string
          id?: string
          payment_method: string
          shipping_address: Json
          status?: string
          total_amount: number
          total_eco_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_method?: string
          id?: string
          payment_method?: string
          shipping_address?: Json
          status?: string
          total_amount?: number
          total_eco_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          co2_impact: number
          created_at: string
          description: string
          dimensions: string | null
          eco_points: number
          id: string
          images: string[]
          in_stock: boolean
          manufacturing: string
          material: string
          material_source: string
          name: string
          price: number
          rating: number | null
          reviews: number | null
          seller_id: string
          updated_at: string
          weight: string | null
        }
        Insert: {
          category: string
          co2_impact?: number
          created_at?: string
          description: string
          dimensions?: string | null
          eco_points?: number
          id?: string
          images?: string[]
          in_stock?: boolean
          manufacturing: string
          material: string
          material_source: string
          name: string
          price: number
          rating?: number | null
          reviews?: number | null
          seller_id: string
          updated_at?: string
          weight?: string | null
        }
        Update: {
          category?: string
          co2_impact?: number
          created_at?: string
          description?: string
          dimensions?: string | null
          eco_points?: number
          id?: string
          images?: string[]
          in_stock?: boolean
          manufacturing?: string
          material?: string
          material_source?: string
          name?: string
          price?: number
          rating?: number | null
          reviews?: number | null
          seller_id?: string
          updated_at?: string
          weight?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string
          eco_badges: string[] | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string
          eco_badges?: string[] | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string
          eco_badges?: string[] | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          product_id: string | null
          rating: number
          seller_id: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          rating: number
          seller_id?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          rating?: number
          seller_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed: boolean
          created_at: string
          id: string
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_posts: {
        Row: {
          created_at: string
          id: string
          image: string | null
          location: string
          pickup_time: string
          price: number | null
          quantity: number
          status: string
          updated_at: string
          user_id: string
          waste_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          location: string
          pickup_time: string
          price?: number | null
          quantity: number
          status?: string
          updated_at?: string
          user_id: string
          waste_type: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          location?: string
          pickup_time?: string
          price?: number | null
          quantity?: number
          status?: string
          updated_at?: string
          user_id?: string
          waste_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
