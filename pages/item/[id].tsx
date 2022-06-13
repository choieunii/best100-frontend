/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import styles from '../../styles/Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import { getItemInfo } from '../../api/item-info';
import { useRouter } from 'next/router';
import {
    createReply,
    updateReply,
    deleteReply,
    getPagingReplyList,
} from '../../api/reply';
import dynamic from 'next/dynamic';
import ReplyInput from '../../components/ReplyInput';
import {
    FlexColCenter,
    FlexRowCenter,
    FlexRowSpaceBetween,
    FlexRowStart,
} from '../../styles/theme';
import { getItemPrices } from '../../api/price';
import { getBestRankings } from '../../api/best';

type Props = { data: any };
type ItemProps = {
    id: number;
    brandName: string;
    cateName: string;
    currentUpdateBest: boolean;
    itemImgUrl: string;
    itemInfoId: string;
    itemName: string;
    largeCateName: string;
    likeCnt: number;
    middleCateName: string;
    price: number;
    ranking: number;
};
const Item: NextPage<Props> = (props) => {
    const [itemInfoId, setItemInfoId] = useState<string>("");
    const [item, setItem] = useState<ItemProps>();
    const [priceList, setPriceList] = useState<any>();
    const [rankingList, setRankingList] = useState<any>();
    const [replies, setReplies] = useState<any>();
    const [updateReplyId, setUpdateReplyId] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        const itemInfoId = location.pathname.split('/')[2];
        setItemInfoId(itemInfoId);
        getItemInfo(itemInfoId).then((res: ItemProps) => setItem(res));
    }, [itemInfoId]);

    useEffect(() => {
        const itemInfoId = location.pathname.split('/')[2];
        getItemPrices(itemInfoId).then((res: any) => setPriceList(res));
        getBestRankings(itemInfoId).then((res: any) => setRankingList(res));
    }, [itemInfoId]);

    const addReply = useCallback(() => {
        const itemInfoId = location.pathname.split('/')[2];
        setUpdateReplyId(undefined);
        getPagingReplyList(itemInfoId).then((res: any) => setReplies(res));
    }, [itemInfoId]);

    useEffect(() => {
        addReply();
    }, [addReply]);

    const onClickDeleteReply = (e: any) => {
        deleteReply(e.target.id).then((res) => addReply());
    };

    const onClickUpdateReply = (e: any) => {
        if (updateReplyId === e.target.id) {
            setUpdateReplyId(undefined);
        } else {
            setUpdateReplyId(e.target.id);
        }
    };

    const Chart = dynamic(() => import('../../components/Chart'), {
        ssr: false,
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>CJ ON STYLE BEST 100</title>
                <meta name="description" content="CJ ON STYLE PROJECT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                <a href="/">
                    <CustomLogo src="/img/logo.png" width="180" height="50" />
                </a>
            </Header>
            <FlexCol>
                <CateWrapper>{`${item?.largeCateName} > ${item?.middleCateName} > ${item?.cateName}`}</CateWrapper>
                <ItemInfoWrapper>
                    <PdImg src={item?.itemImgUrl} />
                    <PdInfoWrapper>
                        <ItemBrandName>{`${item?.brandName} > `}</ItemBrandName>
                        <ItemName>{item?.itemName}</ItemName>
                        <ItemPrice>{`${item?.price}원`}</ItemPrice>
                        <ItemRanking>
                            {item?.currentUpdateBest
                                ? '최근 랭킹에 들어왔습니다.'
                                : '5->4'}
                        </ItemRanking>
                    </PdInfoWrapper>
                </ItemInfoWrapper>

                <GraphTitleWrapper>
                    <span>랭킹 순위</span>
                    <span>가격 변동</span>
                </GraphTitleWrapper>
                <ItemInfoWrapper>
                    <Chart
                        data={priceList}
                        itemInfoId={itemInfoId}
                        chartType={"price"}
                    />
                    <Chart
                        data={rankingList}
                        itemInfoId={itemInfoId}
                        chartType={"ranking"}
                    />
                </ItemInfoWrapper>

                <DividerBox />

                <ReplyCountArea>
                    <span> 상품 한줄평 {replies?.length}</span>
                </ReplyCountArea>
                <ReplyInput
                    isUpdate={false}
                    itemId={item?.id}
                    addReply={addReply}
                ></ReplyInput>

                {replies &&
                    replies?.map((reply: any, idx: number) => {
                        return (
                            <ReplyWrapper>
                                <ReplyInfoWrapper>
                                    <BoxWrapper>
                                        <TextWrapper>{reply.text}</TextWrapper>
                                        <StyleSpan
                                            id={reply.id}
                                            onClick={onClickUpdateReply}
                                        >
                                            {'수정 |'}
                                        </StyleSpan>
                                        <StyleSpan
                                            id={reply.id}
                                            onClick={onClickDeleteReply}
                                        >
                                            {' 삭제'}
                                        </StyleSpan>
                                    </BoxWrapper>

                                    <LikeWrapper>
                                        <ReplyOpinionWrapper>
                                            <LikeImg
                                                src={'/img/like-reply.png'}
                                            />
                                            <LikeText>10</LikeText>
                                        </ReplyOpinionWrapper>
                                        <ReplyOpinionWrapper>
                                            <LikeImg
                                                src={'/img/hate-reply.png'}
                                            />
                                            <LikeText>10</LikeText>
                                        </ReplyOpinionWrapper>
                                    </LikeWrapper>
                                </ReplyInfoWrapper>

                                {updateReplyId == reply.id && (
                                    <ReplyInput
                                        isUpdate={true}
                                        itemId={item?.id}
                                        replyId={updateReplyId}
                                        addReply={addReply}
                                    ></ReplyInput>
                                )}
                            </ReplyWrapper>
                        );
                    })}

                <ShowMoreButton>+더보기</ShowMoreButton>
            </FlexCol>
            <footer className={styles.footer}>
                CJ ON STYLE BEST 100 PROJECT
            </footer>
        </div>
    );
};

const Header = styled('div')`
    position: relative;
    width: 100%auto;
    height: 60px;
    line-height: 100px;
    padding-top: 35px;
    padding-bottom: 30px;
`;

const ItemRanking = styled('div')`
    font-size: 30px;
    line-height: 100px;
    color: #111;
    font-weight: 500;
    padding-top: 40px;
    height: 100px;
`;

const ItemBrandName = styled('div')`
    font-size: 15px;
    line-height: 26px;
    color: #111;
    font-weight: bold;
`;

const ItemName = styled('div')`
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    padding-top: 15px;
`;

const ItemPrice = styled('div')`
    font-size: 44px;
    font-weight: 400;
    padding-top: 30px;
`;

const PdImg = styled('img')`
    width: 400px;
    height: 400px;
`;

const UpdateWrapper = styled('div')`
    width: 800px;
    text-align: center;
    margin-bottom: 40px;
`;

const CateWrapper = styled('div')`
    width: 850px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #767676;
`;

const ShowMoreButton = styled('button')`
    margin-top: 20px;
    font-weight: bold;
    font-size: 13px;
    background: white;
    border: none;
`;

const FlexCol = styled('div')`
    ${FlexColCenter}
    align-items: center;
`;

const PdInfoWrapper = styled('div')`
    width: 400px;
    height: 400px;
    padding-left: 60px;
`;

const ReplyOpinionWrapper = styled('div')`
    display: flex;
    flex-direction: column;
`;

const TextWrapper = styled('div')`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const GraphTitleWrapper = styled('div')`
    ${FlexRowSpaceBetween}
    width: 550px;
    height: 50px;
    margin-top: 70px;
    margin-bottom: 20px;
    font-size: 17px;
    font-weight: bold;
`;

const DividerBox = styled('div')`
    height: 100px;
    line-height: 80px;
    font-size: 20px;
`;

const LikeWrapper = styled('div')`
    ${FlexRowCenter}
    padding-top: 5px;
    padding-right: 10px;
`;

const LikeText = styled('span')`
    font-size: 14px;
    margin-right: 10px;
    margin-top: 10px;
`;

const CustomLogo = styled('img')`
    margin-left: 30px;
    position: absolute;
    left: 6%;
`;

const ReplyWrapper = styled('div')`
    padding-top: 10px;
`;

const LikeImg = styled('img')`
    width: 15px;
    height: 15px;
    margin-top: 15px;
    margin-right: 10px;
`;

const ReplyCountArea = styled('div')`
    ${FlexRowStart}
    width: 800px;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;

const ItemInfoWrapper = styled('div')`
    ${FlexRowSpaceBetween}
`;

const ReplyInfoWrapper = styled('div')`
    width: 800px;
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

const StyleSpan = styled('span')`
    font-size: 13px;
    cursor: pointer;
`;
export default Item;
