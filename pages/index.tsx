/** @jsxImportSource @emotion/react */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import styles from '../styles/Home.module.css';
import ListBox from '../components/ListBox';
import { getBestTop100List, getCurrent5DaysBestTop5 } from '../api/best';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FlexRowCenter, FlexRowStart } from '../styles/theme';
import { BestTop100Props } from '../api/type';
import { itemSearch } from '../api/item-info';

type StyleProps = {
    sortType: string;
    thisType: string;
};
type Props = {};
const Home: NextPage<Props> = (props) => {
    const [bestTopList, setBestTopList] = useState<BestTop100Props[]>();
    const [sortType, setSortType] = useState<string>('ranking');
    const [searchValue, setSearchValue] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (sortType === 'best5') {
            getCurrent5DaysBestTop5().then((res) => setBestTopList(res));
        } else {
            getBestTop100List(sortType).then((res: BestTop100Props[]) => {
                if (sortType === 'likeCnt') {
                    res.sort((a, b) => b.likeCnt - a.likeCnt);
                } else if (sortType === 'replyCnt') {
                    res.sort((a, b) => b.replyCnt - a.replyCnt);
                }
                setBestTopList(res);
            });
        }
    }, [sortType]);

    const enterKeyPress = (e: any) => {
        if (e.key == 'Enter' && searchValue) {
            itemSearch(searchValue).then((res) => {
                setBestTopList(res);
            });
        }
    };

    const divs = bestTopList?.map((data: BestTop100Props, i: number) => {
        return <ListBox key={i} {...data} />;
    });

    const getDate = (day : number) => {
        const today = new Date();
        const before = new Date(today.setDate(today.getDate() - day));
        return before.toISOString().slice(0,10);
    }

    const List =
        divs &&
        new Array(Math.ceil(divs?.length / 5)).fill(null).map((value, i) => {
            return (
                <>
                    {sortType === 'best5' && <DateSpan>{getDate(4-i)}</DateSpan>}
                    <FlexRow key={i}>{divs?.splice(0, 5)}</FlexRow>
                </>
            );
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
                <SortWrapper>
                    <SearchInput
                        placeholder="????????? ?????? ??? ENTER"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={enterKeyPress}
                    ></SearchInput>
                    <SortButton
                        thisType={'best5'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('best5');
                        }}
                    >
                        HOT
                    </SortButton>
                    <SortButton
                        thisType={'likeCnt'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('likeCnt');
                        }}
                    >
                        ?????????
                    </SortButton>
                    <SortButton
                        thisType={'replyCnt'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('replyCnt');
                        }}
                    >
                        ????????? ??????
                    </SortButton>
                    <SortButton
                        thisType={'increaseRank'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('increaseRank');
                        }}
                    >
                        ?????? ??????
                    </SortButton>
                    <SortButton
                        thisType={'decreaseRank'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('decreaseRank');
                        }}
                    >
                        ?????? ??????
                    </SortButton>
                    <SortButton
                        thisType={'sale'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('sale');
                        }}
                    >
                        ?????? ???
                    </SortButton>
                    <SortButton
                        thisType={'ranking'}
                        sortType={sortType}
                        onClick={(e) => {
                            setSortType('ranking');
                        }}
                    >
                        ????????? ??????
                    </SortButton>
                </SortWrapper>
            </Header>
            {List}
            <footer className={styles.footer}>
                CJ ON STYLE BEST 100 PROJECT
            </footer>
        </div>
    );
};

const DateSpan = styled('div')`
    font-size: 30px;
    margin-top: 40px;
    margin-left: 80px;
    font-weight: bold;
`

const SearchInput = styled('input')`
    border: 1px solid gray;
    border-radius: 10px;
    width: 150px;
    height: 34px;
    margin-right: 20px;
    padding-left: 10px;
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

const SortButton = styled('button')`
    width: 100px;
    height: 35px;
    background-color: ${(props: StyleProps) =>
        props.thisType === props.sortType ? 'purple' : 'white'};
    border: 1px solid rgb(54, 76, 99);
    color: ${(props: StyleProps) =>
        props.thisType === props.sortType ? 'white' : 'black'};
    border-radius: 4px;
    cursor: pointer;
    margin-right: 20px;
`;

const SortWrapper = styled('div')`
    position: absolute;
    right: 6%;
    ${FlexRowStart}
    width: 1000px;
`;

export default Home;
