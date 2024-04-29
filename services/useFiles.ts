import type { Database } from "~/types/database.types";
import { useToast } from '@/components/ui/toast/use-toast'

export default function useFiles() {
    const supabase  = useSupabaseClient<Database>();
    const {toast} = useToast();
    const uploadFile = async (file: File) => {

        try {      
            if (!file) {
              throw new Error('You must select an image to upload.')
            }
        
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`
        
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
        
            if (uploadError) throw uploadError;
            let url = await getUrl(filePath);

            return {
                path: filePath,
                url: url
            }
        
          } catch (error) {
            toast({ title: (error as Error).message, variant: 'destructive' })
          } 
        
    }

    const deleteFile = async (path: string) => {
        try {
          const { error } = await supabase.storage.from('images').remove([path])
          if (error) throw error
        } catch (error) {
            toast({ title: (error as Error).message, variant: 'destructive' })
        }
      }

    const getUrl = async (path: string) => {
        try {
          const { data } = await supabase.storage.from('images').getPublicUrl(path)
          return data.publicUrl
        } catch (error) {
            toast({ title: (error as Error).message, variant: 'destructive' })
        }
      }

    const downloadImage = async (path: string) => {
        try {
          const { data, error } = await supabase.storage.from('images').download(path)
          if (error) throw error
          return URL.createObjectURL(data)
        } catch (error) {
            toast({ title: (error as Error).message, variant: 'destructive' })
        }
      }
    return {
        uploadFile,
        deleteFile
    }
}