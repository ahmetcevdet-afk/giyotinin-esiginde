import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileCompletion from "../components/Profile/ProfileCompletion";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileAbout from "../components/Profile/ProfileAbout";
import ProfileEducation from "../components/Profile/ProfileEducation";
import ProfileLinks from "../components/Profile/ProfileLinks";
import ProfileActions from "../components/Profile/ProfileActions";

import { useAuth } from "../contexts/AuthContext";

function Profile({

    theme,

    setTheme,

}) {

    const {

        profile,

        loading,

    } = useAuth();

    if (loading) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container">

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

    return (

        <>

            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container profile-page">

                <ProfileHeader
                    profile={profile}
                />

                <ProfileCompletion
                    profile={profile}
                />

                <ProfileStats
                    profile={profile}
                />

                <ProfileAbout
                    profile={profile}
                />

                <ProfileEducation
                    profile={profile}
                />

                <ProfileLinks
                    profile={profile}
                />

                <ProfileActions />

            </main>

            {/* Footer ile içerik arasındaki boşluğu korur */}
            <main
                className="container profile-page-spacer"
                aria-hidden="true"
            />

            <Footer
                theme={theme}
            />

        </>

    );

}

export default Profile;