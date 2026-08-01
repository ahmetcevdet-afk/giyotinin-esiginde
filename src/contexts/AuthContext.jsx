import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getSession() {

            const { data } = await supabase.auth.getSession();

            setSession(data.session);
            setUser(data.session?.user ?? null);

            setLoading(false);

        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {

            setSession(session);
            setUser(session?.user ?? null);

            setLoading(false);

        });

        return () => subscription.unsubscribe();

    }, []);

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}