<script setup lang="ts">
import { RegisterValidationSchema } from "../schemas/ResgisterSchema";
import type { Database } from "../types/database.types";
import { useToast } from '@/components/ui/toast/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

definePageMeta({
  layout: "login",
});

const router = useRouter();
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const {toast} = useToast();
const loading = ref(false);

async function onSubmit(values: any) {
  try {
    loading.value = true;
    const { data: user, error: e } = await supabase.from("user").select('*').eq("email", values.email!).single();
    if (e) throw e; 
    if(user.type === 'admin'){
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email!,
        password: values.password!,
      });
      if (error) throw error;
      toast({ title: "Logged in" });
      router.replace("/dashboard");
    }else{
        toast({
          title: 'You must be an admin',
          variant: 'destructive',
        });
      }
  } catch (error) {
    toast({
      title: "Email or Password is incorrect",
      variant: 'destructive',
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (user.value) {
    router.replace("/dashboard");
  }
});
</script>

<template>
  <Card>
    
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your information to login</CardDescription>
    </CardHeader>
    <CardContent>
      <Form :validation-schema="RegisterValidationSchema" class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email" >
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="you@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="**********"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full mt-6" :disabled="loading"> <span v-if="loading">Loading</span> <span v-else>Login</span> </Button></Form
      >
    </CardContent>
  </Card>
</template>
