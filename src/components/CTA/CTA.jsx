import { useAuth } from "../../contexts/AuthContext";

import GuestCTA from "./GuestCTA";
import CompleteProfileCTA from "./CompleteProfileCTA";
import MemberCTA from "./MemberCTA";

function CTA() {

    const { user } = useAuth();

    if (!user) {

        return <GuestCTA />;

    }

    const profileCompleted =
        user.user_metadata?.profile_completed ?? false;

    if (!profileCompleted) {

        return <CompleteProfileCTA />;

    }

    return <MemberCTA />;

}

export default CTA;