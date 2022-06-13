/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import styles from '../styles/Home.module.css';
import ListBox from '../components/ListBox';
import { getBestTop100List } from '../api/best';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    FlexRowCenter,
    FlexRowSpaceBetween,
    FlexRowStart,
} from '../styles/theme';

const Home: NextPage = () => {
    const [bestTopList, setBestTopList] = useState<any>();
    const [sortType, setSortType] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        getBestTop100List(sortType).then((res) => setBestTopList(res));
    }, [sortType]);

    const divs = bestTopList?.map((data: any, i: number) => {
        return <ListBox key={i} {...data} />;
    });

    const List =
        divs &&
        new Array(Math.ceil(divs?.length / 5)).fill(null).map((div, i) => {
            return <FlexRow key={i}>{divs?.splice(0, 5)}</FlexRow>;
        });
    
    const onClickSortButton = (e:any) => {
        setSortType(e.target.value);
    }

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
                <SortWrapper>
                    <SortButton onClick={(e)=> {setSortType("")}}>실시간 순위</SortButton>
                    <SortButton onClick={(e)=> {setSortType("likeCnt")}}>좋아요</SortButton>
                    <SortButton onClick={(e)=> {setSortType("replyCnt")}}>사용자 의견</SortButton>
                </SortWrapper>
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
    height: 100px;
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

const SortButton = styled('button')`
    width: 100px;
    height: 35px;
    background-color: white;
    border: 1px solid rgb(54, 76, 99);
    color: black;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 30px;
`;

const SortWrapper = styled('div')`
    position: absolute;
    right: 6%;
    ${FlexRowStart}
    width: 400px;
`;

export default Home;
