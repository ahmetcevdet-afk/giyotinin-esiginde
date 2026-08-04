import { Link } from "react-router-dom";
import {
    UserPen,
    Settings,
    FilePlus2,
} from "lucide-react";

import "./ProfileActions.css";

function ProfileActions() {

    return (

        <section className="profile-actions">

            <div className="profile-card">

                <h2>

                    Hızlı İşlemler

                </h2>

                <div className="profile-actions-grid">

                    <Link
                        to="/profile/edit"
                        className="profile-action"
                    >

                        <UserPen size={22}/>

                        <div>

                            <strong>

                                Profili Düzenle

                            </strong>

                            <span>

                                Bilgilerini güncelle.

                            </span>

                        </div>

                    </Link>

                    <Link
                        to="/editor"
                        className="profile-action"
                    >

                        <FilePlus2 size={22}/>

                        <div>

                            <strong>

                                Yeni Makale

                            </strong>

                            <span>

                                Yeni bir araştırma oluştur.

                            </span>

                        </div>

                    </Link>

                    <Link
                        to="/settings"
                        className="profile-action"
                    >

                        <Settings size={22}/>

                        <div>

                            <strong>

                                Hesap Ayarları

                            </strong>

                            <span>

                                Güvenlik ve tercihleri yönet.

                            </span>

                        </div>

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default ProfileActions;