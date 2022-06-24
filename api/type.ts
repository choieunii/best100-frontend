export type PriceProps = {
    id: number;
    price: number;
    discountRate: number;
    customerPrice: number;
    currentUpdate: Date;
};
export type RankingProps = {
    id: number;
    ranking: number;
    currentUpdate: Date;
    countOfItemLikes: number;
    countOFReplies: number;
};
export type ReplyListProps = {
    totalReplyCnt : number;
    replyList : ReplyProps[];
}
export type ReplyTopBestHate = {
    likeTopReply: ReplyProps;
    hateTopReply: ReplyProps;
}
export type ReplyProps = {
    id: number;
    content: string;
    likeCnt: number;
    hateCnt: number;
    hasPassword: boolean;
    currentUpdate: Date;
};

export type BestTop100Props = {
    id: number;
    itemName: string;
    itemInfoId: string;
    itemImgUrl: string;
    likeTopReply: ReplyProps;
    hateTopReply: ReplyProps;
    likeCnt: number;
    replyCnt: number;
    ranking: RankingProps[];
    price: PriceProps[];
    currentUpdate: Date;
};


export type BestByRankingProps = {
    id: number;
    bestItemInfo: BestTop100Props;
    currentUpdate: Date;
};

export type ItemProps = {
    id: number;
    brandName: string;
    cateName: string;
    currentUpdateBest: boolean;
    itemImgUrl: string;
    itemInfoId: string;
    itemName: string;
    largeCateName: string;
    likeCnt: number;
    replyCnt: number;
    middleCateName: string;
    price: PriceProps;
    ranking: number;
};

export type updatePostProps = {
    title: string;
    text: string;
    date: string;
};