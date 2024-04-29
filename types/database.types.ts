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
      agenda: {
        Row: {
          created_at: string
          date: string
          id: string
          patient_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          patient_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          patient_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_agenda_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_agenda_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_bookmark_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          id: string
          image: string | null
          image_path: string | null
          name_en: string | null
          name_fr: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          image_path?: string | null
          name_en?: string | null
          name_fr: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          image_path?: string | null
          name_en?: string | null
          name_fr?: string
        }
        Relationships: []
      }
      comment: {
        Row: {
          comment: string
          created_at: string
          id: string
          post_id: string
          status: boolean
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          post_id: string
          status?: boolean
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          post_id?: string
          status?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation: {
        Row: {
          created_at: string
          doctor_id: string
          id: string
          is_pay: boolean
          patient_id: string
          status: boolean
        }
        Insert: {
          created_at?: string
          doctor_id: string
          id?: string
          is_pay?: boolean
          patient_id: string
          status?: boolean
        }
        Update: {
          created_at?: string
          doctor_id?: string
          id?: string
          is_pay?: boolean
          patient_id?: string
          status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_conversation_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_conversation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      follower: {
        Row: {
          created_at: string
          subscriber: string
          subscription: string
        }
        Insert: {
          created_at?: string
          subscriber: string
          subscription: string
        }
        Update: {
          created_at?: string
          subscriber?: string
          subscription?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_follower_subscriber_fkey"
            columns: ["subscriber"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_follower_subscription_fkey"
            columns: ["subscription"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          audio: string | null
          conversation_id: string
          created_at: string
          edit: boolean
          id: string
          image: string | null
          parent: string | null
          pending: boolean
          received: boolean
          sent: boolean
          sytem: boolean
          text: string
          user_id: string
          video: string | null
        }
        Insert: {
          audio?: string | null
          conversation_id: string
          created_at?: string
          edit?: boolean
          id?: string
          image?: string | null
          parent?: string | null
          pending?: boolean
          received?: boolean
          sent?: boolean
          sytem?: boolean
          text: string
          user_id: string
          video?: string | null
        }
        Update: {
          audio?: string | null
          conversation_id?: string
          created_at?: string
          edit?: boolean
          id?: string
          image?: string | null
          parent?: string | null
          pending?: boolean
          received?: boolean
          sent?: boolean
          sytem?: boolean
          text?: string
          user_id?: string
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_message_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          body: string
          created_at: string
          expo_push_token: string
          id: string
          state: boolean
          title: string
          url: string
        }
        Insert: {
          body: string
          created_at?: string
          expo_push_token: string
          id?: string
          state?: boolean
          title: string
          url: string
        }
        Update: {
          body?: string
          created_at?: string
          expo_push_token?: string
          id?: string
          state?: boolean
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_expo_push_token_fkey"
            columns: ["expo_push_token"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["expo_push_token"]
          },
        ]
      }
      payment: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_payment_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_payment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          category_id: string
          created_at: string
          description: string
          id: string
          image: string
          image_path: string | null
          status: boolean
          title: string
          user_id: string
          view: number
        }
        Insert: {
          category_id?: string
          created_at?: string
          description: string
          id?: string
          image: string
          image_path?: string | null
          status?: boolean
          title: string
          user_id?: string
          view?: number
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          image?: string
          image_path?: string | null
          status?: boolean
          title?: string
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_post_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          address: string | null
          auth_id: string
          avatar: string | null
          avatar_path: string | null
          birthday: string | null
          certified: boolean
          created_at: string
          description: string | null
          email: string
          expo_push_token: string | null
          firstname: string | null
          id: string
          lastname: string | null
          order_number: string | null
          phone_number: string
          sex: string | null
          show_email: boolean
          show_phone: boolean
          speciality: string | null
          type: string
          website: string | null
        }
        Insert: {
          address?: string | null
          auth_id?: string
          avatar?: string | null
          avatar_path?: string | null
          birthday?: string | null
          certified?: boolean
          created_at?: string
          description?: string | null
          email: string
          expo_push_token?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          order_number?: string | null
          phone_number: string
          sex?: string | null
          show_email?: boolean
          show_phone?: boolean
          speciality?: string | null
          type?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          auth_id?: string
          avatar?: string | null
          avatar_path?: string | null
          birthday?: string | null
          certified?: boolean
          created_at?: string
          description?: string | null
          email?: string
          expo_push_token?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          order_number?: string | null
          phone_number?: string
          sex?: string | null
          show_email?: boolean
          show_phone?: boolean
          speciality?: string | null
          type?: string
          website?: string | null
        }
        Relationships: []
      }
      views: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_bookmark_post: {
        Args: {
          userid: string
          postid: string
        }
        Returns: boolean
      }
      set_follow_user: {
        Args: {
          subscriberid: string
          subscriptionid: string
        }
        Returns: boolean
      }
      set_like_post: {
        Args: {
          userid: string
          postid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
