import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import EditProfileForm from "../components/Profile/EditProfileForm";

import { useAuth } from "../contexts/AuthContext";

import "./EditProfile.css";

function EditProfile({

    theme,

    setTheme,

}) {

    const {

        loading,
        profile,

    } = useAuth();

    if (loading) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container edit-profile-page">

                    <section className="edit-profile-header">

                        <h1>

                            Profil Düzenle

                        </h1>

                        <p>

                            Profil bilgileri yükleniyor...

                        </p>

                    </section>

                </main>
                <div className="edit-profile-progress">

    <div className="edit-profile-progress-top">

        <span>

            Profil Tamamlanma

        </span>

        <strong>

            %{profile?.profile_completed ? 100 : 40}

        </strong>

    </div>

    <div className="edit-profile-progress-bar">

        <div

            className="edit-profile-progress-fill"

            style={{

                width: profile?.profile_completed
                    ? "100%"
                    : "40%",

            }}

        />

    </div>

</div>
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

            <main className="container edit-profile-page">

                <section className="edit-profile-header">

                    <h1>

                        Profili Düzenle

                    </h1>

                    <p>

                        Hesabını kişiselleştir, akademik
                        bilgilerini güncelle ve yayın yapmaya
                        hazır hale gel.

                    </p>

                </section>

                <EditProfileForm />

            </main>

            <Footer
                theme={theme}
            />

        </>

    );

}

export default EditProfile;