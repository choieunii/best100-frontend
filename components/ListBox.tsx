/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BestTop100Props } from '../api/type';
import { FlexRowSpaceBetween } from '../styles/theme';

type Props = BestTop100Props;

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const router = useRouter();
    const onClickBox = (e: any) => {
        router.push(`/item/${props.itemInfoId}`);
    };

    return (
        <Box key={props.id} onClick={onClickBox}>
            <RankWrapper>{props.ranking[0].ranking}</RankWrapper>
            {props.price[0].discountRate > 0 && (
                <DiscountWrapper>{`${props.price[0].discountRate}%`}</DiscountWrapper>
            )}
            <ProductImg src={props.itemImgUrl} />
            <ItemName>{props.itemName}</ItemName>
            <ItemReplyInfo>
                {props.likeTopReply && (
                    <ReplyText>{`L - ${props?.likeTopReply?.content}`}</ReplyText>
                )}
                {props.hateTopReply && (
                    <ReplyText>{`H - ${props?.hateTopReply?.content}`}</ReplyText>
                )}
            </ItemReplyInfo>
            <LikeWrapper>
                <ItemRanking>
                    <RankingSpan color="rgba(51, 178, 158)">
                        {props?.price[1] && `${props.ranking[1].ranking}`}
                    </RankingSpan>
                    {props?.price[1] && ' -> '}
                    <RankingSpan color="purple">
                        {' '}
                        {`${props.ranking[0].ranking}`}
                    </RankingSpan>
                </ItemRanking>
                <ReplyCntInfo>댓글 {props.replyCnt}개</ReplyCntInfo>
                <LikeCnt>{props.likeCnt ? props.likeCnt : 0}</LikeCnt>
                <HeartImg src="/img/heart.png" width="15" height="15" />
            </LikeWrapper>
        </Box>
    );
};

const RankingSpan = styled('span')`
    color: ${(props) => props.color};
`;
const ReplyText = styled('div')`
    padding-left: 15px;
    font-size: 13px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 230px;
`;
const Box = styled('div')`
    width: 270px;
    height: 450px;
    background: white;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    margin: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 5%,
        rgba(255, 255, 255, 1) 90%
    );
    transform: translateY(5%) translateX(1%);
    transition: 0.5s;
    :hover {
        transform: translateY(0);
    }
    cursor: pointer;
    position: relative;
`;

const ReplyCntInfo = styled('div')`
    font-size: 11px;
    position: absolute;
    line-height: 25px;
    right: 46px;
`;

const ItemReplyInfo = styled('div')`
    height: 55px;
`;

const DiscountWrapper = styled('div')`
    width: 43px;
    height: 43px;
    background: rgba(51, 178, 158);
    top: 0px;
    right: 0px;
    position: absolute;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
`;

const RankWrapper = styled('span')`
    width: 40px;
    height: 40px;
    background: rgba(91, 34, 176);
    top: 0px;
    position: absolute;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
`;

const ProductImg = styled('img')`
    width: 300px;
    height: 300px;
`;

const HeartImg = styled('img')`
    position: absolute;
    bottom: 32px;
    right: 18px;
    z-index: 998;
`;

const ItemName = styled('div')`
    overflow: hidden;
    width: 93%;
    height: 50px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: bold;
    padding: 15px 10px 10px 15px;
`;

const ItemRanking = styled('div')`
    padding-left: 15px;
    padding-right: 15px;
    font-size: 17px;
`;

const LikeWrapper = styled('div')`
    ${FlexRowSpaceBetween}
    padding: 0 15px 10px 5px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
`;

const LikeCnt = styled('span')`
    font-size: 11px;
    position: absolute;
    top: 5px;
    right: 22px;
`;

export default Component;
