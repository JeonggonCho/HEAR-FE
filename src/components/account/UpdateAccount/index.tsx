const UpdateAccount = () => {
    return (
        <></>
    );
};

export default UpdateAccount;

// confirm 모달에서 수정하기 클릭 시, 수정 요청 보내기
// const handleConfirmUpdate = async () => {
//     if (!formData) return;
//     try {
//         await sendRequest({
//             url: "/users",
//             method: "patch",
//             data: formData,
//         });
//         showToast(messageCategories.updateAccountDone[lang], "success");
//         navigate("/account", {replace: true});
//     } catch (err) {
//         setUpdateAccountModal(false);
//         console.error("내 정보 변경 중 에러 발생: ", err);
//     }
// };

// 내 정보 변경 확인 모달 컨텐츠
// const UpdateAccountModalContent = () => (
//     <ModalConfirmContent
//         text={messageCategories.confirmUpdateAccount[lang]}
//         leftBtn={
//             <Button
//                 type={"button"}
//                 content={buttonCategories.close[lang]}
//                 width={"full"}
//                 color={"third"}
//                 scale={"normal"}
//                 onClick={() => {setUpdateAccountModal(false)}}
//             />
//         }
//         rightBtn={
//             <Button
//                 type={"submit"}
//                 content={buttonCategories.changing[lang]}
//                 width={"full"}
//                 color={"approval"}
//                 scale={"normal"}
//                 onClick={handleConfirmUpdate}
//             />
//         }
//     />
// );