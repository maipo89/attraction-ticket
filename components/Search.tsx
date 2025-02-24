'use client';

import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

const Search = () => {

  const router = useRouter();

  // Handles search by pushing the query to the URL when the user submits a search
  const handleSearch = async (query: string) => {

    router.push(`/?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search">

      {/* SearchInput component: Receives the handleSearch function and allows user to input their search */}
      <SearchInput onSearch={handleSearch} />

    </div>
  );
};

export default Search;