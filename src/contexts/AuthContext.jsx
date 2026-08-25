import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [profile, setProfile] = useState(null);

    const [session, setSession] = useState(null);

    const [loading, setLoading] = useState(true);


    /* ==========================================
       FETCH PROFILE
    ========================================== */

    async function fetchProfile(userId) {

        if (!userId) {

            setProfile(null);

            return null;

        }

        const {
            data,
            error,
        } = await supabase

            .from("profiles")

            .select("*")

            .eq("id", userId)

            .single();


        if (error) {

            console.error(
                "Profil alınamadı:",
                error
            );

            return null;

        }


        setProfile(data);

        return data;

    }


    /* ==========================================
       INITIAL SESSION
    ========================================== */

    useEffect(() => {

        let mounted = true;


        async function getSession() {

            const {
                data,
            } = await supabase.auth.getSession();


            const currentSession =
                data.session;


            if (!mounted) return;


            setSession(currentSession);

            setUser(
                currentSession?.user ?? null
            );


            if (currentSession?.user) {

                await fetchProfile(
                    currentSession.user.id
                );

            } else {

                setProfile(null);

            }


            if (mounted) {

                setLoading(false);

            }

        }


        getSession();


        /* ==========================================
           AUTH STATE
        ========================================== */

        const {

            data: {
                subscription,
            },

        } = supabase.auth.onAuthStateChange(

            async (event, currentSession) => {

                if (!mounted) return;


                setSession(
                    currentSession
                );

                setUser(
                    currentSession?.user ?? null
                );


                if (currentSession?.user) {

                    await fetchProfile(
                        currentSession.user.id
                    );

                } else {

                    setProfile(null);

                }


                if (mounted) {

                    setLoading(false);

                }

            }

        );


        return () => {

            mounted = false;

            subscription.unsubscribe();

        };

    }, []);


    /* ==========================================
       REFRESH PROFILE
    ========================================== */

    async function refreshProfile() {

        if (!user?.id) {

            return null;

        }

        return await fetchProfile(
            user.id
        );

    }


    /* ==========================================
       LOGOUT
    ========================================== */

    async function logout() {

        await supabase.auth.signOut();

    }


    /* ==========================================
       CONTEXT
    ========================================== */

    return (

        <AuthContext.Provider
            value={{

                user,

                profile,

                session,

                loading,

                logout,

                refreshProfile,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


/* ==========================================
   USE AUTH
========================================== */

export function useAuth() {

    return useContext(
        AuthContext
    );

}