import "./EditProfileForm.css";

function ProfileBasicSection({

    form,

    onChange,

}) {

    return (

        <>

            {/* ==========================================
                TEMEL BİLGİLER
            ========================================== */}

            <div className="profile-card">

                <h2>

                    Temel Bilgiler

                </h2>

                <label>

                    Ad Soyad

                    <input
                        name="full_name"
                        value={form.full_name}
                        onChange={onChange}
                        placeholder="Ad Soyad"
                    />

                </label>

                <label>

                    Kullanıcı Adı

                    <input
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        placeholder="Kullanıcı Adı"
                    />

                </label>

            </div>

            {/* ==========================================
                HAKKIMDA
            ========================================== */}

            <div className="profile-card">

                <h2>

                    Hakkımda

                </h2>

                <label>

                    Biyografi

                    <textarea
                        rows="6"
                        name="bio"
                        value={form.bio}
                        onChange={onChange}
                        placeholder="Kendinizden bahsedin..."
                    />

                </label>

            </div>

            {/* ==========================================
                EĞİTİM
            ========================================== */}

            <div className="profile-card">

                <h2>

                    Eğitim

                </h2>

                <label>

                    Eğitim Durumu

                    <select
                        name="education_level"
                        value={form.education_level}
                        onChange={onChange}
                    >

                        <option value="">
                            Eğitim Durumu Seçiniz
                        </option>

                        <option value="Lise">
                            Lise
                        </option>

                        <option value="Ön Lisans">
                            Ön Lisans
                        </option>

                        <option value="Lisans">
                            Lisans
                        </option>

                        <option value="Yüksek Lisans">
                            Yüksek Lisans
                        </option>

                        <option value="Doktora">
                            Doktora
                        </option>

                        <option value="Bağımsız Araştırmacı">
                            Bağımsız Araştırmacı
                        </option>

                        <option value="Diğer">
                            Diğer
                        </option>

                    </select>

                </label>

                <label>

                    Alan / Bölüm

                    <input
                        name="field"
                        value={form.field}
                        onChange={onChange}
                        placeholder="Bilgisayar Bilimleri"
                    />

                </label>

                <label>

                    Kurum (Opsiyonel)

                    <input
                        name="institution"
                        value={form.institution}
                        onChange={onChange}
                        placeholder="Harvard University"
                    />

                </label>

            </div>

        </>

    );

}

export default ProfileBasicSection;