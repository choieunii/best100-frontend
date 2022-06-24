/** @jsxImportSource @emotion/react */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import styles from '../../styles/Home.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getItemInfo } from '../../api/item-info';
import dynamic from 'next/dynamic';
import {
    FlexColCenter,
    FlexRowSpaceBetween,
} from '../../styles/theme';
import { getItemPrices } from '../../api/price';
import { getBestRankings } from '../../api/best';
import {
    ItemProps,
    PriceProps,
} from '../../api/type';
import ReplyArea from '../../components/ReplyArea';
import ItemInfoArea from '../../components/ItemInfoArea';

type Props = ItemProps;

const Item: NextPage<Props> = (props) => {
    const [priceList, setPriceList] = useState<PriceProps[]>();
    const [rankingList, setRankingList] = useState<any>();

    const Chart = dynamic(() => import('../../components/Chart'), {
        ssr: false,
    });
    const itemInfoId = useMemo(() => props.itemInfoId, [props]);

    useEffect(() => {
        getItemPrices(itemInfoId).then((res: PriceProps[]) =>
            setPriceList(res),
        );
        getBestRankings(itemInfoId).then((res: any) => setRankingList(res));
    }, [itemInfoId]);

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
                <ItemInfoArea rankingList={rankingList} item={props} />

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

                <ReplyArea itemInfoId={props.itemInfoId} />
            </FlexCol>
            <footer className={styles.footer}>
                CJ ON STYLE BEST 100 PROJECT
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const itemInfoId: string | string[] | undefined = params?.id;
    const props: ItemProps = await getItemInfo(itemInfoId);
    return {
        props,
    };
};


const Header = styled('div')`
    position: relative;
    width: 100%auto;
    height: 60px;
    line-height: 100px;
    padding-top: 35px;
`;


const GraphTitleText = styled('div')`
    font-size: 15px;
`;

const FlexCol = styled('div')`
    ${FlexColCenter}
    align-items: center;
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


const ItemInfoWrapper = styled('div')`
    ${FlexRowSpaceBetween}
`;

export default Item;
