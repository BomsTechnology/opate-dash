
export interface Post {
   
    category_id: string
          created_at: string
          description: string
          id: string
          image: string
          image_path: string | null
          status: boolean
          title: string
          user_id: string
          user: {
            id: string
            firstname: string
            lastname: string
          }
          category: {
            id: string
            name_fr: string
            name_en: string
          }
          view: number
}