import { View, FlatList, ListRenderItemInfo } from "react-native";
import Header from "../../components/header";
import { useEffect, useState } from "react";

import ChpService, { Chars } from "../../api/chp/chp.service";
import LoadingStatic from "../../components/loading-static";
import CharInformation from "../../components/char-information";

export default function ExploreCharacters() {
  const chpService = new ChpService();

  const [chars, setChars] = useState<Chars[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  async function getChars() {
    const { data } = await chpService.getChars(10, page);
    if (totalPages === undefined) setTotalPages(data.pagination.totalPages);

    if (hasMoreChars()) {
      setChars((prevChars) => [...(prevChars || []), ...data.chars]);
      setPage((prevPage) => prevPage + 1);
    }
  }

  function hasMoreChars() {
    return page <= totalPages!;
  }

  useEffect(() => {
    getChars();
  }, []);

  return (
    <View className="flex w-full flex-1 px-6">
      <Header
        title={[
          {
            text: "Explore",
            isHilighte: false,
            hasBreakLine: false,
            hasSpace: true,
          },
          {
            text: "Characters",
            isHilighte: true,
          },
        ]}
        hasBackButton={true}
      />

      <FlatList
        data={chars}
        renderItem={({ item }: ListRenderItemInfo<Chars>) => (
          <CharInformation
            id={item.id}
            name={item.name}
            blood={item.blood}
            born={item.born}
            species={item.species}
            gender={item.gender}
            house={item.house}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getChars}
        onEndReachedThreshold={0.1}
        ListFooterComponent={hasMoreChars() ? <LoadingStatic /> : null}
      />
    </View>
  );
}
