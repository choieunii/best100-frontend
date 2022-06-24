/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { createReply, deleteReply, getPagingReplyList, getReply, getTopLikeAndHateReply, updateReply } from '../api/reply';
import { ReplyListProps, ReplyProps, ReplyTopBestHate } from '../api/type';
import { FlexRowSpaceBetween } from '../styles/theme';
import ReplyBox from './ReplyBox';
import ReplyInput from './ReplyInput';

type Props = {
    itemInfoId: string;
};

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const [likeTopReply, setLikeTopReply] = useState<ReplyProps>();
    const [hateTopReply, setHateTopReply] = useState<ReplyProps>();
    const [totalReplyCnt, setTotalReplyCnt] = useState<number>();
    const [replies, setReplies] = useState<ReplyProps[]>([]);
    const [replyPage, setReplyPage] = useState<number>(0);
    const [replySort, setReplySort] = useState<string>('currentUpdate');
    const [updateReplyId, setUpdateReplyId] = useState<number>();
    
    const addReply = useCallback(() => {
        getPagingReplyList(props.itemInfoId, replyPage, replySort).then(
            (res: ReplyListProps) => {
                setTotalReplyCnt(res.totalReplyCnt);
                setReplies(res.replyList);
            },
        );
        getTopLikeAndHateReply(props.itemInfoId).then((res: ReplyTopBestHate) => {
            setLikeTopReply(res.likeTopReply);
            setHateTopReply(res.hateTopReply);
        });
        setReplyPage(0);
    }, []);

    useEffect(() => {
        addReply();
    }, [addReply]);
    
    const onClickDeleteReply = (id: number, password: string) => {
        deleteReply(id, password).then((res) => {
            if (res.status === 500) {
                window.alert(res.message);
            } else {
                addReply();
            }
        });
    };

    const onClickUpdateReply = (e: any) => {
        if (updateReplyId === e.target.id) {
            setUpdateReplyId(undefined);
        } else {
            setUpdateReplyId(e.target.id);
        }
    };
    const onClickShowMoreButton = () => {
        getPagingReplyList(props.itemInfoId, replyPage + 1).then((res: ReplyListProps) => {
            if (replies !== undefined)
                setReplies([...replies, ...res.replyList]);
        });
        setReplyPage((replyPage) => replyPage + 1);
    };
    
    const closeUpdateInput = () => {
        setUpdateReplyId(undefined);
    };
    
    return (
        <>
         <ReplyCountArea>
                    <span> 상품 한줄평 {totalReplyCnt}</span>
                </ReplyCountArea>

                <ReplyInput
                    isUpdate={false}
                    itemInfoId={props?.itemInfoId}
                    addReply={addReply}
                ></ReplyInput>

                {likeTopReply && (
                    <ReplyBox
                        type={'Best'}
                        reply={likeTopReply}
                        addReply={addReply}
                    />
                )}

                {hateTopReply && (
                    <ReplyBox
                        type={'Worst'}
                        reply={hateTopReply}
                        addReply={addReply}
                    />
                )}
                {replies &&
                    replies?.map((reply: ReplyProps, idx: number) => {
                        return (
                            <ReplyBox
                                key={idx}
                                reply={reply}
                                itemInfoId={props?.itemInfoId}
                                updateReplyId={updateReplyId}
                                closeUpdateInput={closeUpdateInput}
                                onClickUpdateReply={onClickUpdateReply}
                                onClickDeleteReply={onClickDeleteReply}
                                addReply={addReply}
                            ></ReplyBox>
                        );
                    })}

                {totalReplyCnt !== undefined &&
                    totalReplyCnt / (replyPage + 1) > 5 && (
                        <ShowMoreButton onClick={onClickShowMoreButton}>
                            +더보기
                        </ShowMoreButton>
                    )}
        </>
    );
};
const ReplyCountArea = styled('div')`
    ${FlexRowSpaceBetween}
    width: 800px;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;


const ShowMoreButton = styled('button')`
    margin-top: 20px;
    font-weight: bold;
    font-size: 13px;
    background: white;
    border: none;
    cursor: pointer;
`;

export default Component;
