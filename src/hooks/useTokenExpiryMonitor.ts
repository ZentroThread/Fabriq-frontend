// import { useEffect } from "react";
// import { useAuthStore } from "@/store/user-auth-store";

// /**
//  * Hook to monitor token expiration and handle automatic logout
//  * Checks every minute if tokens need refreshing or if session expired
//  */
// export function useTokenExpiryMonitor() {
//   const logout = useAuthStore((state) => state.logout);
//   const tokenExpiryTime = useAuthStore((state) => state.tokenExpiryTime);
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

//   useEffect(() => {
//     if (!isAuthenticated || !tokenExpiryTime) {
//       return;
//     }

//     const checkTokenExpiry = () => {
//       const now = Date.now();
//       const timeUntilExpiry = tokenExpiryTime - now;

//       // If token expired (shouldn't happen due to auto-refresh, but safety check)
//       if (timeUntilExpiry <= 0) {
//         console.warn("⚠️ Token expired - logging out");
//         logout();
//         return;
//       }

//       // Log time remaining (for debugging)
//       const minutesRemaining = Math.floor(timeUntilExpiry / 60000);
//       if (minutesRemaining <= 5) {
//         
//       }
//     };

//     // Check immediately
//     checkTokenExpiry();

//     // Check every minute
//     const interval = setInterval(checkTokenExpiry, 60000);

//     return () => clearInterval(interval);
//   }, [isAuthenticated, tokenExpiryTime, logout]);
// }
