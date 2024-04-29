const user = useSupabaseUser();
export default defineNuxtRouteMiddleware((to, from) => {
    if(!user.value){
        return navigateTo('/')
    }
})