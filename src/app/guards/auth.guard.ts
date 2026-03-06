import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const authGuard: CanActivateFn = () =>{

    const logged = inject(AuthService).isLoggedIn();
    const router = inject(Router);
    
    if (logged){
        return true;
    } else{
        router.navigate(['/login']);
        return false;
    }
}