import { countries } from "../../lib/countries";

import "./EditProfileForm.css";

function ProfileContactSection({

    form,

    onChange,

}) {

    return (

        <div className="profile-card">

            <h2>

                İletişim ve Bağlantılar

            </h2>

            <label>

                Ülke

                <select
                    name="country"
                    value={form.country}
                    onChange={onChange}
                >

                    <option value="">

                        🌍 Ülke Seçiniz

                    </option>

                    {countries.map((country) => (

                        <option
                            key={country.code}
                            value={country.name}
                        >

                            {country.flag} {country.name}

                        </option>

                    ))}

                </select>

            </label>

            <label>

                Kişisel Website

                <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    placeholder="https://example.com"
                />

            </label>

            <label>

                LinkedIn

                <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={onChange}
                    placeholder="https://linkedin.com/in/..."
                />

            </label>

            <label>

                ORCID

                <input
                    name="orcid"
                    value={form.orcid}
                    onChange={onChange}
                    placeholder="0000-0000-0000-0000"
                />

            </label>

            <small>

                ORCID hesabı yalnızca yazı yayımlamak isteyen
                araştırmacılar için gereklidir.
                Profil oluşturmak için zorunlu değildir.

            </small>

        </div>

    );

}

export default ProfileContactSection;