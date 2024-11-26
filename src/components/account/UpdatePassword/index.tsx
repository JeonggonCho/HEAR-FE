const UpdatePassword = () => {
    return (
        <></>
    );
};

export default UpdatePassword;

// {updatePasswordModal &&
//     <Index
//         content={<UpdatePasswordModalContent/>}
//         setModal={setUpdatePasswordModal}
//         type={"popup"}
//     />
// }


// 비밀번호 변경 요청
// const handleConfirmUpdate = useCallback(async () => {
//     if (!formData) return;
//     try {
//         await sendRequest({
//             url: "/users/password",
//             method: "patch",
//             data: formData,
//         });
//         showToast(messageCategories.updatePasswordDone[lang], "success");
//         navigate("/account", {replace: true});
//     } catch (err) {
//         console.error("비밀번호 변경 중 에러 발생: ", err);
//     } finally {
//         setUpdatePasswordModal(false);
//     }
// }, [formData, sendRequest, setUpdatePasswordModal, showToast, navigate]);



// 비밀번호 변경 확인 모달 컨텐츠
// const UpdatePasswordModalContent = () => (
//     <ModalConfirmContent
//         text={messageCategories.confirmUpdatePassword[lang]}
//         leftBtn={
//             <Button
//                 type={"button"}
//                 content={buttonCategories.close[lang]}
//                 width={"full"}
//                 color={"third"}
//                 scale={"normal"}
//                 onClick={() => setUpdatePasswordModal(false)}
//             />
//         }
//         rightBtn={
//             <Button
//                 type={"submit"}
//                 content={buttonCategories.editing[lang]}
//                 width={"full"}
//                 color={"approval"}
//                 scale={"normal"}
//                 onClick={handleConfirmUpdate}
//             />
//         }
//     />
// );