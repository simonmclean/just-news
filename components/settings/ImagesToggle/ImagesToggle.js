import React, { useContext } from "react";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import ToggleSwitch from "../../web-component-wrappers/ToggleSwitch";
import css from "./ImagesToggle.module.css";

export default function ImagesToggle({ className }) {
    const { showImages, setUserSetting } = useContext(UserSettingsContext);

    const onChange = () => setUserSetting(SETTINGS.SHOW_IMAGES, !showImages);

    return (
        <div className={className}>
            <label className={css.label}>
                <span className={css.labelText}>Show Images</span>
                <ToggleSwitch checked={showImages} onChange={onChange} />
            </label>
            <small className={css.smallPrint}>
                Warning: Images are not optimised for mobile. Don&apos;t enable
                this feature if data usage is a concern.
            </small>
        </div>
    );
}
