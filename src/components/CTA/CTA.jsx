import { useAuth } from "../../contexts/AuthContext";

import { calculateProfileCompletion } from "../../utils/profileCompletion";

import GuestCTA from "./GuestCTA";
import CompleteProfileCTA from "./CompleteProfileCTA";
import MemberCTA from "./MemberCTA";

function CTA() {

    const {
        user,
        profile,
    } = useAuth();


    /* ==========================================
       GUEST
    ========================================== */

    if (!user) {

        return <GuestCTA />;

    }


    /* ==========================================
       PROFILE COMPLETION
    ========================================== */

    const completion =
        calculateProfileCompletion(profile);


    /* ==========================================
       PROFILE NOT COMPLETE
    ========================================== */

    if (completion < 100) {

        return (

            <CompleteProfileCTA
                profile={profile}
            />

        );

    }


    /* ==========================================
       PROFILE COMPLETE
    ========================================== */

    return <MemberCTA />;

}

export default CTA;