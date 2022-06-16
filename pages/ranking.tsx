/** @jsxImportSource @emotion/react */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import styles from '../styles/Home.module.css';
import ListBox from '../components/ListBox';
import {
    getBestByRanking,
} from '../api/best';
import { useEffect, useState } from 'react';
import { FlexRowCenter } from '../styles/theme';
import { BestByRankingProps } from '../api/type';

type Props = {};

const Home: NextPage<Props> = (props) => {
    const [bestTopList, setBestTopList] = useState<BestByRankingProps[]>();
    const [ranking, setRanking] = useState<String>();

    useEffect(() => {
        const search = window.location.search;
        setRanking(search.split('=')[1]);
        getBestByRanking(search).then((res) => setBestTopList(res));
    }, []);

    const parsingDate = (date: Date) => {
        return String(date).slice(0, 10);
    };

    const divs = bestTopList?.map((data: BestByRankingProps, i: number) => {
        return (
            <div>
                <DateWrapper>{parsingDate(data.currentUpdate)}</DateWrapper>
                <ListBox key={i} {...data.bestItemInfo} />
            </div>
        );
    });

    const List =
        divs &&
        new Array(Math.ceil(divs?.length / 5)).fill(null).map((div, i) => {
            return <FlexRow key={i}>{divs?.splice(0, 5)}</FlexRow>;
        });

    return (
        <div className={styles.mcontainer}>
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
            <TitleWrapper>
                최근 5일 <SpanWrapper>{ranking}</SpanWrapper>위 상품
            </TitleWrapper>
            {List}
            <footer className={styles.footer}>
                CJ ON STYLE BEST 100 PROJECT
            </footer>
        </div>
    );
};
const SpanWrapper = styled('span')`
    font-size: 70px;
    line-height: 70px;
    margin: 0 14px;
    color: rgba(51, 178, 158);
`;
const DateWrapper = styled('div')`
    font-size: 24px;
    text-weight: bold;
    margin-left: 80px;
`;

const TitleWrapper = styled('div')`
    ${FlexRowCenter}
    font-size: 40px;
    text-weight: bold;
    width: 100%;
    margin-bottom: 50px;
    line-height: 70px;
`;
const Header = styled('div')`
    position: relative;
    width: 100%auto;
    height: 60px;
    line-height: 100px;
    padding-top: 35px;
    padding-bottom: 30px;
`;

const FlexRow = styled('div')`
    ${FlexRowCenter}
`;

const CustomLogo = styled('img')`
    margin-left: 30px;
    position: absolute;
    left: 6%;
`;

export default Home;
