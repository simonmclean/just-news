import React, { useContext } from "react";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import css from "./ImagesToggle.module.css";

export default function ImagesToggle({ className }) {
    const { showImages, setUserSetting } = useContext(UserSettingsContext);

    const onChange = () => setUserSetting(SETTINGS.SHOW_IMAGES, !showImages);

    // TODO: Use toggle switch input of checkbox
    return (
        <div className={className}>
            <label className={css.label}>
                <span className={css.labelText}>Show Images</span>
                <input
                    type="checkbox"
                    checked={showImages}
                    onChange={onChange}
                />
            </label>
            <small className={css.smallPrint}>
                Warning: Images are not optimised for mobile. Don&apos;t enable
                this feature if data usage is a concern.
            </small>
        </div>
    );
}
