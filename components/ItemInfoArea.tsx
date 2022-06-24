/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import router from 'next/router';
import { MouseEventHandler, useMemo, useState } from 'react';
import { updateItemLikeCnt } from '../api/item-info';
import { ItemProps } from '../api/type';
import { FlexRowCenter, FlexRowSpaceBetween } from '../styles/theme';

type Props = {
    rankingList: any;
    item: ItemProps;
};

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const item = useMemo(() => props.item, [props]);
    const [itemLikeCnt, setItemLikeCnt] = useState<number>(
        !item.likeCnt ? 0 : item.likeCnt,
    );

    const beforeRanking =
        props.rankingList?.length > 1 && props.rankingList[1].ranking;
    const afterRanking =
        props.rankingList &&
        props.rankingList[0] &&
        props.rankingList[0].ranking;

    const onClickLikeButton = () => {
        updateItemLikeCnt(item?.itemInfoId).then((res: number) => {
            setItemLikeCnt(res);
        });
    };

    const onClickRanking = (e: any) => {
        const ranking = e.target.id;
        router.push(`/ranking?ranking=${ranking}`);
    };

    const getCategory = (type: string) => {
        switch (type) {
            case 'largeCategory':
                return item?.largeCateName;
            case 'middleCategory':
                return item?.middleCateName;
            case 'category':
                return item?.cateName;
            case 'brandName':
                return item?.brandName;
            default:
                break;
        }
    };

    const goToFilteredCategory = (e: any) => {
        const type = e.target.id;
        router.push(`/category?type=${type}&category=${getCategory(type)}`);
    };

    const checkIsDiscount = (discountRate: number) => {
        return discountRate !== 0 && discountRate !== null;
    };

    const goToCjOnStylePage = () => {
        window.location.href = `https://display.cjonstyle.com/p/item/${item.itemInfoId}?channelCode=50001002&rPIC=best`;
    };

    return (
        <>
            <CateWrapper>
                <span
                    id="largeCategory"
                    onClick={goToFilteredCategory}
                >{`${item?.largeCateName} >`}</span>
                <span id="middleCategory" onClick={goToFilteredCategory}>
                    {` ${item?.middleCateName} > `}{' '}
                </span>
                <span id="category" onClick={goToFilteredCategory}>
                    {item?.cateName}
                </span>
            </CateWrapper>
            <ItemInfoWrapper>
                <PdImg src={item?.itemImgUrl} onClick={goToCjOnStylePage} />
                <PdInfoWrapper>
                    <ItemBrandName>
                        <BrandNameSpan
                            id="brandName"
                            onClick={goToFilteredCategory}
                        >{`${item?.brandName} > `}</BrandNameSpan>
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
                    <ItemName>{item?.itemName}</ItemName>

                    <ItemPrice>
                        {checkIsDiscount(item?.price?.discountRate) ? (
                            <DiscountRate>
                                {`${item?.price?.discountRate}%`}
                            </DiscountRate>
                        ) : (
                            <NowPriceText>현재가</NowPriceText>
                        )}
                        {`${
                            checkIsDiscount(item?.price?.discountRate)
                                ? item?.price?.customerPrice
                                : item?.price?.price
                        }원 `}
                        {checkIsDiscount(item?.price?.discountRate) && (
                            <SalePrice>{`${item?.price?.price}원`}</SalePrice>
                        )}
                    </ItemPrice>
                    <ItemRanking>
                        {item?.currentUpdateBest ? (
                            '최근 랭킹에 들어왔습니다!'
                        ) : (
                            <FlexRow>
                                <BeforeRanking
                                    id={beforeRanking}
                                    onClick={onClickRanking}
                                >
                                    {beforeRanking}
                                </BeforeRanking>
                                {beforeRanking && (
                                    <RankingArrow src={'/img/arrow.png'} />
                                )}
                                <AfterRanking
                                    id={afterRanking}
                                    onClick={onClickRanking}
                                >
                                    {afterRanking}
                                </AfterRanking>
                            </FlexRow>
                        )}
                    </ItemRanking>
                </PdInfoWrapper>
            </ItemInfoWrapper>
        </>
    );
};

const FlexRow = styled('div')`
    ${FlexRowCenter}
    align-items: center;
`;

const CateWrapper = styled('span')`
    width: 830px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #767676;
    cursor: pointer;
`;

const ItemInfoWrapper = styled('div')`
    ${FlexRowSpaceBetween}
`;

const PdImg = styled('img')`
    width: 350px;
    height: 350px;
    cursor: pointer;
`;

const PdInfoWrapper = styled('div')`
    width: 400px;
    height: 390px;
    margin-left: 90px;
`;

const ItemBrandName = styled('div')`
    position: relative;
    font-size: 15px;
    line-height: 26px;
    color: #111;
    font-weight: bold;
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

const ItemName = styled('div')`
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    padding-top: 15px;
`;
const ItemPrice = styled('div')`
    font-size: 41px;
    font-weight: 400;
    padding-top: 30px;
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
const NowPriceText = styled(`span`)`
    font-size: 20px;
    color: rgba(240, 44, 97);
    font-weight: bold;
    margin-bottom: 10px;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
`;
const SalePrice = styled(`span`)`
    font-size: 24px;
    color: gray;
    text-decoration: line-through;
`;

const ItemRanking = styled('div')`
    font-size: 30px;
    line-height: 100px;
    color: #111;
    font-weight: 500;
    padding-top: 40px;
    height: 100px;
`;
const AfterRanking = styled('span')`
    color: purple;
    font-weight: bold;
    font-size: 60px;
    cursor: pointer;
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

export default Component;
