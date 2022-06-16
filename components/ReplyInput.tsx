/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { createReply, getReply, updateReply } from '../api/reply';

type Props = {
    isUpdate: boolean;
    itemInfoId?: string;
    replyId?: number;
    addReply: Function;
    closeUpdateInput?: Function;
};

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const [currReply, setCurrReply] = useState<any>();
    const [password, setPassword] = useState<string>();
    const [hasPassword, setHasPassword] = useState<boolean>(false);

    useEffect(() => {
        if (props.isUpdate) {
            getReply(props.replyId).then((res) => {
                setCurrReply(res.content);
            });
        }
    }, []);

    const onClickWriteReply = (e: any) => {
        if (props.replyId) {
            updateReply(props?.replyId, currReply, password).then((res) => {
                if (res.status === 500) {
                    window.alert(res.message);
                } else {
                    props.addReply();
                    setCurrReply('');
                    props.closeUpdateInput!== undefined && props.closeUpdateInput();
                }
            });
            setPassword('');
        } else {
            createReply(
                props.itemInfoId,
                currReply,
                password,
                hasPassword,
            ).then((res) => {
                if (res.status === 500) {
                    window.alert(res.message);
                } else {
                    props.addReply();
                }
            });
            setCurrReply('');
            setPassword('');
        }
    };

    const enterKeyPress = (e: any) => {
        if (e.key == 'Enter') {
            onClickWriteReply(e);
        }
    };
    return (
        <>
            <CustomInput
                placeholder="상품의 한줄평을 입력해주세요"
                value={currReply}
                onChange={(e) => setCurrReply(e.target.value)}
                onKeyPress={enterKeyPress}
            ></CustomInput>
            <FlexEndRow>
                {!props.isUpdate && (
                    <input
                        type="checkBox"
                        onChange={() => setHasPassword(!hasPassword)}
                    />
                )}
                {(hasPassword ||
                    props.isUpdate) && (
                        <PasswordInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    )}
                <CustomButton onClick={onClickWriteReply}>
                    {props.isUpdate ? '한줄평 수정' : '한줄평 작성'}
                </CustomButton>
            </FlexEndRow>
        </>
    );
};

const CustomInput = styled('input')`
    width: 800px;
    height: 80px;
    padding: 4px;
    border: 1px solid rgb(233, 236, 239);
    margin-bottom: 1.5rem;
    border-radius: 4px;
`;

const PasswordInput = styled('input')`
    width: 95px;
    height: 30px;
    margin-right: 10px;
    border: 1px solid black;
`;

const FlexEndRow = styled('div')`
    width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const CancelButton = styled('button')`
    width: 100px;
    height: 35px;
    background-color: white;
    border: 1px solid rgb(54, 76, 99);
    color: black;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 30px;
`;

const CustomButton = styled('button')`
    width: 100px;
    height: 35px;
    background-color: rgb(54, 76, 99);
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
`;

export default Component;
