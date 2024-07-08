import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {getAuthData} from "@/utils/getAuthData";


export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const router = useRouter();

        useEffect(() => {
            async function checkAuth() {
                const auth = await getAuthData();
                setIsAuthenticated(auth);
                if (!auth) {
                    router.push('/open');
                }
            }
            checkAuth();
        }, [router]);

        if (isAuthenticated === null) {
            return <p>Loading...</p>; // or any loading indicator
        }

        if (!isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };
}
