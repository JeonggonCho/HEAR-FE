import {useContext} from "react";
import Icon from "@components/common/Icon";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import EducationManagementMenuContent from "@components/management/EducationManagementMenuContent";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationManagementContext from "@context/EducationManagementContext.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import tune from "@assets/icons/tune.svg";


const EducationManagementMenu = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {
        settings,
        setSettings,
        initialDateSetting,
        setInitialDateSetting,
        initialCutOffPoint,
        setInitialCutOffPoint
    } = useContext(EducationManagementContext);

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Icon svg={tune} onClick={() => setShowModal(true)}/>
            }
            header={headerCategories.educationSettings[lang]}
            body={
                <EducationManagementMenuContent
                    settings={settings}
                    setSettings={setSettings}
                    initialDateSetting={initialDateSetting}
                    setInitialDateSetting={setInitialDateSetting}
                    initialCutOffPoint={initialCutOffPoint}
                    setInitialCutOffPoint={setInitialCutOffPoint}
                />
            }
        />
    );
};

export default EducationManagementMenu;