/** @jsxImportSource @emotion/react */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import styles from '../styles/Home.module.css';
import ListBox from '../components/ListBox';
import { getBestCategory } from '../api/best';
import { useEffect, useState } from 'react';
import {
    FlexRowCenter,
} from '../styles/theme';
import { BestTop100Props } from '../api/type';

type Props = {};
const Home: NextPage<Props> = (props) => {
    const [bestTopList, setBestTopList] = useState<BestTop100Props[]>();

    useEffect(() => {
        const search = window.location.search;
        getBestCategory(search).then(res => setBestTopList(res));
    }, []);

    const divs = bestTopList?.map((data: BestTop100Props, i: number) => {
        return <ListBox key={i} {...data} />;
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
            {List}
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

const FlexRow = styled('div')`
    ${FlexRowCenter}
`;

const CustomLogo = styled('img')`
    margin-left: 30px;
    position: absolute;
    left: 6%;
`;


export default Home;
