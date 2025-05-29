import { FC, memo } from "react";
import ProfileEdit from "../components/profile-edit/profile-edit";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

const ProfilePage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    return (
        <>
            {isMobile && (
                <h3 className="text text_type_main-large mb-6 align-center">
                    Профиль
                </h3>
            )}
            <ProfileEdit />
        </>
    );
};

export default memo(ProfilePage);
