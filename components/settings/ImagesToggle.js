import React, { useContext } from "react";
import UserSettingsContext, {
    SETTINGS,
} from "../../contexts/UserSettingsContext";

export default function ImagesToggle() {
    const { showImages, setUserSetting } = useContext(UserSettingsContext);

    const onChange = () => setUserSetting(SETTINGS.SHOW_IMAGES, !showImages);

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showImages}
                    onChange={onChange}
                />
                Show Images
            </label>
            <small>
                Warning: Images are not optimised for mobile. Don&apos;t enable
                this feature if data usage is a concern.
            </small>
        </>
    );
}
