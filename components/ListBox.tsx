/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

type PriceProps = {
    id: number;
    price: number;
    currentUpdate: Date;
};
type Props = {
    id: number;
    itemName: string;
    ranking: number;
    itemImgUrl: string;
    likeTopReply: object;
    hateTopReply: object;
    price: PriceProps[];
};

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const router = useRouter();
    const onClickBox = (e: any) => {
        router.push(`/post/${props.id}`);
    };
    return (
        <Box key={props.id} onClick={onClickBox}>
            <RankWrapper>{props.ranking}</RankWrapper>
            <ProductImg src={props.itemImgUrl} />
            <ItemInfo>
                <ItemName>{props.itemName}</ItemName>
                {props.likeTopReply && <ItemPrice>{'BEST 한줄평'}</ItemPrice>}
                {props.hateTopReply && <ItemPrice>{'WORST 한줄평'}</ItemPrice>}
                <ItemPrice>
                    {props?.price[1] && `${props?.price[1]?.price}원 ->`}
                    {`${props?.price[0]?.price}원`}
                </ItemPrice>
            </ItemInfo>
            <LikeWrapper>
                <img src="/img/heart.png" width="20" height="20"></img>
            </LikeWrapper>
        </Box>
    );
};

const Box = styled('div')`
    width: 300px;
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

const ItemInfo = styled('div')`
    height: 100px;
`;

const ItemName = styled('div')`
    overflow: hidden;  
    width: 93%;
    height: 50px;
    text-overflow: ellipsis;
    word-break:break-all;
    font-weight: bold;
    padding: 15px 10px 10px 15px;
`;

const ItemPrice = styled('div')`
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
`;

const LikeWrapper = styled('div')`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    padding: 0 15px 8px 15px;
    font-size: 14px;
`;

export default Component;
