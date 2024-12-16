import {useContext} from "react";
import Icon from "@components/common/Icon";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import UsersManagementFilterContent from "@components/management/UsersManagementFilterContent";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import UsersManagementFilterContext from "@context/UsersManagementFilterContext.ts";
import {Badge} from "@components/management/UsersManagementFilter/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import tune from "@assets/icons/tune.svg";


const UsersManagementFilter = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {filter, setFilter} = useContext(UsersManagementFilterContext)

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <div onClick={() => setShowModal(true)}>
                    {!(filter.year.includes("all") && filter.countOfWarning.includes("all") && filter.passEducation.includes("all")) &&
                      <Badge/>
                    }
                    <Icon svg={tune}/>
                </div>
            }
            header={headerCategories.userFilter[lang]}
            body={
                <UsersManagementFilterContent
                    filter={filter}
                    setFilter={setFilter}
                    setModal={setShowModal}
                />
            }
        />
    );
};

export default UsersManagementFilter;