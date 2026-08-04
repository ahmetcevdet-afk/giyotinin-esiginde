import "./ProfileAbout.css";

function ProfileAbout({ profile }) {

    return (

        <section className="profile-about">

            <div className="profile-card">

                <h2>

                    Hakkımda

                </h2>

                {profile?.bio ? (

                    <p>

                        {profile.bio}

                    </p>

                ) : (

                    <p className="empty-text">

                        Henüz bir biyografi eklenmemiş.

                    </p>

                )}

            </div>

        </section>

    );

}

export default ProfileAbout;