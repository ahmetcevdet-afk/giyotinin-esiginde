import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchProfile(userId) {

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {

            console.error(error);

            setProfile(null);

            return;

        }

        setProfile(data);

    }

    useEffect(() => {

        async function getSession() {

            const { data } =
                await supabase.auth.getSession();

            const currentSession =
                data.session;

            setSession(currentSession);

            setUser(currentSession?.user ?? null);

            if (currentSession?.user) {

                await fetchProfile(
                    currentSession.user.id
                );

            } else {

                setProfile(null);

            }

            setLoading(false);

        }

        getSession();

        const {

            data: {

                subscription,

            },

        } = supabase.auth.onAuthStateChange(

            async (event, session) => {

                setSession(session);

                setUser(session?.user ?? null);

                if (session?.user) {

                    await fetchProfile(
                        session.user.id
                    );

                } else {

                    setProfile(null);

                }

                setLoading(false);

            }

        );

        return () => subscription.unsubscribe();

    }, []);

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <AuthContext.Provider
            value={{

                user,

                profile,

                session,

                loading,

                logout,

                refreshProfile: () =>
                    fetchProfile(user.id),

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}