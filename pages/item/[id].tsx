/** @jsxImportSource @emotion/react */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import styles from '../../styles/Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import { getItemInfo, updateItemLikeCnt } from '../../api/item-info';
import { useRouter } from 'next/router';
import {
    createReply,
    updateReply,
    deleteReply,
    getPagingReplyList,
    updateReplyHateCnt,
    updateReplyLikeCnt,
    getTopLikeAndHateReply,
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
import ReplyBox from '../../components/ReplyBox';
import {
    ItemProps,
    PriceProps,
    RankingProps,
    ReplyProps,
} from '../../api/type';

type Props = ItemProps;

const Item: NextPage<Props> = (props) => {
    const [itemInfoId, setItemInfoId] = useState<string>('');
    const [item, setItem] = useState<ItemProps>();
    const [priceList, setPriceList] = useState<PriceProps[]>();
    const [rankingList, setRankingList] = useState<any>();
    const [replies, setReplies] = useState<ReplyProps[]>([]);
    const [updateReplyId, setUpdateReplyId] = useState<number>();
    const [replyPage, setReplyPage] = useState<number>(0);
    const [likeTopReply, setLikeTopReply] = useState<ReplyProps>();
    const [hateTopReply, setHateTopReply] = useState<ReplyProps>();
    const [totalReplyCnt, setTotalReplyCnt] = useState<number>();
    const [itemLikeCnt, setItemLikeCnt] = useState<number>(
        !props.likeCnt ? 0 : props.likeCnt,
    );
    const [replySort, setReplySort] = useState<string>('currentUpdate');
    const router = useRouter();

    const Chart = dynamic(() => import('../../components/Chart'), {
        ssr: false,
    });

    const beforeRanking = rankingList?.length > 1 && rankingList[1].ranking;
    const afterRanking =
        rankingList && rankingList[0] && rankingList[0].ranking;

    useEffect(() => {
        const itemInfoId = location.pathname.split('/')[2];
        setItemInfoId(itemInfoId);
        getItemPrices(itemInfoId).then((res: PriceProps[]) =>
            setPriceList(res),
        );
        getBestRankings(itemInfoId).then((res: any) => setRankingList(res));
    }, []);

    const addReply = useCallback(() => {
        const itemInfoId = location.pathname.split('/')[2];
        getPagingReplyList(itemInfoId, replyPage, replySort).then((res: any) => {
            setTotalReplyCnt(res.totalReplyCnt);
            setReplies(res.replyList);
        });
        getTopLikeAndHateReply(itemInfoId).then((res: any) => {
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
        getPagingReplyList(itemInfoId, replyPage + 1).then((res: any) => {
            if (replies !== undefined)
                setReplies([...replies, ...res.replyList]);
        });
        setReplyPage((replyPage) => replyPage + 1);
    };

    const onClickLikeButton = () => {
        updateItemLikeCnt(props?.itemInfoId).then((res) => {
            setItemLikeCnt(res);
        });
    };

    const closeUpdateInput = () => {
        setUpdateReplyId(undefined);
    };
    const goToFilteredCategory = (type: string, category: string) => {
        router.push(`/category?type=${type}&category=${category}`);
    };

    const checkIsDiscount = (discountRate: number) => {
        return discountRate !== 0 && discountRate !== null;
    };

    const goToCjOnStylePage = () => {
        window.location.href = `https://display.cjonstyle.com/p/item/${itemInfoId}?channelCode=50001002&rPIC=best`;
    };

    const onClickReplySortButton = (e: any) => {
        setReplySort(e.target.id);
        getPagingReplyList(itemInfoId, 0, e.target.id).then((res: any) => {
            setReplies(res.replyList);
        });
        setReplyPage(0);
    };

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
                <CateWrapper>
                    <span
                        onClick={() => {
                            goToFilteredCategory(
                                'largeCategory',
                                props?.largeCateName,
                            );
                        }}
                    >{`${props?.largeCateName} >`}</span>
                    <span
                        onClick={() => {
                            goToFilteredCategory(
                                'middleCategory',
                                props?.middleCateName,
                            );
                        }}
                    >
                        {` ${props?.middleCateName} > `}{' '}
                    </span>
                    <span
                        onClick={() => {
                            goToFilteredCategory('category', props?.cateName);
                        }}
                    >
                        {props?.cateName}
                    </span>
                </CateWrapper>
                <ItemInfoWrapper>
                    <PdImg
                        src={props?.itemImgUrl}
                        onClick={goToCjOnStylePage}
                    />
                    <PdInfoWrapper>
                        <ItemBrandName>
                            <BrandNameSpan
                                onClick={() => {
                                    goToFilteredCategory(
                                        'brandName',
                                        props?.brandName,
                                    );
                                }}
                            >{`${props?.brandName} > `}</BrandNameSpan>
                            <HeartImg
                                src="/img/heart.png"
                                width="40"
                                height="40"
                                onClick={onClickLikeButton}
                            />
                            <HeartSpan onClick={onClickLikeButton}>
                                {itemLikeCnt}
                            </HeartSpan>
                        </ItemBrandName>
                        <ItemName>{props?.itemName}</ItemName>

                        <ItemPrice>
                            {checkIsDiscount(props?.price?.discountRate) ? (
                                <DiscountRate>
                                    {`${props?.price?.discountRate}%`}
                                </DiscountRate>
                            ) : (
                                <NowPriceText>현재가</NowPriceText>
                            )}
                            {`${
                                checkIsDiscount(props?.price?.discountRate)
                                    ? props?.price?.customerPrice
                                    : props?.price?.price
                            }원`}{' '}
                            {checkIsDiscount(props?.price?.discountRate) && (
                                <SalePrice>{`${props?.price?.price}원`}</SalePrice>
                            )}
                        </ItemPrice>
                        <ItemRanking>
                            {props?.currentUpdateBest ? (
                                '최근 랭킹에 들어왔습니다!'
                            ) : (
                                <FlexRow>
                                    <BeforeRanking
                                        onClick={() =>
                                            router.push(
                                                `/ranking?ranking=${beforeRanking}`,
                                            )
                                        }
                                    >
                                        {beforeRanking}
                                    </BeforeRanking>
                                    {beforeRanking && (
                                        <RankingArrow src={'/img/arrow.png'} />
                                    )}
                                    <AfterRanking
                                        onClick={() =>
                                            router.push(
                                                `/ranking?ranking=${afterRanking}`,
                                            )
                                        }
                                    >
                                        {afterRanking}
                                    </AfterRanking>
                                </FlexRow>
                            )}
                        </ItemRanking>
                    </PdInfoWrapper>
                </ItemInfoWrapper>

                <GraphTitleWrapper>
                    <GraphTitleText>최근 5일 랭킹</GraphTitleText>
                    <GraphTitleText>최근 5일 가격</GraphTitleText>
                </GraphTitleWrapper>
                <ItemInfoWrapper>
                    <Chart
                        data={rankingList}
                        itemInfoId={itemInfoId}
                        chartType={'ranking'}
                    />
                    <Chart
                        data={priceList}
                        itemInfoId={itemInfoId}
                        chartType={'price'}
                    />
                </ItemInfoWrapper>

                <DividerBox />

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
                                itemInfoId={item?.itemInfoId}
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
            </FlexCol>
            <footer className={styles.footer}>
                CJ ON STYLE BEST 100 PROJECT
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const itemInfoId: string | string[] | undefined = params?.id;
    const props: ItemProps = getItemInfo(itemInfoId);
    return {
        props,
    };
};

type replySortStyle = {
    sortType: string;
    thisType: string;
    id: string;
};
const ReplySortSpan = styled('span')`
    font-size: 14px;
    color: ${(props: replySortStyle) =>
        props.sortType === props.thisType ? 'black' : 'gray'};
    cursor: pointer;
`;
const BrandNameSpan = styled('span')`
    cursor: pointer;
`;
const HeartSpan = styled('span')`
    position: absolute;
    left: 364px;
    top: 0px;
    font-size: 20px;
    height: 40px;
    width: 40px;
    cursor: pointer;
`;
const HeartImg = styled('img')`
    position: absolute;
    left: 355px;
    bottom: 37px;
    cursor: pointer;
`;

const Header = styled('div')`
    position: relative;
    width: 100%auto;
    height: 60px;
    line-height: 100px;
    padding-top: 35px;
`;

const ItemRanking = styled('div')`
    font-size: 30px;
    line-height: 100px;
    color: #111;
    font-weight: 500;
    padding-top: 40px;
    height: 100px;
`;

const NowPriceText = styled(`span`)`
    font-size: 20px;
    color: rgba(240, 44, 97);
    font-weight: bold;
    margin-bottom: 10px;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
`;

const AfterRanking = styled('span')`
    color: purple;
    font-weight: bold;
    font-size: 60px;
    cursor: pointer;
`;

const SalePrice = styled(`span`)`
    font-size: 24px;
    color: gray;
    text-decoration: line-through;
`;

const BeforeRanking = styled('span')`
    color: rgba(51, 178, 158);
    font-weight: bold;
    font-size: 60px;
    cursor: pointer;
`;

const RankingArrow = styled('img')`
    width: 40px;
    height: 30px;
    padding-left: 30px;
    padding-right: 30px;
`;

const ItemBrandName = styled('div')`
    position: relative;
    font-size: 15px;
    line-height: 26px;
    color: #111;
    font-weight: bold;
`;

const DiscountRate = styled('span')`
    font-size: 43px;
    color: rgba(240, 44, 97);
    font-weight: bold;
    margin-bottom: 10px;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
`;

const ItemName = styled('div')`
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    padding-top: 15px;
`;

const GraphTitleText = styled('div')`
    font-size: 15px;
`;
const ItemPrice = styled('div')`
    font-size: 41px;
    font-weight: 400;
    padding-top: 30px;
`;

const PdImg = styled('img')`
    width: 350px;
    height: 350px;
    cursor: pointer;
`;

const CateWrapper = styled('span')`
    width: 830px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #767676;
    cursor: pointer;
`;

const ShowMoreButton = styled('button')`
    margin-top: 20px;
    font-weight: bold;
    font-size: 13px;
    background: white;
    border: none;
    cursor: pointer;
`;

const FlexCol = styled('div')`
    ${FlexColCenter}
    align-items: center;
`;

const FlexRow = styled('div')`
    ${FlexRowCenter}
    align-items: center;
`;

const PdInfoWrapper = styled('div')`
    width: 400px;
    height: 390px;
    margin-left: 90px;
`;

const GraphTitleWrapper = styled('div')`
    ${FlexRowSpaceBetween}
    width: 550px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 17px;
    font-weight: bold;
`;

const DividerBox = styled('div')`
    height: 100px;
    line-height: 80px;
    font-size: 20px;
`;

const CustomLogo = styled('img')`
    margin-left: 30px;
    position: absolute;
    left: 6%;
`;

const ReplyCountArea = styled('div')`
    ${FlexRowSpaceBetween}
    width: 800px;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;

const ItemInfoWrapper = styled('div')`
    ${FlexRowSpaceBetween}
`;

export default Item;
