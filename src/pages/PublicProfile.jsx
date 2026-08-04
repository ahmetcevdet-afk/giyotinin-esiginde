import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { supabase } from "../lib/supabase";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileAbout from "../components/Profile/ProfileAbout";
import ProfileEducation from "../components/Profile/ProfileEducation";
import ProfileLinks from "../components/Profile/ProfileLinks";

import "./Profile.css";

function PublicProfile({

    theme,

    setTheme,

}) {

    const { username } = useParams();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {

        async function fetchProfile() {

            setLoading(true);

            setNotFound(false);

            const {

                data,

                error,

            } = await supabase

                .from("profiles")

                .select("*")

                .eq("username", username.toLowerCase())

                .maybeSingle();

            if (error || !data) {

                console.error(error);

                setNotFound(true);

                setLoading(false);

                return;

            }

            setProfile(data);

            setLoading(false);

        }

        fetchProfile();

    }, [username]);

    if (loading) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container profile-page">

                    <p>

                        Profil yükleniyor...

                    </p>

                </main>

                <Footer
                    theme={theme}
                />

            </>

        );

    }

    if (notFound) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container profile-page">

                    <div className="profile-card">

                        <h2>

                            Kullanıcı Bulunamadı

                        </h2>

                        <p>

                            Aradığınız kullanıcı mevcut değil.

                        </p>

                    </div>

                </main>

                <Footer
                    theme={theme}
                />

            </>

        );

    }

    return (

        <>

            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container profile-page">

                {/* ==========================================
                    HEADER
                ========================================== */}

                <ProfileHeader

                    profile={profile}

                    isOwner={false}

                />

                {/* ==========================================
                    STATS
                ========================================== */}

                <ProfileStats
                    profile={profile}
                />

                {/* ==========================================
                    ABOUT
                ========================================== */}

                <ProfileAbout
                    profile={profile}
                />

                {/* ==========================================
                    LOWER GRID
                ========================================== */}

                <div className="profile-layout">

                    <div className="profile-left">

                        <ProfileEducation
                            profile={profile}
                        />

                        <ProfileLinks
                            profile={profile}
                        />

                    </div>

                </div>

            </main>

            <div
                className="profile-page-spacer"
                aria-hidden="true"
            />

            <Footer
                theme={theme}
            />

        </>

    );

}

export default PublicProfile;