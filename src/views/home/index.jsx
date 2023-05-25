import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  NavBar,
  SearchBar,
  InfiniteScroll,
  PullToRefresh,
  Tabs,
} from "antd-mobile";
import HomeSwiper from "./HomeSwiper";
import GoodsList from "../../components/GoodsList";
import MainTabBar from "../../components/MainTabBar";
import {
  getHomeGoods,
  getHomeRecommend,
  getHomeSearch,
} from "../../network/home";
import "./index.css";
import { LocalStorage } from "../../common/utils";
import { LOCALSTORAGE } from "../../common/constant";

const TABKEY = {
  Recomend: "recommend",
  Result: "result",
};
function removeDuplicates(arr) {
  const set = new Set();
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const proId = arr[i].proId;
    if (!set.has(proId)) {
      set.add(proId);
      result.push(arr[i]);
    }
  }
  return result;
}
export default function Home() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();

  const [goods, setGoods] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [searchResult, setSearchResult] = useState([]);
  const [hasMoreResult, setHasMoreResult] = useState(false);
  const [resultPage, setRresultPage] = useState(1);

  const [activeKey, setActiveKey] = useState(TABKEY.Recomend);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
    if (!userId) return;
    getHomeRecommend(userId).then(
      ({
        data: {
          data: { data },
        },
      }) => {
        setGoods((goods) => {
          return removeDuplicates([...data, ...goods]);
        });
      }
    );
  }, []);

  async function loadMore() {
    const {
      data: {
        data: { data: data_1 },
      },
    } = await getHomeGoods(page + 1);
    setPage(page + 1);
    setGoods((val) => {
      return removeDuplicates([...val, ...data_1]);
    });
    setHasMore(data_1.length > 0);
  }

  async function loadMoreResult() {
    if (!keyword) return;
    if (!hasMoreResult) return;
    const {
      data: {
        data: { data: data_1 },
      },
    } = await getHomeSearch(resultPage + 1, keyword);
    setRresultPage(resultPage + 1);
    setSearchResult((val) => {
      return removeDuplicates([...val, ...data_1]);
    });
    setHasMoreResult(data_1.length > 0);
  }

  const onRefresh = () => {
    setPage(0);
    setHasMore(true);
    setGoods([]);
  };

  const onSearch = async (value) => {
    if (!value) return;
    setRresultPage(1);
    setKeyword(value);
    const {
      data: {
        data: { data: data_1 },
      },
    } = await getHomeSearch(1, value);
    setRresultPage(resultPage + 1);
    setSearchResult([...data_1]);
    setHasMoreResult(data_1.length > 0);
    setActiveKey(TABKEY.Result);
  };

  return (
    <div className="home">
      <PullToRefresh onRefresh={onRefresh}>
        <NavBar back={null} className="home-navbar">
          EasyExchange
        </NavBar>
        <SearchBar
          placeholder="请输入内容"
          showCancelButton
          className="home-searchbar"
          onSearch={onSearch}
        />
        <HomeSwiper />
        <Tabs
          className="home-tabs"
          activeKey={activeKey}
          onChange={(e) => {
            setActiveKey(e);
          }}
        >
          <Tabs.Tab title="推荐" key={TABKEY.Recomend}>
            <GoodsList goods={goods} />
            <InfiniteScroll
              className="home-scroll"
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </Tabs.Tab>
          <Tabs.Tab title="搜索结果" key={TABKEY.Result}>
            <GoodsList goods={searchResult} />
            <InfiniteScroll
              className="home-scroll"
              loadMore={loadMoreResult}
              hasMore={hasMoreResult}
            />
          </Tabs.Tab>
        </Tabs>
      </PullToRefresh>
      <MainTabBar />
    </div>
  );
}
