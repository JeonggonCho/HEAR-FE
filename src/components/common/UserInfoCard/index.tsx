import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import ProfileImage from "@components/common/ProfileImage";
import Flex from "@components/common/Flex";
import Grid from "@components/common/Grid";
import Icon from "@components/common/Icon";
import DeleteUser from "@components/management/DeleteUser";
import HandoverUser from "@components/management/HandoverUser";
import useRequest from "@hooks/useRequest.ts";
import WarningSchemaProvider from "@schemata/WarningSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {FieldWrapper, PassTag, PassWrapper, TableWrapper, UsernameWrapper, WarningWrapper} from "./style.ts";
import {IUserInfo} from "@/types/user.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import close from "@assets/icons/close.svg";


interface IUserInfoContentProps {
    userId: string;
    setModal: Dispatch<SetStateAction<boolean>>;
    onUserInfoUpdate?: (updatedUser: IUserInfo) => void;
}


const UserInfoCard = (
    {
        userId,
        setModal,
        onUserInfoUpdate,
    }: IUserInfoContentProps
) => {
    const [user, setUser] = useState<IUserInfo>();
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {warningSchema} = WarningSchemaProvider();

    type WarningFormData = z.infer<typeof warningSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<WarningFormData>({
        resolver: zodResolver(warningSchema),
        defaultValues: {
            message: "",
        },
    });

    // 유저 정보 요청하기
    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/${userId}`
            });
            setUser(response.data);
        } catch (err) {
            console.error("유저 정보 요청 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // 경고 부과하기
    const handleAddWarning = useCallback(async (data: WarningFormData) => {
        if (isLoading) return;
        try {
            const response = await sendRequest({
                url: `/users/warning/add/${userId}`,
                method: "patch",
                data: {...data, countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                const updatedUser = {...user, countOfWarning: response.data.countOfWarning as number};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("경고 부과 중 에러 발생: ", err);
        } finally {
            setShowWarning(false);
            reset({message: "",});
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 경고 차감하기
    const handleMinusWarning = useCallback(async () => {
        if (isLoading) return;
        try {
            const response = await sendRequest({
                url: `/users/warning/minus/${userId}`,
                method: "patch",
                data: {countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                const updatedUser = {...user, countOfWarning: response.data.countOfWarning as number};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("경고 차감 중 에러 발생: ", err);
        } finally {
            setShowWarning(false);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 교육 이수 처리하기
    const handlePassEducation = useCallback(async () => {
        if (isLoading) return;
        if (user?.passEducation === true) {
            console.error("이미 교육 이수가 완료된 상태입니다.");
            return;
        }
        try {
            const response = await sendRequest({
                url: `/users/education/pass/${userId}`,
                method: "patch",
                data: {passEducation: false},
            });
            if (response.data.passEducation === true) {
                const updatedUser = {...user, passEducation: response.data.passEducation as boolean};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("교육 이수 처리 중 에러 발생: ", err);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 교육 미이수 처리하기
    const handleResetEducation = useCallback(async () => {
        if (isLoading) return;
        if (user?.passEducation === false) {
            console.error("이미 교육 미이수가 완료된 상태입니다.");
            return;
        }
        try {
            const response = await sendRequest({
                url: `/users/education/reset/${userId}`,
                method: "patch",
                data: {passEducation: true},
            });
            if (response.data.passEducation === false) {
                const updatedUser = {...user, passEducation: response.data.passEducation as boolean};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("교육 미이수 처리 중 에러 발생: ", err);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    return (
        <>
            {user &&
              <>
                <Button
                  type={"button"}
                  variant={"filled"}
                  width={"fit"}
                  color={"third"}
                  size={"sm"}
                  onClick={() => setModal(false)}
                  style={{
                      position: "absolute",
                      right: "12px",
                      padding: "4px",
                      borderRadius: "50%",
                  }}
                >
                  <Icon svg={close} size={22} isHovered={true}/>
                </Button>

                <Flex
                  direction={"column"}
                  align={"center"}
                  gap={12}
                  style={{margin: "12px auto 24px"}}
                >
                  <ProfileImage size={64}/>
                  <UsernameWrapper>{user?.username}</UsernameWrapper>
                </Flex>


                <TableWrapper>
                  <FieldWrapper>
                    <div>{inputCategories.year[lang]}</div>
                    <span>{user?.year}</span>
                  </FieldWrapper>

                  <FieldWrapper>
                    <div>{inputCategories.studentId[lang]}</div>
                    <span>{user?.studentId}</span>
                  </FieldWrapper>

                  <FieldWrapper>
                    <div>{cardCategories.email[lang]}</div>
                    <span>{user?.email}</span>
                  </FieldWrapper>

                  <FieldWrapper>
                    <div>{inputCategories.tel[lang]}</div>
                    <span>{user?.tel}</span>
                  </FieldWrapper>

                  <FieldWrapper>
                    <div>{cardCategories.studio[lang]}</div>
                    <span>{user?.studio}</span>
                  </FieldWrapper>

                  <WarningWrapper>
                    <div>{inputCategories.warning[lang]}</div>
                      {showWarning ?
                          <form onSubmit={handleSubmit(handleAddWarning)}>
                              <Input
                                  type={"text"}
                                  id={"warning-message"}
                                  name={"message"}
                                  register={register}
                                  placeholder={placeholderCategories.reason[lang]}
                                  errorMessage={errors.message?.message}
                              />
                              <div>
                                  <Button
                                      type={"button"}
                                      variant={"filled"}
                                      width={"full"}
                                      color={"third"}
                                      size={"sm"}
                                      onClick={() => {
                                          setShowWarning(false);
                                          reset({message: "",});
                                      }}
                                  >
                                      {buttonCategories.cancel[lang]}
                                  </Button>
                                  <Button
                                      type={"submit"}
                                      variant={"filled"}
                                      width={"full"}
                                      color={"danger"}
                                      size={"sm"}
                                  >
                                      {buttonCategories.imposition[lang]}
                                  </Button>
                              </div>
                          </form>
                          :
                          <div>
                              <span>{user?.countOfWarning}</span>
                              <Flex align={"center"} gap={6}>
                                  {(user?.countOfWarning > 0) &&
                                    <Button
                                      type={"button"}
                                      variant={"filled"}
                                      width={"fit"}
                                      color={"third"}
                                      size={"sm"}
                                      onClick={handleMinusWarning}
                                    >
                                        {buttonCategories.deduction[lang]}
                                    </Button>
                                  }
                                  {(user?.countOfWarning < 2) &&
                                    <Button
                                      type={"button"}
                                      variant={"filled"}
                                      width={"fit"}
                                      color={"danger"}
                                      size={"sm"}
                                      onClick={() => setShowWarning(true)}
                                    >
                                        {buttonCategories.imposition[lang]}
                                    </Button>
                                  }
                              </Flex>
                          </div>
                      }
                  </WarningWrapper>

                  <PassWrapper>
                    <div>{inputCategories.status[lang]}</div>
                    <div>
                      <PassTag
                        pass={user?.passEducation || false}
                      >
                          {user?.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}
                      </PassTag>
                      <Flex align={"center"} gap={6}>
                          {!user?.passEducation && (
                              <Button
                                  type={"button"}
                                  variant={"filled"}
                                  width={"fit"}
                                  color={"third"}
                                  size={"sm"}
                                  onClick={handlePassEducation}
                              >
                                  {buttonCategories.pass[lang]}
                              </Button>
                          )}
                          {user?.passEducation && (
                              <Button
                                  type={"button"}
                                  variant={"filled"}
                                  width={"fit"}
                                  color={"third"}
                                  size={"sm"}
                                  onClick={handleResetEducation}
                              >
                                  {buttonCategories.fail[lang]}
                              </Button>
                          )}
                      </Flex>
                    </div>
                  </PassWrapper>
                </TableWrapper>

                <Grid align={"center"} columns={2} gap={12}>
                  <DeleteUser userId={userId}/>
                  <HandoverUser userId={userId}/>
                </Grid>
              </>
            }
        </>
    );
};

export default UserInfoCard;