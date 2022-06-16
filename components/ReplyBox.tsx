/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { MouseEventHandler,useState } from 'react';
import {
    updateReplyHateCnt,
    updateReplyLikeCnt,
} from '../api/reply';
import { FlexRowCenter } from '../styles/theme';
import ReplyInput from './ReplyInput';
import { ReplyProps } from '../api/type';

type Props = {
    type?: string | undefined;
    reply: ReplyProps;
    itemInfoId?: string | undefined;
    updateReplyId?: number | undefined;
    onClickUpdateReply?: MouseEventHandler<HTMLSpanElement>;
    onClickDeleteReply?: Function;
    closeUpdateInput?: Function;
    addReply: Function;
};

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [password, setPassword] = useState<string>();

    const enterKeyPress = (e: any) => {
        if(e.key == 'Enter'){
            props.onClickDeleteReply !== undefined &&
            props.onClickDeleteReply(props.reply.id, password);
        }
    };
    return (
        <>
            <ReplyWrapper key={props.reply.id}>
                <ReplyInfoWrapper>
                    {props.type === 'Best' || props.type === 'Worst' ? (
                        <BoxWrapper>
                            <BestTitle
                                color={
                                    props.type === 'Best'
                                        ? 'purple'
                                        : 'rgba(51, 178, 158)'
                                }
                            >
                                Best
                                {props.type === 'Best' ? ' 좋아요' : ' 싫어요'}
                            </BestTitle>
                            <TextWrapper hasPassword={true}>
                                {props.reply.content}
                            </TextWrapper>
                        </BoxWrapper>
                    ) : (
                        <BoxWrapper>
                            <TextWrapper hasPassword={props.reply.hasPassword}>
                                {props.reply.content}
                            </TextWrapper>
                            {props.reply.hasPassword && (
                                <>
                                    <StyleSpan
                                        id={props.reply.id.toString()}
                                        onClick={props.onClickUpdateReply}
                                    >
                                        {'수정 |'}
                                    </StyleSpan>
                                    <StyleSpan
                                        id={props.reply.id.toString()}
                                        onClick={() => {
                                            setIsDelete(!isDelete);
                                        }}
                                    >
                                        {' 삭제'}
                                    </StyleSpan>
                                    {isDelete && (
                                        <PasswordInput
                                            type="password"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                            onKeyPress={enterKeyPress}
                                        />
                                    )}
                                </>
                            )}
                        </BoxWrapper>
                    )}
                    <LikeWrapper>
                        <ReplyOpinionWrapper>
                            <LikeImg
                                src={'/img/like-reply.png'}
                                onClick={() => {
                                    updateReplyLikeCnt(props.reply.id).then(
                                        () => props.addReply(),
                                    );
                                }}
                            />
                            <LikeText>{props.reply?.likeCnt}</LikeText>
                        </ReplyOpinionWrapper>
                        <ReplyOpinionWrapper>
                            <LikeImg
                                src={'/img/hate-reply.png'}
                                onClick={() => {
                                    updateReplyHateCnt(props.reply.id).then(
                                        () => props.addReply(),
                                    );
                                }}
                            />
                            <LikeText>{props.reply?.hateCnt}</LikeText>
                        </ReplyOpinionWrapper>
                    </LikeWrapper>
                </ReplyInfoWrapper>

                {props.updateReplyId == props.reply.id && (
                    <ReplyInput
                        isUpdate={true}
                        closeUpdateInput={props.closeUpdateInput}
                        itemInfoId={props.itemInfoId}
                        replyId={props.updateReplyId}
                        addReply={props.addReply}
                    ></ReplyInput>
                )}
            </ReplyWrapper>
        </>
    );
};

const PasswordInput = styled('input')`
    width: 95px;
    height: 20px;
    margin-left: 10px;
    border: 1px solid black;
`;

const BestTitle = styled('div')`
    font-weight: bold;
    padding-top: 10px;
    color: ${(props) => props.color};
`;

const ReplyWrapper = styled('div')`
    padding-top: 10px;
`;

const ReplyInfoWrapper = styled('div')`
    width: 810px;
    border-bottom: 1px solid rgb(233, 236, 239);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const BoxWrapper = styled('div')`
    width: 800px;
    height: 70px;
    padding-left: 20px;
`;

const TextWrapper = styled('div')`
    margin-top: 10px;
    margin-bottom: ${(props: { hasPassword: boolean }) =>
        props.hasPassword ? '10px' : '0px'};
    line-height: ${(props: { hasPassword: boolean }) =>
        !props.hasPassword && '40px'};
    font-size: 14px;
`;
const StyleSpan = styled('span')`
    font-size: 10px;
    cursor: pointer;
`;

const LikeWrapper = styled('div')`
    ${FlexRowCenter}
    padding-top: 5px;
    padding-right: 10px;
`;

const ReplyOpinionWrapper = styled('div')`
    display: flex;
    flex-direction: column;
`;

const LikeImg = styled('img')`
    width: 15px;
    height: 15px;
    margin-top: 15px;
    margin-right: 10px;
    cursor: pointer;
`;

const LikeText = styled('span')`
    font-size: 14px;
    margin-right: 10px;
    margin-top: 10px;
`;

export default Component;
